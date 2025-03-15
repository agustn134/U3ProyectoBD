import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { RhNavegacionComponent } from "../rh-navegacion/rh-navegacion.component";
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-registrar-empleado',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
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

  telefonos: string[] = [''];
  correos: string[] = [''];
  referencias: { nombre: string; parentesco: string; telefono: string; correo: string }[] = [
    { nombre: '', parentesco: '', telefono: '', correo: '' }
  ];

  mensaje: string = ''; // Para mostrar mensajes al usuario
  error: string = ''; // Para manejar errores

  constructor(private empleadoService: EmpleadoService) {}

  // Generar RFC en tiempo real
  generarRFC(): void {
    if (!this.nombre || !this.apellidoPaterno || !this.apellidoMaterno || !this.fechaNacimiento) {
      this.rfc = '';
      return;
    }

    const inicialNombre = this.nombre.charAt(0).toUpperCase();
    const inicialApellidoPaterno = this.apellidoPaterno.charAt(0).toUpperCase();
    const inicialApellidoMaterno = this.apellidoMaterno.charAt(0).toUpperCase();

    const date = new Date(this.fechaNacimiento);
    if (isNaN(date.getTime())) {
      this.rfc = '';
      return;
    }

    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

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

  // Agregar o eliminar elementos dinámicos
  agregarTelefono(): void { this.telefonos.push(''); }
  eliminarTelefono(index: number): void { this.telefonos.splice(index, 1); }

  agregarCorreo(): void { this.correos.push(''); }
  eliminarCorreo(index: number): void { this.correos.splice(index, 1); }

  agregarReferencia(): void { this.referencias.push({ nombre: '', parentesco: '', telefono: '', correo: '' }); }
  eliminarReferencia(index: number): void { this.referencias.splice(index, 1); }

  // Enviar datos al backend
  registrarEmpleado(): void {
    if (!this.validarFormulario()) {
      this.error = "Por favor, completa todos los campos obligatorios.";
      return;
    }

    const empleado = {
      nombre: this.nombre,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      fechaNacimiento: this.fechaNacimiento,
      rfc: this.rfc,
      telefonos: this.telefonos.filter(t => t.trim() !== ''),
      correos: this.correos.filter(c => c.trim() !== ''),
      referencias: this.referencias.filter(r => r.nombre.trim() !== ''),
    };

    this.empleadoService.registrarEmpleado(empleado).subscribe(
      response => {
        this.mensaje = "¡Empleado registrado con éxito!";
        this.limpiarFormulario();
      },
      error => {
        this.error = "Hubo un error al registrar el empleado.";
        console.error("Error al registrar:", error);
      }
    );
  }

  // Validar que el formulario esté completo antes de enviar
  private validarFormulario(): boolean {
    return !!(this.nombre && this.apellidoPaterno && this.apellidoMaterno && this.fechaNacimiento);
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
