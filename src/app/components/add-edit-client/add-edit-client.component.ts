import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../interfaces/cliente';

@Component({
  selector: 'app-add-edit-client',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-edit-client.component.html',
  styleUrl: './add-edit-client.component.scss'
})
export class AddEditClientComponent {
  formAdd: FormGroup;

  constructor(private fb: FormBuilder){
    this.formAdd = this.fb.group({ 
      dni: ["", Validators.required],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      ciudad: ["", Validators.required],
      email: ["", Validators.required],
      telefono: [null, Validators.required],
    })
  }

  addClient(){
    console.log(this.formAdd.value.nombre);
     const client : Cliente = {
      dni: this.formAdd.value.dni,
      nombre: this.formAdd.value.nombre,
      apellido: this.formAdd.value.apellido,
      ciudad: this.formAdd.value.ciudad,
      email: this.formAdd.value.email,
      telefono: this.formAdd.value.telefono,
    }
    console.log("Cliente añadido:", client);
  }
}
