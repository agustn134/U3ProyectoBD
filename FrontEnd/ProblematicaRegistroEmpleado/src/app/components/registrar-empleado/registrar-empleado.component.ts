import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor
import { FormsModule } from '@angular/forms'; // Para ngModel
import { RhNavegacionComponent } from '../rh-navegacion/rh-navegacion.component';
// C:\U3Proyecto_NBD\FrontEnd\ProblematicaRegistroEmpleado\src\app\components\registrar-empleado\registrar-empleado.component.ts
@Component({
  selector: 'app-registrar-empleado',
  standalone: true,
  imports: [
    CommonModule, // Necesario para *ngFor
    FormsModule, // Necesario para ngModel
    RhNavegacionComponent
  ],
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})
export class RegistrarEmpleadoComponent {
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  fechaNacimiento: string = '';
  rfc: string = '';
  claveEmpleado: string = ''; // Nueva propiedad para almacenar la clave del empleado

  telefonos: string[] = ['']; // Inicializa con un campo vacío
  correos: string[] = ['']; // Inicializa con un campo vacío
  referencias: { nombre: string; parentesco: string; telefono: string; correo: string }[] = [
    { nombre: '', parentesco: '', telefono: '', correo: '' }
  ];

  // Función para generar el RFC en tiempo real
  generarRFC(): void {
    if (!this.nombre || !this.apellidoPaterno || !this.apellidoMaterno || !this.fechaNacimiento) {
      this.rfc = ''; // Limpiar el RFC si falta algún dato
      return;
    }

    // Obtener las iniciales del nombre y apellidos
    const inicialNombre = this.nombre.charAt(0).toUpperCase();
    const inicialApellidoPaterno = this.apellidoPaterno.charAt(0).toUpperCase();
    const inicialApellidoMaterno = this.apellidoMaterno.charAt(0).toUpperCase();

    // Obtener la fecha en formato YYMMDD
    const date = new Date(this.fechaNacimiento);
    const year = date.getFullYear().toString().slice(-2); // Últimos 2 dígitos del año
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes (agregar 1 porque los meses van de 0 a 11)
    const day = date.getDate().toString().padStart(2, '0'); // Día

    // Generar el RFC
    this.rfc = `${inicialApellidoPaterno}${inicialApellidoMaterno}${inicialNombre}${year}${month}${day}`;

    // Llama a la función para generar la clave del empleado
    this.generarClaveEmpleado();
  }

  // Función para generar la clave del empleado en tiempo real
  generarClaveEmpleado(): void {
    if (!this.nombre || !this.apellidoPaterno || !this.apellidoMaterno) {
      this.claveEmpleado = ''; // Limpiar la clave si falta algún dato
      return;
    }

    // Obtener las iniciales del nombre, apellido paterno y apellido materno
    const inicialNombre = this.nombre.charAt(0).toUpperCase();
    const inicialApellidoPaterno = this.apellidoPaterno.charAt(0).toUpperCase();
    const inicialApellidoMaterno = this.apellidoMaterno.charAt(0).toUpperCase();

    // Consecutivo ficticio (puedes ajustarlo según tu base de datos)
    const consecutivo = ('001').padStart(3, '0'); // Por simplicidad, usaremos "001" como consecutivo inicial

    // Generar la clave del empleado
    this.claveEmpleado = `${inicialNombre}${inicialApellidoPaterno}${inicialApellidoMaterno}-${consecutivo}`;
  }

  // Agregar Teléfono
  agregarTelefono(): void {
    this.telefonos.push('');
  }

  // Agregar Correo
  agregarCorreo(): void {
    this.correos.push('');
  }

  // Agregar Referencia
  agregarReferencia(): void {
    this.referencias.push({ nombre: '', parentesco: '', telefono: '', correo: '' });
  }

  // Limpiar formulario
  limpiarFormulario(): void {
    this.nombre = '';
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
    this.fechaNacimiento = '';
    this.rfc = '';
    this.claveEmpleado = ''; // Reiniciar la clave del empleado
    this.telefonos = ['']; // Reiniciar con un campo vacío
    this.correos = ['']; // Reiniciar con un campo vacío
    this.referencias = [{ nombre: '', parentesco: '', telefono: '', correo: '' }]; // Reiniciar con una referencia vacía
  }
}
