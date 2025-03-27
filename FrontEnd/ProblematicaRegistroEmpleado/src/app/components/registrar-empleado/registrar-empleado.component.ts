// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RhNavegacionComponent } from "../rh-navegacion/rh-navegacion.component";
// import { EmpleadoService } from '../../services/empleado.service';
// import { CiudadesService } from '../../services/ciudad.services';

// @Component({
//   selector: 'app-registrar-empleado',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     RhNavegacionComponent
//   ],
//   templateUrl: './registrar-empleado.component.html',
//   styleUrls: ['./registrar-empleado.component.css']
// })
// export class RegistrarEmpleadoComponent implements OnInit {
//   // Datos básicos
//   nombre: string = '';
//   apellidoPaterno: string = '';
//   apellidoMaterno: string = '';
//   fechaNacimiento: string = '';
//   rfc: string = '';
//   claveEmpleado: string = '';
//   sexo: string = 'Masculino';

//   // Domicilio
//   calle: string = '';
//   numeroInterior: string = '';
//   numeroExterior: string = '';
//   colonia: string = '';
//   codigoPostal: string = '';
//   ciudad: string = '';

//   // Lista de ciudades disponibles desde la base de datos
//   ciudadesDisponibles: any[] = [];

//   // Datos laborales
//   departamento: string = '';
//   puesto: string = '';
//   cursos: string[] = [''];

//   // Contacto y referencias
//   telefonos: string[] = [''];
//   correos: string[] = [''];
//   referencias: { nombre: string; parentesco: string; telefono: string; correo: string }[] = [
//     { nombre: '', parentesco: '', telefono: '', correo: '' }
//   ];

//   mensaje: string = '';
//   error: string = '';
//   fotoUrl: string = '';
//   consecutivoActual: number = 1;

//   constructor(
//     private empleadoService: EmpleadoService,
//     private ciudadService: CiudadesService
//   ) {
//     // Idealmente, obtener el último consecutivo de la base de datos
//     this.obtenerUltimoConsecutivo();
//   }

//   ngOnInit(): void {
//     // Cargar la lista de ciudades cuando se inicializa el componente
//     this.cargarCiudades();
//   }

//   cargarCiudades(): void {
//     this.ciudadService.verCiudades().subscribe(
//       ciudades => {
//         this.ciudadesDisponibles = ciudades;
//       },
//       error => {
//         console.error('Error al cargar las ciudades:', error);
//         this.error = 'No se pudieron cargar las ciudades. Por favor, inténtelo de nuevo más tarde.';
//       }
//     );
//   }

//   obtenerUltimoConsecutivo(): void {
//     this.empleadoService.obtenerEmpleados().subscribe(
//       empleados => {
//         if (empleados && empleados.length > 0) {
//           // Extraer los consecutivos de las claves existentes (asumiendo formato XYZ-001)
//           const consecutivos = empleados
//             .map((emp: { claveEmpleado: string; }) => {
//               const match = emp.claveEmpleado.match(/-(\d+)$/);
//               return match ? parseInt(match[1], 10) : 0;
//             })
//             .filter((num: number) => !isNaN(num));

//           if (consecutivos.length > 0) {
//             this.consecutivoActual = Math.max(...consecutivos) + 1;
//           }
//         }
//         // Generar clave si ya tenemos los datos
//         if (this.nombre && this.apellidoPaterno && this.apellidoMaterno) {
//           this.generarClaveEmpleado();
//         }
//       },
//       error => {
//         console.error('Error al obtener consecutivo:', error);
//         // Si hay error, seguimos con el consecutivo por defecto
//       }
//     );
//   }

//   // Generar RFC en tiempo real
//   generarRFC(): void {
//     if (!this.nombre || !this.apellidoPaterno || !this.apellidoMaterno || !this.fechaNacimiento) {
//       this.rfc = '';
//       return;
//     }

//     const inicialNombre = this.nombre.charAt(0).toUpperCase();
//     const inicialApellidoPaterno = this.apellidoPaterno.charAt(0).toUpperCase();
//     const inicialApellidoMaterno = this.apellidoMaterno.charAt(0).toUpperCase();

//     const date = new Date(this.fechaNacimiento);
//     if (isNaN(date.getTime())) {
//       this.rfc = '';
//       return;
//     }

//     const year = date.getFullYear().toString().slice(-2);
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');

//     this.rfc = `${inicialApellidoPaterno}${inicialApellidoMaterno}${inicialNombre}${year}${month}${day}`;

//     // Llama a la función para generar la clave del empleado
//     this.generarClaveEmpleado();
//   }

//   // Función para generar la clave del empleado en tiempo real
//   generarClaveEmpleado(): void {
//     if (!this.nombre || !this.apellidoPaterno || !this.apellidoMaterno) {
//       this.claveEmpleado = '';
//       return;
//     }

//     const inicialNombre = this.nombre.charAt(0).toUpperCase();
//     const inicialApellidoPaterno = this.apellidoPaterno.charAt(0).toUpperCase();
//     const inicialApellidoMaterno = this.apellidoMaterno.charAt(0).toUpperCase();
//     const consecutivo = this.consecutivoActual.toString().padStart(3, '0');

