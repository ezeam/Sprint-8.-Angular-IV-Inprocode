import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  listaClientes: Cliente[] = [
    { id: 1,
      dni: "44587963L",
      nombre: "Ana",
      apellido: "Martín Prueba1",
      ciudad: "Bacelona",
      email: "prueba1@.gmail.com",
      telefono: '652374521'
    },
    { id: 2,
      dni: "44758563F",
      nombre: "Pepe",
      apellido: "Osuna Prueba2",
      ciudad: "Madrid",
      email: "prueba2@.gmail.com",
      telefono: '412789634'
    },
  ]

  constructor() {}
}
