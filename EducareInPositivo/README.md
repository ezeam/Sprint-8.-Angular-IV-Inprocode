# EducareInPositivo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.4.

## Arrancar
1-bash--> \Educare> npm install
2-bash--> \Server> npm install --save-dev nodemon
3-Clonar base de datos educare.sql
4-Control de la base de datos (XAMPP):  
  Apache y MySQL Start
5-\Server> tsc --watch
6-\Server> nodemon dist/index.js
7-\EducareInPositivo> ng serve -o

## liberías
MAPA: https://maplibre.org/maplibre-gl-js/docs/
      https://docs.maptiler.com/angular/maplibre-gl-js/how-to-use-maplibre-gl-js/
      https://cloud.maptiler.com/account/keys/
CALENDARIO: https://taiga-ui.dev/components/calendar-month
GRÁFICOS: https://taiga-ui.dev/charts/bar-chart

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Datos a tener en cuenta
La aplicación está iniciada como SSR (Server-Side Rendering), desde lado del servidor, por lo que tuve problemas a la hora de recuperar los datos de navegación del usuario y a la hora de conectarme con cualquier API, ya que todas renderizan primero desde lado del cliente.
Para solucionarlo hice lo siguiente: 
  -Verificación del entorno del cliente
  -Puedes modificar el método getUserLocation en el servicio para verificar si estás en el entorno del cliente antes de intentar acceder a  navigator.geolocation:
    -->PLATFORM_ID: Es un token de Angular que te permite determinar si el código se está ejecutando en el lado del servidor o del cliente.
    -->isPlatformBrowser: Es una función que verifica si el código se está ejecutando en un navegador (cliente). Si devuelve true, puedes estar seguro de que el código del cliente se puede ejecutar.


