import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  private userLocationSubject = new BehaviorSubject<[number, number] | undefined>(undefined);
  public userLocation$ = this.userLocationSubject.asObservable();
  private apiUrl = 'http://localhost:3000/api/markers';

  constructor(@Inject(PLATFORM_ID) private platformId: object, private http: HttpClient) {
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

  public getMarkers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener los marcadores:', error);
        return of([]); 
      })
    );
  }

  public addMarker(marker: { lat: number, lng: number, description: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, marker).pipe(
      catchError(error => {
        console.error('Error al añadir el marcador:', error);
        throw error;
      })
    );
  }
}