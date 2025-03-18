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
  // Datos básicos
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  fechaNacimiento: string = '';
  rfc: string = '';
  claveEmpleado: string = '';
  sexo: string = 'Masculino';
  
  // Domicilio
  calle: string = '';
  numeroInterior: string = '';
  numeroExterior: string = '';
  colonia: string = '';
  codigoPostal: string = '';
  ciudad: string = '';
  
  // Datos laborales
  departamento: string = '';
  puesto: string = '';
  cursos: string[] = [''];
  
  // Contacto y referencias
  telefonos: string[] = [''];
  correos: string[] = [''];
  referencias: { nombre: string; parentesco: string; telefono: string; correo: string }[] = [
    { nombre: '', parentesco: '', telefono: '', correo: '' }
  ];

  mensaje: string = '';
  error: string = '';

  consecutivoActual: number = 1;

  constructor(private empleadoService: EmpleadoService) {
    // Idealmente, obtener el último consecutivo de la base de datos
    this.obtenerUltimoConsecutivo();
  }

  obtenerUltimoConsecutivo(): void {
    this.empleadoService.obtenerEmpleados().subscribe(
      empleados => {
        if (empleados && empleados.length > 0) {
          // Extraer los consecutivos de las claves existentes (asumiendo formato XYZ-001)
          const consecutivos = empleados
            .map((emp: { claveEmpleado: string; }) => {
              const match = emp.claveEmpleado.match(/-(\d+)$/);
              return match ? parseInt(match[1], 10) : 0;
            })
            .filter((num: number) => !isNaN(num));
          
          if (consecutivos.length > 0) {
            this.consecutivoActual = Math.max(...consecutivos) + 1;
          }
        }
        // Generar clave si ya tenemos los datos
        if (this.nombre && this.apellidoPaterno && this.apellidoMaterno) {
          this.generarClaveEmpleado();
        }
      },
      error => {
        console.error('Error al obtener consecutivo:', error);
        // Si hay error, seguimos con el consecutivo por defecto
      }
    );
  }

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
      this.claveEmpleado = '';
      return;
    }

    const inicialNombre = this.nombre.charAt(0).toUpperCase();
    const inicialApellidoPaterno = this.apellidoPaterno.charAt(0).toUpperCase();
    const inicialApellidoMaterno = this.apellidoMaterno.charAt(0).toUpperCase();
    const consecutivo = this.consecutivoActual.toString().padStart(3, '0');

    this.claveEmpleado = `${inicialNombre}${inicialApellidoPaterno}${inicialApellidoMaterno}-${consecutivo}`;
  }

  // Agregar o eliminar elementos dinámicos
  agregarTelefono(): void { this.telefonos.push(''); }
  eliminarTelefono(index: number): void { 
    this.telefonos.splice(index, 1); }

  agregarCorreo(): void { this.correos.push(''); }
  eliminarCorreo(index: number): void { 
    this.correos.splice(index, 1); }

  agregarReferencia(): void { this.referencias.push({ nombre: '', parentesco: '', telefono: '', correo: '' }); }
  eliminarReferencia(index: number): void {
     this.referencias.splice(index, 1); }

  agregarCurso(): void {this.cursos.push('') }
  eliminarCurso(index: number): void {
    this.cursos.splice(index, 1);
  }

  // Enviar datos al backend
  registrarEmpleado(): void {
    if (!this.validarFormulario()) {
      this.error = "Por favor, completa todos los campos obligatorios.";
      return;
    }

    const empleado = {
      claveEmpleado: this.claveEmpleado,
      nombre: this.nombre,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      fechaNacimiento: this.fechaNacimiento,
      rfc: this.rfc,
      sexo: this.sexo,
      // Domicilio
      calle: this.calle,
      numeroInterior: this.numeroInterior,
      numeroExterior: this.numeroExterior,
      colonia: this.colonia,
      codigoPostal: this.codigoPostal,
      ciudad: this.ciudad,
      // Datos laborales
      departamento: this.departamento,
      puesto: this.puesto,
      cursos: this.cursos,
      // Contacto
      telefonos: this.telefonos.filter(t => t.trim() !== ''),
      correos: this.correos.filter(c => c.trim() !== ''),
      referencias: this.referencias.filter(r => r.nombre.trim() !== ''),
    };

    this.empleadoService.registrarEmpleado(empleado).subscribe(
      response => {
        this.mensaje = "¡Empleado registrado con éxito!";
        this.limpiarFormulario();
        // Incrementar el consecutivo para el próximo empleado
        this.consecutivoActual++;
      },
      error => {
        this.error = "Hubo un error al registrar el empleado.";
        console.error("Error al registrar:", error);
      }
    );
  }

  // Validar que el formulario esté completo antes de enviar
  private validarFormulario(): boolean {
    return !!(
      this.nombre && 
      this.apellidoPaterno && 
      this.apellidoMaterno && 
      this.fechaNacimiento &&
      this.rfc &&
      this.sexo &&
      this.calle &&
      this.numeroExterior &&
      this.colonia &&
      this.codigoPostal &&
      this.ciudad &&
      this.departamento &&
      this.puesto &&
      this.telefonos.some(tel => tel.trim() !== '')
      
    );
  }

  // Limpiar formulario
  limpiarFormulario(): void {
    // Datos básicos
    this.nombre = '';
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
    this.fechaNacimiento = '';
    this.rfc = '';
    this.claveEmpleado = '';
    this.sexo = 'Masculino';
    
    // Domicilio
    this.calle = '';
    this.numeroInterior = '';
    this.numeroExterior = '';
    this.colonia = '';
    this.codigoPostal = '';
    this.ciudad = '';
    
    // Datos laborales
    this.departamento = '';
    this.puesto = '';
    this.cursos = [''];
    
    // Contacto y referencias
    this.telefonos = [''];
    this.correos = [''];
    this.referencias = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];
    
    // Limpiar mensajes
    this.mensaje = '';
    this.error = '';
  }
};