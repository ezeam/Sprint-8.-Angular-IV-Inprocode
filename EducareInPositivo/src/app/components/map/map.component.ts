import { Component, OnInit } from '@angular/core';
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
export class MapComponent implements OnInit {

  UserLocationReady: boolean = false;
  userLocation!: [number, number] | undefined;
  private locationSubscription?: Subscription;

  constructor(private _lugaresService: LugaresService) {}

  ngOnInit(): void {
    this.locationSubscription = this._lugaresService.userLocation$.subscribe(location => {
      if (location) {
        this.userLocation = location;
        this.UserLocationReady = true;
        console.log("Mi geolocalización es: ", this.userLocation);
      }
    });
  }

  get isUserLocationReady() {
    return this.UserLocationReady;
  }

  ngOnDestroy(): void {
    this.locationSubscription?.unsubscribe();
  }
}
  

