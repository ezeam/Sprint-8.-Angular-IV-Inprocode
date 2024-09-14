# EducareInPositivo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.4.

## Arrancar
\Server> tsc --watch
\Server> nodemon dist/index.js

\EducareInPositivo> ng serve -o

XAMPP
Apache y MySQL Start

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


La aplicación está iniciada como SSR, desde lado del servidor, por lo que tuve problemas a la hora de recuperar los datos de navegación del usuario. Para solucionarlo hice lo siguiente: 
Verificación del entorno del cliente
Puedes modificar el método getUserLocation en el servicio para verificar si estás en el entorno del cliente antes de intentar acceder a navigator.geolocation:
-->PLATFORM_ID: Es un token de Angular que te permite determinar si el código se está ejecutando en el lado del servidor o del cliente.
-->isPlatformBrowser: Es una función que verifica si el código se está ejecutando en un navegador (cliente). Si devuelve true, puedes estar seguro de que el código del cliente se puede ejecutar.


## Guia para instlar MapLibre en Angular:
https://docs.maptiler.com/angular/maplibre-gl-js/how-to-use-maplibre-gl-js/
https://cloud.maptiler.com/account/keys/