//     this.claveEmpleado = `${inicialNombre}${inicialApellidoPaterno}${inicialApellidoMaterno}-${consecutivo}`;
//   }

//   // Agregar o eliminar elementos dinámicos
//   agregarTelefono(): void { this.telefonos.push(''); }
//   eliminarTelefono(index: number): void {
//     this.telefonos.splice(index, 1); }

//   agregarCorreo(): void { this.correos.push(''); }
//   eliminarCorreo(index: number): void {
//     this.correos.splice(index, 1); }

//   agregarReferencia(): void { this.referencias.push({ nombre: '', parentesco: '', telefono: '', correo: '' }); }
//   eliminarReferencia(index: number): void {
//      this.referencias.splice(index, 1); }

//   agregarCurso(): void {this.cursos.push('') }
//   eliminarCurso(index: number): void {
//     this.cursos.splice(index, 1);
//   }

//   // Enviar datos al backend
//   registrarEmpleado(): void {
//     if (!this.validarFormulario()) {
//       this.error = "Por favor, completa todos los campos obligatorios.";
//       return;
//     }

//     const empleado = {
//       claveEmpleado: this.claveEmpleado,
//       nombre: this.nombre,
//       apellidoPaterno: this.apellidoPaterno,
//       apellidoMaterno: this.apellidoMaterno,
//       fechaNacimiento: this.fechaNacimiento,
//       rfc: this.rfc,
//       sexo: this.sexo,
//       // Domicilio
//       calle: this.calle,
//       numeroInterior: this.numeroInterior,
//       numeroExterior: this.numeroExterior,
//       colonia: this.colonia,
//       codigoPostal: this.codigoPostal,
//       ciudad: this.ciudad,
//       // Datos laborales
//       departamento: this.departamento,
//       puesto: this.puesto,
//       cursos: this.cursos.filter(c => c.trim() !== ''),
//       // Contacto
//       telefonos: this.telefonos.filter(t => t.trim() !== ''),
//       correos: this.correos.filter(c => c.trim() !== ''),
//       referencias: this.referencias.filter(r => r.nombre.trim() !== ''),
//     };

//     this.empleadoService.registrarEmpleado(empleado).subscribe(
//       response => {
//         this.mensaje = "¡Empleado registrado con éxito!";
//         this.limpiarFormulario();
//         // Incrementar el consecutivo para el próximo empleado
//         this.consecutivoActual++;
//       },
//       error => {
//         this.error = "Hubo un error al registrar el empleado.";
//         console.error("Error al registrar:", error);
//       }
//     );
//   }

//   // Validar que el formulario esté completo antes de enviar
//   private validarFormulario(): boolean {
//     return !!(
//       this.nombre &&
//       this.apellidoPaterno &&
//       this.apellidoMaterno &&
//       this.fechaNacimiento &&
//       this.rfc &&
//       this.sexo &&
//       this.calle &&
//       this.numeroExterior &&
//       this.colonia &&
//       this.codigoPostal &&
//       this.ciudad &&
//       this.departamento &&
//       this.puesto &&
//       this.telefonos.some(tel => tel.trim() !== '')
//     );
//   }

//   // Limpiar formulario
//   limpiarFormulario(): void {
//     // Datos básicos
//     this.nombre = '';
//     this.apellidoPaterno = '';
//     this.apellidoMaterno = '';
//     this.fechaNacimiento = '';
//     this.rfc = '';
//     this.claveEmpleado = '';
//     this.sexo = 'Masculino';

//     // Domicilio
//     this.calle = '';
//     this.numeroInterior = '';
//     this.numeroExterior = '';
//     this.colonia = '';
//     this.codigoPostal = '';
//     this.ciudad = '';

//     // Datos laborales
//     this.departamento = '';
//     this.puesto = '';
//     this.cursos = [''];

//     // Contacto y referencias
//     this.telefonos = [''];
//     this.correos = [''];
//     this.referencias = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];

//     // Limpiar mensajes
//     this.mensaje = '';
//     this.error = '';
//   }
// }















import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RhNavegacionComponent } from "../rh-navegacion/rh-navegacion.component";
import { EmpleadoService } from '../../services/empleado.service';
import { CiudadesService } from '../../services/ciudad.services';
import { FileUploadService } from '../../services/file-upload.service';

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
export class RegistrarEmpleadoComponent implements OnInit {
  // Datos básicos
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  fechaNacimiento: string = '';
  rfc: string = '';
  claveEmpleado: string = '';
  sexo: string = 'Masculino';
  foto: string = ''; // Cambiado de fotoUrl a foto para coincidir con backend

  // Domicilio
  calle: string = '';
  numeroInterior: string = '';
  numeroExterior: string = '';
  colonia: string = '';
  codigoPostal: string = '';
  ciudad: string = '';

  // Lista de ciudades disponibles desde la base de datos
  ciudadesDisponibles: any[] = [];

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
  isSubmitting: boolean = false;

  constructor(
    private empleadoService: EmpleadoService,
    private ciudadService: CiudadesService,
    private fileUploadService: FileUploadService
  ) {
    this.obtenerUltimoConsecutivo();
  }

