import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  listaClientes: Cliente[] = [
    { id: 1,
      dni: "44587963L",
      nombre: "Ana",
      apellido: "Martín Prueba1",
      ciudad: "Bacelona",
      email: "prueba1@.gmail.com",
      telefono: 652374521
    },
    { id: 2,
      dni: "44758563F",
      nombre: "Pepe",
      apellido: "Osuna Prueba2",
      ciudad: "Madrid",
      email: "prueba2@.gmail.com",
      telefono: 412789634
    },
  ]
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
