import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  if (!navigator.geolocation) {
    alert("El navegador no soporta la geolocalización");
    throw new Error ("El navegador no soporta la geolocalización");
  }
