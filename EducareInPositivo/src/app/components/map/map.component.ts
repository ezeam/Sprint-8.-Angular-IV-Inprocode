import { Component,  ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, Marker } from 'maplibre-gl';
import { LugaresService } from '../../services';
import { Subscription } from 'rxjs';
import { ProgressBarrComponent } from "../../shared/progress-barr/progress-barr.component";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ProgressBarrComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit, OnDestroy {

  UserLocationReady: boolean = false;
  userLocation!: [number, number] | undefined;
  private locationSubscription?: Subscription;

  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private _lugaresService: LugaresService) {}

  ngAfterViewInit() {
    this.locationSubscription = this._lugaresService.userLocation$.subscribe(location => {
      if (location) {
        this.userLocation = location;
        this.UserLocationReady = true;
        console.log("Mi geolocalización es: ", this.userLocation);

        const initialState = { lng: this.userLocation[0], lat: this.userLocation[1], zoom: 14 };

        this.map = new Map({
          container: this.mapContainer.nativeElement,
          style: `https://api.maptiler.com/maps/streets-v2/style.json?key=ATMKHhbBGgxlFRJXC0OB`,
          center: [initialState.lng, initialState.lat],
          zoom: initialState.zoom
        });        
        new Marker({color: "#FF0000"})
          .setLngLat([
            this.userLocation[0], 
            this.userLocation[1]
          ])
          .addTo(this.map);
      }
    });
  }

  get isUserLocationReady() {
    return this.UserLocationReady;
  }

  ngOnDestroy(): void {
    this.locationSubscription?.unsubscribe();
    this.map?.remove();
  }
}
