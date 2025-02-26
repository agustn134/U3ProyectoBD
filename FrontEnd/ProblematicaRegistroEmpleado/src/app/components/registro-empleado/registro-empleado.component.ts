import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmpleadoService } from '../../services/empleado.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-registro-empleado',
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './registro-empleado.component.html',
  styleUrl: './registro-empleado.component.css'
})
export class RegistroEmpleadoComponent {

  empleado = {
    claveEmpleado: '',
    nombreCompleto: { nombre: '', apellidoPaterno: '', apellidoMaterno: '' },
    RFC: '',
    fechaNacimiento: '',
    sexo: '',
    domicilio: {
      calle: '',
      numeroInterior: '',
      numeroExterior: '',
      colonia: '',
      codigoPostal: '',
      ciudad: '',
    },
    departamento: '',
    puesto: '',
    telefono: [],
    correoElectronico: [],
    referencias: [],
  };

  constructor(private empleadoService: EmpleadoService) {}

  agregarTelefono() {
    this.empleado.telefono.push();
  }

  eliminarTelefono(index: number) {
    this.empleado.telefono.splice(index, 1);
  }

  agregarCorreo() {
    this.empleado.correoElectronico.push();
  }

  eliminarCorreo(index: number) {
    this.empleado.correoElectronico.splice(index, 1);
  }

  agregarReferencia() {
    this.empleado.referencias.push();
  }

  eliminarReferencia(index: number) {
    this.empleado.referencias.splice(index, 1);
  }

  onSubmit() {
    this.empleadoService.createEmpleado(this.empleado).subscribe(
      (response) => {
        console.log('Empleado registrado:', response);
      },
      (error) => {
        console.error('Error registrando empleado:', error);
      }
    );
  }

}
