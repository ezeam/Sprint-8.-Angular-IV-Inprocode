import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente';
import { RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
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
  
  constructor(private _clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getListClientes();
  };


  getListClientes(){
    this._clienteService.getListClientes().subscribe((data: Cliente[]) => {
      console.log("Lista de clientes que viene desde la bd",data);
    })
  }
}
