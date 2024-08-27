import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ProgressBarrComponent } from "../../shared/progress-barr/progress-barr.component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-client',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ProgressBarrComponent],
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

  getCliente(id: number){
    this.loading = true;
    this._clienteServicio.getCliente(id).subscribe((data: Cliente) => {
      console.log(data);
      this.loading = false;
      this.formAdd.patchValue({
        dni: data.dni || '',
        nombre: data.nombre || '',
        apellido: data.apellido || '',
        ciudad: data.ciudad || '',
        email: data.email || '',
        telefono: data.telefono || null
      });
    });
  }
}
