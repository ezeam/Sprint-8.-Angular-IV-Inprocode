import { PLATFORM_ID, Inject, Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, Marker } from 'maplibre-gl';
import { LugaresService } from '../../services/lugares.service';
import { Subscription } from 'rxjs';
import { ProgressBarrComponent } from "../../shared/progress-barr/progress-barr.component";
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Coordenada } from '../../interfaces/coordenada';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ProgressBarrComponent, CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnDestroy {

  UserLocationReady: boolean = false;
  userLocation!: [number, number] | undefined;
  private locationSubscription?: Subscription;
  private markersSubscription?: Subscription;

  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  coordinates: { lng: number, lat: number, nombre: string, id: number }[] = [];
  private currentMarker: Marker | undefined;

  constructor(private _lugaresService: LugaresService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
      this.loadMarkers(); // Asegúrate de cargar los datos después de inicializar el mapa
    }
  }

  private initializeMap(): void {
    if (!this.mapContainer) {
      console.error('El contenedor del mapa no está disponible.');
      return;
    }

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=ATMKHhbBGgxlFRJXC0OB`,
      center: [0, 0], 
      zoom: 1 
    });
  }

  private loadMarkers(): void {
    if (!this.map) {
      console.error('El mapa no está listo.');
      return;
    }

    this.markersSubscription = this._lugaresService.getMarkers().subscribe(
      (markers: Coordenada[]) => {
        this.coordinates = markers.map(marker => ({
          lng: marker.lng,
          lat: marker.lat,
          nombre: marker.nombre,
          id: marker.id ?? 0
        }));
      },
      error => {
        console.error('Error al obtener los marcadores:', error);
      }
    );
  }

  get isUserLocationReady() {
    return this.UserLocationReady;
  }

  ngOnDestroy(): void {
    this.locationSubscription?.unsubscribe();
    this.markersSubscription?.unsubscribe();
    this.map?.remove();
  }

  addMapLocation(coordenadas: { lng: number, lat: number }): void {
    if (!this.map) {
      console.error('El mapa no está listo.');
      return;
    }

    if (this.currentMarker) {
      this.currentMarker.remove();
    }

    this.currentMarker = new Marker({ color: "#FF0000" })
      .setLngLat([coordenadas.lng, coordenadas.lat])
      .addTo(this.map);
  }

  showUserLocation(): void {
    if (this.userLocation) {
      this.addMapLocation({ lng: this.userLocation[0], lat: this.userLocation[1] });
    } else {
      this._lugaresService.getUserLocation().then(location => {
        this.userLocation = location;
        this.addMapLocation({ lng: location[0], lat: location[1] });
      }).catch(err => {
        console.error('Error al obtener la ubicación del usuario:', err);
      });
    }
  }
  
}
