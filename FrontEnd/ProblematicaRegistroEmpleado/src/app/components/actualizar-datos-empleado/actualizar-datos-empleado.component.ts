// import { Component, OnInit } from '@angular/core';
// import { EmpleadoNavegacionComponent } from '../empleado-navegacion/empleado-navegacion.component';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { EmpleadoService } from '../../services/empleado.service';

// @Component({
//   selector: 'app-actualizar-datos-empleado',
//   imports: [
//     EmpleadoNavegacionComponent,
//      CommonModule, // Necesario para *ngFor
//         FormsModule, // Necesario para ngModel
//   ],
//   templateUrl: './actualizar-datos-empleado.component.html',
//   styleUrl: './actualizar-datos-empleado.component.css'
// })
// export class ActualizarDatosEmpleadoComponent implements OnInit {
//   nombre: string = '';
//   apellidoPaterno: string = '';
//   apellidoMaterno: string = '';
//   fechaNacimiento: string = '';
//   rfc: string = '';
//   claveEmpleado: string = ''; // Nueva propiedad para almacenar la clave del empleado
//   empleado: any = {};

//   telefonos: string[] = ['']; // Inicializa con un campo vacío
//   correos: string[] = ['']; // Inicializa con un campo vacío
//   referencias: { nombre: string; parentesco: string; telefono: string; correo: string }[] = [
//     { nombre: '', parentesco: '', telefono: '', correo: '' }
//   ];


//   constructor(
//     private route: ActivatedRoute,
//     private empleadoService: EmpleadoService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.claveEmpleado = this.route.snapshot.paramMap.get('claveEmpleado')!;
//     this.cargarEmpleado();
//   }


//   cargarEmpleado(): void {
//     this.empleadoService.obtenerEmpleado(this.claveEmpleado)
//       .subscribe(data => {
//         this.empleado = data;
//         // Mapear datos anidados si es necesario
//         this.empleado.nombre = data.nombreCompleto.nombre;
//         this.empleado.apellidoPaterno = data.nombreCompleto.apellidoPaterno;
//         // ...otros campos
//       });
//   }

//   actualizarEmpleado(): void {
//     const empleadoActualizado = {
//       claveEmpleado: this.empleado.claveEmpleado,
//       nombreCompleto: {
//         nombre: this.empleado.nombre,
//         apellidoPaterno: this.empleado.apellidoPaterno,
//         // ...agrega los otros campos
//       },
//       // ...demás propiedades
//     };

//     this.empleadoService.actualizarEmpleado(this.claveEmpleado, empleadoActualizado)
//       .subscribe(() => {
//         this.router.navigate(['/rh/buscar-empleado']);
//       });
//   }


//   // Función para generar el RFC en tiempo real
//   generarRFC(): void {
//     if (!this.nombre || !this.apellidoPaterno || !this.apellidoMaterno || !this.fechaNacimiento) {
//       this.rfc = ''; // Limpiar el RFC si falta algún dato
//       return;
//     }

//     // Obtener las iniciales del nombre y apellidos
//     const inicialNombre = this.nombre.charAt(0).toUpperCase();
//     const inicialApellidoPaterno = this.apellidoPaterno.charAt(0).toUpperCase();
//     const inicialApellidoMaterno = this.apellidoMaterno.charAt(0).toUpperCase();

//     // Obtener la fecha en formato YYMMDD
//     const date = new Date(this.fechaNacimiento);
//     const year = date.getFullYear().toString().slice(-2); // Últimos 2 dígitos del año
//     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes (agregar 1 porque los meses van de 0 a 11)
//     const day = date.getDate().toString().padStart(2, '0'); // Día

//     // Generar el RFC
//     this.rfc = `${inicialApellidoPaterno}${inicialApellidoMaterno}${inicialNombre}${year}${month}${day}`;
//   }



//   // Agregar Teléfono
//   agregarTelefono(): void {
//     this.telefonos.push('');
//   }

//   // Agregar Correo
//   agregarCorreo(): void {
//     this.correos.push('');
//   }

//   // Agregar Referencia
//   agregarReferencia(): void {
//     this.referencias.push({ nombre: '', parentesco: '', telefono: '', correo: '' });
//   }

//   // Limpiar formulario
//   limpiarFormulario(): void {
//     this.nombre = '';
//     this.apellidoPaterno = '';
//     this.apellidoMaterno = '';
//     this.fechaNacimiento = '';
//     this.rfc = '';
//     this.telefonos = ['']; // Reiniciar con un campo vacío
//     this.correos = ['']; // Reiniciar con un campo vacío
//     this.referencias = [{ nombre: '', parentesco: '', telefono: '', correo: '' }]; // Reiniciar con una referencia vacía
//   }
// }

































// actualizar-datos-empleado.component.ts
import { Component, OnInit } from '@angular/core';
import { EmpleadoNavegacionComponent } from '../empleado-navegacion/empleado-navegacion.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-actualizar-datos-empleado',
  standalone: true,
  imports: [
    EmpleadoNavegacionComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './actualizar-datos-empleado.component.html',
  styleUrls: ['./actualizar-datos-empleado.component.css']
})
export class ActualizarDatosEmpleadoComponent  {

  ngOnInit(): void {
    // Asigna una clave de empleado directamente para pruebas
    this.claveEmpleado = 'MMC-001'; // o la clave que quieras probar
    this.cargarDatosEmpleado();
  }


  // ngOnInit(): void {
  //   // Obtener la clave del empleado de los parámetros de la ruta
  //   this.route.paramMap.subscribe(params => {
  //     const clave = params.get('claveEmpleado');
  //     if (clave) {
  //       this.claveEmpleado = clave;
  //       this.cargarDatosEmpleado();
  //     } else {
  //       this.error = 'No se proporcionó una clave de empleado válida';
  //     }
  //   });
  // }

