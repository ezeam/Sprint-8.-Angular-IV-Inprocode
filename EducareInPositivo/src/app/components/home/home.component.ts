import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente';
import { RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { ProgressBarrComponent } from "../../shared/progress-barr/progress-barr.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ProgressBarrComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  listaClientes: Cliente[] = []
  loading: boolean = false;
  successDelete: boolean = false;
  
  constructor(private _clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getListClientes();
  };


  getListClientes(){
    this.loading = true;
    this._clienteService.getListClientes().subscribe((data: Cliente[]) => {
      this.listaClientes = data;
      this.loading = false;
    })
  }

  deleteCliente(id: number){
    this.loading = true;
    this._clienteService.deleteCliente(id).subscribe(() => {
      this.getListClientes();
      this.successDelete = true;
      setTimeout(() => {
        this.successDelete = false;
      }, 2000);
    })
  } 
}