  ngOnInit(): void {
    this.cargarCiudades();
  }

  cargarCiudades(): void {
    this.ciudadService.verCiudades().subscribe(
      ciudades => {
        this.ciudadesDisponibles = ciudades;
      },
      error => {
        console.error('Error al cargar las ciudades:', error);
        this.error = 'No se pudieron cargar las ciudades. Por favor, inténtelo de nuevo más tarde.';
      }
    );
  }

  obtenerUltimoConsecutivo(): void {
    this.empleadoService.obtenerEmpleados().subscribe(
      empleados => {
        if (empleados && empleados.length > 0) {
          const consecutivos = empleados
            .map((emp: any) => {
              const match = emp.claveEmpleado.match(/-(\d+)$/);
              return match ? parseInt(match[1], 10) : 0;
            })
            .filter((num: number) => !isNaN(num));

          if (consecutivos.length > 0) {
            this.consecutivoActual = Math.max(...consecutivos) + 1;
          }
        }
        if (this.nombre && this.apellidoPaterno && this.apellidoMaterno) {
          this.generarClaveEmpleado();
        }
      },
      error => {
        console.error('Error al obtener consecutivo:', error);
      }
    );
  }

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
    this.generarClaveEmpleado();
  }

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

  // Métodos para manejar arrays dinámicos
  agregarTelefono(): void { this.telefonos.push(''); }
  eliminarTelefono(index: number): void { this.telefonos.splice(index, 1); }

  agregarCorreo(): void { this.correos.push(''); }
  eliminarCorreo(index: number): void { this.correos.splice(index, 1); }

  agregarReferencia(): void { this.referencias.push({ nombre: '', parentesco: '', telefono: '', correo: '' }); }
  eliminarReferencia(index: number): void { this.referencias.splice(index, 1); }

  agregarCurso(): void { this.cursos.push(''); }
  eliminarCurso(index: number): void { this.cursos.splice(index, 1); }

  // Manejo de subida de archivos
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.isSubmitting = true;
      this.fileUploadService.uploadFile(file, 'empleados').subscribe(
        (event: any) => {
          if (event.body) {
            this.foto = event.body.file.url;
            this.isSubmitting = false;
          }
        },
        error => {
          this.error = 'Error al subir la imagen. Por favor, intente nuevamente.';
          this.isSubmitting = false;
        }
      );
    }
  }

  // Enviar datos al backend
  registrarEmpleado(): void {

    // if (this.isSubmitting) return;

    // if (!this.validarFormulario()) {
    //   this.error = "Por favor, completa todos los campos obligatorios.";
    //   return;
    // }
    if (!this.validarFormulario()) {
      this.error = "Por favor, completa todos los campos obligatorios.";
      return;
    }

    this.isSubmitting = true;
    this.error = '';
    this.mensaje = '';

    const empleado = {
      claveEmpleado: this.claveEmpleado,
      nombreCompleto: {
        nombre: this.nombre,
        apellidoPaterno: this.apellidoPaterno,
        apellidoMaterno: this.apellidoMaterno
      },
      RFC: this.rfc,
      fechaNacimiento: this.fechaNacimiento,
      sexo: this.sexo,
      foto: this.foto,
      domicilio: {
        calle: this.calle,
        numeroInterior: this.numeroInterior,
        numeroExterior: this.numeroExterior,
        colonia: this.colonia,
        codigoPostal: this.codigoPostal,
        ciudad: this.ciudad
      },
      departamento: this.departamento,
      puesto: this.puesto,
      telefonos: this.telefonos.filter(t => t.trim() !== ''),
      correos: this.correos.filter(c => c.trim() !== ''),
      referencias: this.referencias.filter(r => r.nombre.trim() !== ''),
      cursos: this.cursos.filter(c => c.trim() !== '')
    };

    this.empleadoService.registrarEmpleado(empleado).subscribe(
      response => {
        this.mensaje = "¡Empleado registrado con éxito!";
        this.limpiarFormulario();
        this.consecutivoActual++;
        this.isSubmitting = false;
      },
      // error => {
      //   this.error = "Hubo un error al registrar el empleado: " +
      //     (error.error?.message || error.message || 'Error desconocido');
      //   console.error("Error al registrar:", error);
      //   this.isSubmitting = false;
      // }
      error => {
        this.error = "Hubo un error al registrar el empleado: " +
          (error.error?.message || error.message || 'Error desconocido');
        console.error("Error al registrar:", error);
      }
    );
  }

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

  limpiarFormulario(): void {
    this.nombre = '';
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
    this.fechaNacimiento = '';
    this.rfc = '';
    this.claveEmpleado = '';
    this.sexo = 'Masculino';
    this.foto = '';

    this.calle = '';
    this.numeroInterior = '';
    this.numeroExterior = '';
    this.colonia = '';
    this.codigoPostal = '';
    this.ciudad = '';

    this.departamento = '';
    this.puesto = '';
    this.cursos = [''];

    this.telefonos = [''];
    this.correos = [''];
    this.referencias = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];
  }
}