  // Datos no editables (solo lectura)
  claveEmpleado: string = '';
  rfc: string = '';
  nombreCompleto: string = '';

  // Datos personales editables
  sexo: string = '';

  // Datos de domicilio
  calle: string = '';
  numeroInterior: string = '';
  numeroExterior: string = '';
  colonia: string = '';
  codigoPostal: string = '';
  ciudad: string = '';

  // Datos de contacto
  telefonos: string[] = [''];
  correos: string[] = [''];

  // Referencias
  referencias: {
    nombre: string;
    parentesco: string;
    telefono: string;
    correo: string;
  }[] = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];

  // Control de estado
  cargando: boolean = false;
  mensaje: string = '';
  error: string = '';
  empleadoOriginal: any = null;

  constructor(
    private route: ActivatedRoute,
    private empleadoService: EmpleadoService,
    private router: Router
  ) {}



  cargarDatosEmpleado(): void {
    this.cargando = true;
    this.empleadoService.obtenerEmpleado(this.claveEmpleado).subscribe({
      next: (empleado) => {
        this.empleadoOriginal = empleado;

        // Datos no editables
        this.claveEmpleado = empleado.claveEmpleado;
        this.rfc = empleado.RFC;
        this.nombreCompleto = `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno} ${empleado.nombreCompleto.apellidoMaterno}`;

        // Datos personales editables
        this.sexo = empleado.sexo;

        // Datos de domicilio
        if (empleado.domicilio) {
          this.calle = empleado.domicilio.calle || '';
          this.numeroInterior = empleado.domicilio.numeroInterior || '';
          this.numeroExterior = empleado.domicilio.numeroExterior || '';
          this.colonia = empleado.domicilio.colonia || '';
          this.codigoPostal = empleado.domicilio.codigoPostal || '';
          this.ciudad = empleado.domicilio.ciudad || '';
        }

        // Datos de contacto
        this.telefonos = empleado.telefono && empleado.telefono.length > 0
          ? [...empleado.telefono]
          : [''];

        this.correos = empleado.correoElectronico && empleado.correoElectronico.length > 0
          ? [...empleado.correoElectronico]
          : [''];

        // Referencias
        if (empleado.referencias && empleado.referencias.length > 0) {
          this.referencias = empleado.referencias.map((ref: any) => ({
            nombre: ref.nombreFamiliar || '',
            parentesco: ref.parentesco || '',
            telefono: ref.telefonoFamiliar || '',
            correo: ref.correoElectronicoFamiliar || ''
          }));
        } else {
          this.referencias = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];
        }

        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar datos del empleado:', err);
        this.error = 'No se pudieron cargar los datos del empleado. Inténtelo de nuevo más tarde.';
        this.cargando = false;
      }
    });
  }

  guardarCambios(): void {
    if (!this.validarFormulario()) {
      this.error = 'Por favor, complete todos los campos obligatorios.';
      return;
    }

    // Preservar los datos que no deben cambiar
    const empleadoActualizado = {
      ...this.empleadoOriginal,
      sexo: this.sexo,
      domicilio: {
        calle: this.calle,
        numeroInterior: this.numeroInterior,
        numeroExterior: this.numeroExterior,
        colonia: this.colonia,
        codigoPostal: this.codigoPostal,
        ciudad: this.ciudad
      },
      telefono: this.telefonos.filter(t => t.trim() !== ''),
      correoElectronico: this.correos.filter(c => c.trim() !== ''),
      referencias: this.referencias
        .filter(r => r.nombre.trim() !== '' && r.telefono.trim() !== '')
        .map(r => ({
          nombreFamiliar: r.nombre,
          parentesco: r.parentesco,
          telefonoFamiliar: r.telefono,
          correoElectronicoFamiliar: r.correo
        }))
    };

    this.cargando = true;
    this.empleadoService.actualizarEmpleado(this.claveEmpleado, empleadoActualizado).subscribe({
      next: () => {
        this.mensaje = 'Datos actualizados correctamente';
        this.cargando = false;
        setTimeout(() => {
          this.router.navigate(['/empleado/dashboard']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error al actualizar datos:', err);
        this.error = 'No se pudieron actualizar los datos. Inténtelo de nuevo más tarde.';
        this.cargando = false;
      }
    });
  }

  validarFormulario(): boolean {
    return !!(
      this.sexo &&
      this.calle &&
      this.numeroExterior &&
      this.colonia &&
      this.codigoPostal &&
      this.ciudad &&
      this.telefonos.some(t => t.trim() !== '') &&
      this.correos.some(c => c.trim() !== '') &&
      this.referencias.some(r => r.nombre.trim() !== '' && r.telefono.trim() !== '')
    );
  }

  // Métodos para manejar campos dinámicos
  agregarTelefono(): void {
    this.telefonos.push('');
  }

  eliminarTelefono(index: number): void {
    if (this.telefonos.length > 1) {
      this.telefonos.splice(index, 1);
    }
  }

  agregarCorreo(): void {
    this.correos.push('');
  }

  eliminarCorreo(index: number): void {
    if (this.correos.length > 1) {
      this.correos.splice(index, 1);
    }
  }

  agregarReferencia(): void {
    this.referencias.push({ nombre: '', parentesco: '', telefono: '', correo: '' });
  }

  eliminarReferencia(index: number): void {
    if (this.referencias.length > 1) {
      this.referencias.splice(index, 1);
    }
  }
}
