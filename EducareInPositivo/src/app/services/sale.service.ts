import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Sale {
  id: number;
  mes: string;
  venta: number;
}

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = 'http://localhost:3000/api/sales';

  constructor(private http: HttpClient) {}

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl);
  }
}
