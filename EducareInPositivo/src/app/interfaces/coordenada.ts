export interface Coordenada {
  id?: number;
  nombre: string;
  lat: number;
  lng: number;
}

export interface CoordenadaResponse {
  coordenada: Coordenada;
}