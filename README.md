# EducareInPositivo

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 18.1.4.

## Arranque del Proyecto

Sigue los siguientes pasos para configurar y ejecutar el proyecto:

1. **Instalar dependencias del proyecto Angular**  
   ```bash
   cd \Educare
   npm install

2. **Instalar nodemon para el servidor**  
   ```bash
   cd \Server
   npm install --save-dev nodemon

3. **Clonar la base de datos**  
   Importa el archivo educare.sql en tu base de datos local.

4. **Iniciar el control de la base de datos (XAMPP)**  
   Inicia Apache y MySQL desde XAMPP.

5. **Compilar y observar los archivos TypeScript del servidor**  
   ```bash
   cd \Server
   tsc --watch

6. **Iniciar el servidor**  
   ```bash
   cd \Server
   nodemon dist/index.js

7. **Iniciar el servidor Angular**  
   ```bash
   cd \EducareInPositivo
   ng serve -o

## Bibliotecas utilizadas

El proyecto utiliza las siguientes bibliotecas clave:

- **MAPA:**
  - [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)
  - [Guía de uso en Angular](https://docs.maptiler.com/angular/maplibre-gl-js/how-to-use-maplibre-gl-js/)
  - [Obtén tu clave API](https://cloud.maptiler.com/account/keys/)

- **CALENDARIO:**
  - [Taiga UI Calendar](https://taiga-ui.dev/components/calendar-month)

- **GRÁFICOS:**
  - [Taiga UI Charts](https://taiga-ui.dev/charts/bar-chart)

## Información adicional

Si necesitas más ayuda con Angular CLI, utiliza el comando `ng help` o visita la [documentación oficial de Angular CLI](https://angular.dev/tools/cli).

## Consideraciones importantes

El proyecto está configurado para utilizar SSR (Server-Side Rendering), lo que implica que la aplicación se renderiza primero en el lado del servidor. Esto puede ocasionar problemas al obtener datos de navegación del usuario o al conectarse con APIs, ya que muchas dependen del renderizado del lado del cliente.

Para solucionar estos problemas, se implementaron las siguientes medidas:

- **Verificación del entorno del cliente:**  
  Se puede modificar el método `getUserLocation` en el servicio para verificar si el código está siendo ejecutado en el entorno del cliente antes de acceder a `navigator.geolocation`.

- **Tokens y funciones de Angular para la verificación:**
  - **PLATFORM_ID:** Un token de Angular que determina si el código se está ejecutando en el servidor o en el cliente.
  - **isPlatformBrowser:** Función que devuelve `true` si el código se está ejecutando en un navegador, lo que permite ejecutar el código del cliente de forma segura.




