import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../eviroments/enviroment';
import { Cliente } from '../interfaces/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private myAppUrl: String;
  private myApiUrl: String;

  constructor(private http: HttpClient) { 
    this.myAppUrl = enviroment.endpoint;
    this.myApiUrl = 'api/clientes/';
  }

  getListClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}
