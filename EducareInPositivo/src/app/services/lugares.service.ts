import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  private userLocationSubject = new BehaviorSubject<[number, number] | undefined>(undefined);
  public userLocation$ = this.userLocationSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.getUserLocation();
    }
  }

  get isUserLocationReady(): boolean {
    return !!this.userLocationSubject.value;
  }

  public async getUserLocation(): Promise<[number, number]> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.reject('No se puede obtener la geolocalización en el servidor.');
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const location: [number, number] = [coords.longitude, coords.latitude];
          this.userLocationSubject.next(location);
          console.log("Geolocalización que recupera el servicio: ", location);
          resolve(location);
        },
        (err) => {
          alert("No se pudo obtener la geolocalización");
          console.log(err);
          reject(err);
        }
      );
    });
  }
}
