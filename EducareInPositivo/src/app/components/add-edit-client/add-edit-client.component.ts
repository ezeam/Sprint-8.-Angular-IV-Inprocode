import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente, ClienteResponse } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ProgressBarrComponent } from "../../shared/progress-barr/progress-barr.component";
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-client',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ProgressBarrComponent, CommonModule],
  templateUrl: './add-edit-client.component.html',
  styleUrl: './add-edit-client.component.scss'
})
export class AddEditClientComponent implements OnInit{
  formAdd: FormGroup;
  loading: boolean = false;
  successAdd: boolean = false;
  id: number;
  operacion: string = "Añadir ";

  constructor(private fb: FormBuilder, 
    private _clienteServicio: ClienteService, 
    private router: Router, 
    private aRouter: ActivatedRoute, 
    private location: Location) {
    this.formAdd = this.fb.group({ 
      dni: ["", Validators.required],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      ciudad: ["", Validators.required],
      email: ["", Validators.required],
      telefono: [null, Validators.required],
    })
   this.id = Number(aRouter.snapshot.paramMap.get('id')) ; //Capturamos el id del cliente que queremos
  }

  ngOnInit(): void {
    if(this.id != 0){
      this.operacion = "Editar ";
      this.getCliente(this.id);
  }
}

  addClient(): void{
    console.log(this.formAdd.value.nombre);
     const client : Cliente = {
      dni: this.formAdd.value.dni,
      nombre: this.formAdd.value.nombre,
      apellido: this.formAdd.value.apellido,
      ciudad: this.formAdd.value.ciudad,
      email: this.formAdd.value.email,
      telefono: this.formAdd.value.telefono,
    }
    this.loading = true;
    this._clienteServicio.saveCliente(client).subscribe(() => {
      this.loading = false;
      this.successAdd = true;
      setTimeout(() => {
        this.successAdd = false;
        this.router.navigate(['/']);
      }, 2000);
    });
  }

  goBack(): void {
    this.location.back();
  }

  getCliente(id: number) {
  console.log("Id del cliente que vamos a editar", id);
  this.loading = true;
  this._clienteServicio.getCliente(id).subscribe((data: ClienteResponse) => { 
    console.log("Datos recibidos", data); 
    this.loading = false;
    if (data && data.cliente) { // Asegúrate de acceder a la estructura correcta
      console.log("Antes de patchValue", this.formAdd.value);
      this.formAdd.patchValue({
        dni: data.cliente.dni,
        nombre: data.cliente.nombre,
        apellido: data.cliente.apellido,
        ciudad: data.cliente.ciudad,
        email: data.cliente.email,
        telefono: data.cliente.telefono
      });
      console.log("Después de patchValue", this.formAdd.value); 
      }
    });
  }
}
