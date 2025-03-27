// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { EmpleadoService } from '../../services/empleado.service';
// import { RhNavegacionComponent } from '../../components/rh-navegacion/rh-navegacion.component';
// import { FiltrarEmpleadosPipe } from './filtrar-empleados.pipe';
// import { ActividadesService } from '../../services/actividades.service';
// import { CursosService } from '../../services/cursos.service';

// @Component({
//   selector: 'app-buscar-empleado',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule, RhNavegacionComponent,FiltrarEmpleadosPipe],
//   templateUrl: './buscar-empleado.component.html',
//   styleUrls: ['./buscar-empleado.component.css'],
// })
// export class BuscarEmpleadoComponent implements OnInit {
//   terminoBusqueda: string = '';
//   empleados: any[] = [];
//   empleadosFiltrados: any[] = [];
//   mensajeError: string = '';
//   cargando: boolean = false;
//   empleadoSeleccionado: any = null;
//   mostrarModal: boolean = false;
//   cursos: any[] = [];
//   cursoForm: any = {};
//   mostrarFormularioCurso: boolean = false;
//   mostrarFormularioActividad: boolean = false;
//   actividades: any[] = [];
//   actividadForm: any = {};
//   mostrarModalEdicion: boolean = false;
//   empleadoEdicion: any = {
//     nombreCompleto: {},
//     domicilio: {},
//     referencias: [],
//   };

//   constructor(
//     private empleadoService: EmpleadoService,
//     private router: Router,
//     private cursosService: CursosService,
//     private actividadesService: ActividadesService,
//   ) {}

//   ngOnInit(): void {
//     this.cargarTodosLosEmpleados();
//   }

//   // abrir modal de edición
//   abrirModalEdicion(empleado: any): void {
//     // Clonar el empleado para edición
//     this.empleadoEdicion = JSON.parse(JSON.stringify(empleado));
//     this.mostrarModalEdicion = true;
//   }

//   // Método para guardar cambios del empleado
//   guardarCambiosEmpleado(): void {
//     if (this.validarFormulario()) {
//       const empleadoActualizado = {
//         claveEmpleado: this.claveEmpleado,
//         nombre: this.nombre,
//         apellidoPaterno: this.apellidoPaterno,
//         apellidoMaterno: this.apellidoMaterno,
//         fechaNacimiento: this.fechaNacimiento,
//         rfc: this.rfc,
//         sexo: this.sexo,
//         departamento: this.departamento,
//         puesto: this.puesto,
//         // Domicilio
//         calle: this.calle,
//         numeroInterior: this.numeroInterior,
//         numeroExterior: this.numeroExterior,
//         colonia: this.colonia,
//         codigoPostal: this.codigoPostal,
//         ciudad: this.ciudad,
//         // Contacto
//         telefonos: this.telefonos.filter(t => t.trim() !== ''),
//         correos: this.correos.filter(c => c.trim() !== ''),
//         referencias: this.referencias.filter(r => r.nombre.trim() !== ''),
//         cursos: this.cursos.filter(c => c.trim() !== '')
//       };

//       this.cargando = true;
//       this.empleadoService.actualizarEmpleado(this.claveEmpleado, empleadoActualizado).subscribe({
//         next: (response) => {
//           this.mensaje = '¡Empleado actualizado con éxito!';
//           this.mostrarModalEdicion = false;
//           // Actualizar la lista de empleados
//           this.cargarTodosLosEmpleados();
//           this.cargando = false;
//         },
//         error: (error) => {
//           this.error = 'Error al actualizar el empleado';
//           console.error('Error al actualizar:', error);
//           this.cargando = false;
//         }
//       });
//     } else {
//       this.error = 'Por favor, completa todos los campos obligatorios.';
//     }
//   }

//   // Validar datos antes de actualizar
//   validarDatosEmpleado(): boolean {
//     const empleado = this.empleadoEdicion;
//     return !!(
//       empleado.nombreCompleto.nombre &&
//       empleado.nombreCompleto.apellidoPaterno &&
//       empleado.nombreCompleto.apellidoMaterno &&
//       empleado.domicilio.calle &&
//       empleado.domicilio.ciudad
//     );
//   }

//   cerrarModalEdicion(): void {
//     this.mostrarModalEdicion = false;
//     this.error = '';
//     this.mensaje = '';
//   }

//   cargarTodosLosEmpleados(): void {
//     this.cargando = true;
//     this.empleadoService.obtenerEmpleados().subscribe({
//       next: (data) => {
//         this.empleados = data;
//         this.empleadosFiltrados = [...this.empleados];
//         this.cargando = false;
//       },
//       error: (error) => {
//         console.error('Error al cargar empleados:', error);
//         this.mensajeError =
//           'Error al cargar la lista de empleados. Intente nuevamente.';
//         this.cargando = false;
//       },
//     });
//   }

//   buscarEmpleados(): void {
//     if (!this.terminoBusqueda || this.terminoBusqueda.trim() === '') {
//       this.empleadosFiltrados = [...this.empleados];
//       return;
//     }
//     const termino = this.terminoBusqueda.toLowerCase().trim();
//     this.empleadosFiltrados = this.empleados.filter(
//       (emp) =>
//         emp.claveEmpleado?.toLowerCase().includes(termino) ||
//         emp.nombreCompleto?.nombre?.toLowerCase().includes(termino) ||
//         emp.nombreCompleto?.apellidoPaterno?.toLowerCase().includes(termino) ||
//         emp.nombreCompleto?.apellidoMaterno?.toLowerCase().includes(termino) ||
//         emp.RFC?.toLowerCase().includes(termino) ||
//         emp.departamento?.toLowerCase().includes(termino)
//     );

//     if (this.empleadosFiltrados.length === 0) {
//       this.mensajeError =
//         'No se encontraron empleados con ese criterio de búsqueda';
//     } else {
//       this.mensajeError = '';
//     }
//   }

//   verDetalles(claveEmpleado: string): void {
//     this.cargando = true;
//     this.empleadoService.obtenerEmpleado(claveEmpleado).subscribe({
//       next: (data) => {
//         this.empleadoSeleccionado = data;
//         this.mostrarModal = true;
//         this.cargando = false;
//       },
//       error: (error) => {
//         console.error('Error al obtener detalles del empleado:', error);
//         this.mensajeError = 'Error al cargar los detalles del empleado';
//         this.cargando = false;
//       },
//     });
//   }

//   cerrarModal(): void {
//     this.mostrarModal = false;
//     this.empleadoSeleccionado = null;
//   }

//   editarEmpleado(claveEmpleado: string): void {
//     this.cargando = true;
//     this.empleadoService.obtenerEmpleado(claveEmpleado).subscribe({
//       next: (empleado) => {
//         // Mapear los datos del empleado al formulario de edición
//         this.nombre = empleado.nombreCompleto.nombre;
//         this.apellidoPaterno = empleado.nombreCompleto.apellidoPaterno;
//         this.apellidoMaterno = empleado.nombreCompleto.apellidoMaterno;
//         this.fechaNacimiento = new Date(empleado.fechaNacimiento).toISOString().split('T')[0];
//         this.rfc = empleado.RFC;
//         this.claveEmpleado = empleado.claveEmpleado;
//         this.sexo = empleado.sexo;
//         this.departamento = empleado.departamento;
//         this.puesto = empleado.puesto;

//         // Mapear datos de domicilio
//         if (empleado.domicilio) {
//           this.calle = empleado.domicilio.calle || '';
//           this.numeroInterior = empleado.domicilio.numeroInterior || '';
//           this.numeroExterior = empleado.domicilio.numeroExterior || '';
//           this.colonia = empleado.domicilio.colonia || '';
//           this.codigoPostal = empleado.domicilio.codigoPostal || '';
//           this.ciudad = empleado.domicilio.ciudad || '';
//         }

//         // Mapear teléfonos
//         this.telefonos = empleado.telefono ? [...empleado.telefono] : [''];

//         // Mapear correos
//         this.correos = empleado.correoElectronico ? [...empleado.correoElectronico] : [''];

//         // Mapear referencias
//         if (empleado.referencias && empleado.referencias.length > 0) {
//           this.referencias = empleado.referencias.map((ref: any) => ({
//             nombre: ref.nombreFamiliar,
//             parentesco: ref.parentesco,
//             telefono: ref.telefonoFamiliar,
//             correo: ref.correoElectronicoFamiliar
//           }));
//         } else {
//           this.referencias = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];
//         }

//         // Mapear cursos si existen
//         if (empleado.cursosEmpleado && empleado.cursosEmpleado.length > 0) {
//           this.cursos = [...empleado.cursosEmpleado];
//         } else {
//           this.cursos = [''];
//         }

//         this.cargando = false;
//         this.mostrarModalEdicion = true;
//       },
//       error: (error) => {
//         console.error('Error al obtener datos del empleado:', error);
//         this.mensajeError = 'Error al cargar los datos del empleado para edición';
//         this.cargando = false;
//       }
//     });
//   }

//   eliminarEmpleado(claveEmpleado: string): void {
//     if (confirm('¿Está seguro que desea eliminar este empleado?')) {
//       this.cargando = true;
//       this.empleadoService.eliminarEmpleado(claveEmpleado).subscribe({
//         next: () => {
//           this.empleados = this.empleados.filter(
//             (emp) => emp.claveEmpleado !== claveEmpleado
//           );
//           this.empleadosFiltrados = this.empleadosFiltrados.filter(
//             (emp) => emp.claveEmpleado !== claveEmpleado
//           );
//           this.cargando = false;
//         },
//         error: (error) => {
//           console.error('Error al eliminar empleado:', error);
//           this.mensajeError = 'Error al eliminar el empleado';
//           this.cargando = false;
//         },
//       });
//     }
//   }

//   abrirFormularioCurso(empleado: any): void {
//     this.empleadoSeleccionado = empleado;
//     this.cursoForm = {
//       nombreEmpleado: `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno}`,
//       claveEmpleado: empleado.claveEmpleado,
//       nombre: '',
//       fechaInicio: '',
//       fechaTermino: '',
//       tipoDocumento: 'Constancia'
//     };
//     this.mostrarFormularioCurso = true;
//   }

//   cerrarFormularioCurso(): void {
//     this.mostrarFormularioCurso = false;
//     this.cursoForm = {};
//   }


//   guardarCurso(): void {
//     if (
//       this.cursoForm.nombre &&
//       this.cursoForm.fechaInicio &&
//       this.cursoForm.fechaTermino &&
//       this.cursoForm.tipoDocumento
//     ) {
//       const nuevoCurso = {
//         nombreEmpleado: this.cursoForm.nombreEmpleado,
//         nombreCurso: this.cursoForm.nombre,
//         fechaInicio: this.cursoForm.fechaInicio,
//         fechaTermino: this.cursoForm.fechaTermino,
//         documentoEntregado: {
//           tipoDocumento: this.cursoForm.tipoDocumento,
//           rutaArchivo: 'pendiente.pdf'
//         }
//       };

//       this.cargando = true;

//       // Primero registrar el curso
//       this.cursosService.crearCurso(nuevoCurso).subscribe({
//         next: (response) => {
//           // Ahora obtenemos el empleado completo antes de actualizarlo
//           this.empleadoService.obtenerEmpleado(this.empleadoSeleccionado.claveEmpleado).subscribe({
//             next: (empleado) => {
//               // Creamos una copia para no modificar el original
//               const empleadoActualizado = {...empleado};

//               // Asegurarnos de que exista la propiedad cursosEmpleado
//               if (!empleadoActualizado.cursosEmpleado) {
//                 empleadoActualizado.cursosEmpleado = [];
//               }

//               // Añadir el nuevo curso
//               empleadoActualizado.cursosEmpleado.push(this.cursoForm.nombre);

//               // Actualizar solo el campo cursosEmpleado del empleado
//               this.empleadoService.actualizarEmpleado(
//                 empleadoActualizado.claveEmpleado,
//                 empleadoActualizado
//               ).subscribe({
//                 next: () => {
//                   this.mensaje = '¡Curso registrado con éxito!';
//                   this.cerrarFormularioCurso();
//                   this.cargando = false;

//                   // Recargar la lista de empleados para reflejar los cambios
//                   this.cargarTodosLosEmpleados();
//                 },
//                 error: (error) => {
//                   console.error('Error al actualizar empleado con nuevo curso:', error);
//                   this.error = 'Error al asociar el curso al empleado';
//                   this.cargando = false;
//                 }
//               });
//             },
//             error: (error) => {
//               console.error('Error al obtener datos del empleado:', error);
//               this.error = 'Error al obtener datos actualizados del empleado';
//               this.cargando = false;
//             }
//           });
//         },
//         error: (error) => {
//           console.error('Error al registrar curso:', error);
//           this.error = 'Error al registrar el curso';
//           this.cargando = false;
//         }
//       });
//     } else {
//       this.error = 'Por favor, complete todos los campos requeridos del curso.';
//     }
//   }


//   eliminarCurso(index: number): void {
//     if (confirm('¿Estás seguro de eliminar este curso?')) {
//       this.cursos.splice(index, 1);
//     }
//   }

//   editarCurso(index: number): void {
//     const curso = this.cursos[index];
//     this.cursoForm = { ...curso };
//     this.mostrarFormularioCurso = true;
//   }

//   abrirFormularioActividad(): void {
//     this.actividadForm = {
//       nombre: '',
//       estatus: 'Pendiente',
//       fechaInicio: '',
//       fechaTermino: '',
//       empleadosSeleccionados: []
//     };

//     // Asegurarse de que ya tenemos cargados los empleados
//     if (this.empleados.length === 0) {
//       this.cargando = true;
//       this.empleadoService.obtenerEmpleados().subscribe({
//         next: (empleados) => {
//           this.empleados = empleados;
//           this.cargando = false;
//           this.mostrarFormularioActividad = true;
//         },
//         error: (error) => {
//           console.error('Error al cargar empleados:', error);
//           this.error = 'Error al cargar la lista de empleados';
//           this.cargando = false;
//         }
//       });
//     } else {
//       this.mostrarFormularioActividad = true;
//     }
//   }

//   cerrarFormularioActividad(): void {
//     this.mostrarFormularioActividad = false;
//     this.actividadForm = {};
//   }


//   guardarActividad(): void {
//     if (
//       this.actividadForm.nombre &&
//       this.actividadForm.estatus &&
//       this.actividadForm.fechaInicio &&
//       this.actividadForm.fechaTermino &&
//       this.actividadForm.empleadosSeleccionados &&
//       this.actividadForm.empleadosSeleccionados.length > 0
//     ) {
//       const nuevaActividad = {
//         nombreActividad: this.actividadForm.nombre,
//         estatus: this.actividadForm.estatus,
//         fechaInicioActividad: this.actividadForm.fechaInicio,
//         fechaTerminoActividad: this.actividadForm.fechaTermino,
//         empleadosAsociados: this.actividadForm.empleadosSeleccionados
//       };

//       this.cargando = true;
//       this.actividadesService.crearActividad(nuevaActividad).subscribe({
//         next: (response) => {
//           this.mensaje = '¡Actividad registrada con éxito!';
//           this.cerrarFormularioActividad();
//           this.cargando = false;
//           // Opcionalmente, puedes cargar de nuevo las actividades si implementas esa función
//         },
//         error: (error) => {
//           console.error('Error al registrar actividad:', error);
//           this.error = 'Error al registrar la actividad';
//           this.cargando = false;
//         }
//       });
//     } else {
//       this.error = 'Por favor, complete todos los campos y seleccione al menos un empleado.';
//     }
//   }


//   filtroEmpleadosActividad: string = '';

// toggleEmpleadoSeleccionado(claveEmpleado: string): void {
//   if (!this.actividadForm.empleadosSeleccionados) {
//     this.actividadForm.empleadosSeleccionados = [];
//   }

//   const index = this.actividadForm.empleadosSeleccionados.indexOf(claveEmpleado);
//   if (index === -1) {
//     this.actividadForm.empleadosSeleccionados.push(claveEmpleado);
//   } else {
//     this.actividadForm.empleadosSeleccionados.splice(index, 1);
//   }
// }

// isEmpleadoSeleccionado(claveEmpleado: string): boolean {
//   return this.actividadForm.empleadosSeleccionados?.includes(claveEmpleado) || false;
// }

//   // Función para generar la clave
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

//   // Generar RFC
//   generarRFC(): void {
//     if (
//       !this.nombre ||
//       !this.apellidoPaterno ||
//       !this.apellidoMaterno ||
//       !this.fechaNacimiento
//     ) {
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

//   // Datos laborales
//   departamento: string = '';
//   puesto: string = '';

//   // Contacto y referencias
//   telefonos: string[] = [''];
//   correos: string[] = [''];
//   referencias: {
//     nombre: string;
//     parentesco: string;
//     telefono: string;
//     correo: string;
//   }[] = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];

//   mensaje: string = '';
//   error: string = '';

//   consecutivoActual: number = 1;

//   agregarTelefono(): void {
//     this.telefonos.push('');
//   }
//   eliminarTelefono(index: number): void {
//     this.telefonos.splice(index, 1);
//   }
//   agregarCorreo(): void {
//     this.correos.push('');
//   }
//   eliminarCorreo(index: number): void {
//     this.correos.splice(index, 1);
//   }
//   agregarReferencia(): void {
//     this.referencias.push({
//       nombre: '',
//       parentesco: '',
//       telefono: '',
//       correo: '',
//     });
//   }
//   eliminarReferencia(index: number): void {
//     this.referencias.splice(index, 1);
//   }

//   agregarCurso(): void {
//     this.cursos.push('');
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
//       this.telefonos.some((tel) => tel.trim() !== '')
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
//     this.referencias = [
//       { nombre: '', parentesco: '', telefono: '', correo: '' },
//     ];

//     // Limpiar mensajes
//     this.mensaje = '';
//     this.error = '';
//   }
// }














































// V!


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { EmpleadoService } from '../../services/empleado.service';
// import { RhNavegacionComponent } from '../../components/rh-navegacion/rh-navegacion.component';
// import { FiltrarEmpleadosPipe } from './filtrar-empleados.pipe';
// import { ActividadesService } from '../../services/actividades.service';
// import { CursosService } from '../../services/cursos.service';

// @Component({
//   selector: 'app-buscar-empleado',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule, RhNavegacionComponent, FiltrarEmpleadosPipe],
//   templateUrl: './buscar-empleado.component.html',
//   styleUrls: ['./buscar-empleado.component.css'],
// })
// export class BuscarEmpleadoComponent implements OnInit {
//   terminoBusqueda: string = '';
//   empleados: any[] = [];
//   empleadosFiltrados: any[] = [];
//   mensajeError: string = '';
//   cargando: boolean = false;
//   empleadoSeleccionado: any = null;
//   mostrarModal: boolean = false;
//   cursos: any[] = [];
//   cursoForm: any = {};
//   mostrarFormularioCurso: boolean = false;
//   mostrarFormularioActividad: boolean = false;
//   actividades: any[] = [];
//   actividadForm: any = {};
//   mostrarModalEdicion: boolean = false;
//   empleadoEdicion: any = {
//     nombreCompleto: {},
//     domicilio: {},
//     referencias: [],
//   };
//   mensaje: string = '';
//   error: string = '';

//   // Datos básicos para el formulario de edición
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

//   // Datos laborales
//   departamento: string = '';
//   puesto: string = '';

//   // Contacto y referencias
//   telefonos: string[] = [''];
//   correos: string[] = [''];
//   referencias: {
//     nombre: string;
//     parentesco: string;
//     telefono: string;
//     correo: string;
//   }[] = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];

//   consecutivoActual: number = 1;

//   constructor(
//     private empleadoService: EmpleadoService,
//     private router: Router,
//     private cursosService: CursosService,
//     private actividadesService: ActividadesService,
//   ) {}

//   ngOnInit(): void {
//     this.cargarTodosLosEmpleados();
//   }

//   // Cargar todos los empleados del backend
//   cargarTodosLosEmpleados(): void {
//     this.cargando = true;
//     this.empleadoService.obtenerEmpleados().subscribe({
//       next: (data) => {
//         console.log('Empleados cargados:', data);
//         this.empleados = data;
//         this.empleadosFiltrados = [...this.empleados];
//         this.cargando = false;
//       },
//       error: (error) => {
//         console.error('Error al cargar empleados:', error);
//         this.mensajeError =
//           'Error al cargar la lista de empleados. Intente nuevamente.';
//         this.cargando = false;
//       },
//     });
//   }

//   // Búsqueda de empleados
//   buscarEmpleados(): void {
//     if (!this.terminoBusqueda || this.terminoBusqueda.trim() === '') {
//       this.empleadosFiltrados = [...this.empleados];
//       this.mensajeError = '';
//       return;
//     }

//     // Si el término tiene al menos 3 caracteres, podemos usar el endpoint de búsqueda
//     if (this.terminoBusqueda.trim().length >= 3) {
//       this.cargando = true;
//       this.empleadoService.buscarEmpleados(this.terminoBusqueda).subscribe({
//         next: (data) => {
//           this.empleadosFiltrados = data;
//           this.cargando = false;
//           this.mensajeError = '';
//         },
//         error: (error) => {
//           console.error('Error en búsqueda:', error);
//           // Si hay error en la búsqueda, hacemos filtrado local
//           this.filtrarEmpleadosLocal();
//           this.cargando = false;
//         }
//       });
//     } else {
//       // Para términos cortos, hacemos filtrado local
//       this.filtrarEmpleadosLocal();
//     }
//   }

//   // Filtrado local de empleados
//   filtrarEmpleadosLocal(): void {
//     const termino = this.terminoBusqueda.toLowerCase().trim();
//     this.empleadosFiltrados = this.empleados.filter(
//       (emp) =>
//         emp.claveEmpleado?.toLowerCase().includes(termino) ||
//         emp.nombreCompleto?.nombre?.toLowerCase().includes(termino) ||
//         emp.nombreCompleto?.apellidoPaterno?.toLowerCase().includes(termino) ||
//         emp.nombreCompleto?.apellidoMaterno?.toLowerCase().includes(termino) ||
//         emp.RFC?.toLowerCase().includes(termino) ||
//         emp.departamento?.toLowerCase().includes(termino)
//     );

//     if (this.empleadosFiltrados.length === 0) {
//       this.mensajeError = 'No se encontraron empleados con ese criterio de búsqueda';
//     } else {
//       this.mensajeError = '';
//     }
//   }

//   // Ver detalles de un empleado
//   verDetalles(claveEmpleado: string): void {
//     this.cargando = true;
//     this.empleadoService.obtenerEmpleado(claveEmpleado).subscribe({
//       next: (data) => {
//         this.empleadoSeleccionado = data;
//         this.mostrarModal = true;
//         this.cargando = false;
//       },
//       error: (error) => {
//         console.error('Error al obtener detalles del empleado:', error);
//         this.mensajeError = 'Error al cargar los detalles del empleado';
//         this.cargando = false;
//       },
//     });
//   }

//   cerrarModal(): void {
//     this.mostrarModal = false;
//     this.empleadoSeleccionado = null;
//   }

//   // Editar empleado
//   editarEmpleado(claveEmpleado: string): void {
//     this.cargando = true;
//     this.empleadoService.obtenerEmpleado(claveEmpleado).subscribe({
//       next: (empleado) => {
//         console.log('Datos del empleado para edición:', empleado);

//         // Mapear los datos del empleado al formulario de edición
//         this.nombre = empleado.nombreCompleto.nombre;
//         this.apellidoPaterno = empleado.nombreCompleto.apellidoPaterno;
//         this.apellidoMaterno = empleado.nombreCompleto.apellidoMaterno;
//         this.fechaNacimiento = new Date(empleado.fechaNacimiento).toISOString().split('T')[0];
//         this.rfc = empleado.RFC;
//         this.claveEmpleado = empleado.claveEmpleado;
//         this.sexo = empleado.sexo;
//         this.departamento = empleado.departamento;
//         this.puesto = empleado.puesto;

//         // Mapear datos de domicilio
//         if (empleado.domicilio) {
//           this.calle = empleado.domicilio.calle || '';
//           this.numeroInterior = empleado.domicilio.numeroInterior || '';
//           this.numeroExterior = empleado.domicilio.numeroExterior || '';
//           this.colonia = empleado.domicilio.colonia || '';
//           this.codigoPostal = empleado.domicilio.codigoPostal || '';
//           this.ciudad = empleado.domicilio.ciudad || '';
//         }

//         // Mapear teléfonos
//         this.telefonos = empleado.telefono && empleado.telefono.length > 0
//           ? [...empleado.telefono]
//           : [''];

//         // Mapear correos
//         this.correos = empleado.correoElectronico && empleado.correoElectronico.length > 0
//           ? [...empleado.correoElectronico]
//           : [''];

//         // Mapear referencias
//         if (empleado.referencias && empleado.referencias.length > 0) {
//           this.referencias = empleado.referencias.map((ref: any) => ({
//             nombre: ref.nombreFamiliar,
//             parentesco: ref.parentesco,
//             telefono: ref.telefonoFamiliar,
//             correo: ref.correoElectronicoFamiliar || ''
//           }));
//         } else {
//           this.referencias = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];
//         }

//         // Mapear cursos si existen
//         this.cursos = empleado.cursosEmpleado && empleado.cursosEmpleado.length > 0
//           ? [...empleado.cursosEmpleado]
//           : [''];

//         this.cargando = false;
//         this.mostrarModalEdicion = true;
//       },
//       error: (error) => {
//         console.error('Error al obtener datos del empleado:', error);
//         this.mensajeError = 'Error al cargar los datos del empleado para edición';
//         this.cargando = false;
//       }
//     });
//   }

//   // Guardar cambios del empleado
//   guardarCambiosEmpleado(): void {
//     if (this.validarFormulario()) {
//       // Crear la estructura correcta para enviar al backend
//       const empleadoActualizado = {
//         nombreCompleto: {
//           nombre: this.nombre,
//           apellidoPaterno: this.apellidoPaterno,
//           apellidoMaterno: this.apellidoMaterno
//         },
//         fechaNacimiento: this.fechaNacimiento,
//         RFC: this.rfc,
//         sexo: this.sexo,
//         departamento: this.departamento,
//         puesto: this.puesto,
//         domicilio: {
//           calle: this.calle,
//           numeroInterior: this.numeroInterior,
//           numeroExterior: this.numeroExterior,
//           colonia: this.colonia,
//           codigoPostal: this.codigoPostal,
//           ciudad: this.ciudad
//         },
//         telefonos: this.telefonos.filter(t => t.trim() !== ''),
//         correos: this.correos.filter(c => c.trim() !== ''),
//         referencias: this.referencias
//           .filter(r => r.nombre.trim() !== '')
//           .map(ref => ({
//             nombreFamiliar: ref.nombre,
//             parentesco: ref.parentesco,
//             telefonoFamiliar: ref.telefono,
//             correoElectronicoFamiliar: ref.correo || ''
//           })),
//         cursosEmpleado: this.cursos.filter(c => c.trim() !== '')
//       };

//       this.cargando = true;
//       console.log('Enviando datos actualizados:', empleadoActualizado);

//       this.empleadoService.actualizarEmpleado(this.claveEmpleado, empleadoActualizado).subscribe({
//         next: (response) => {
//           console.log('Respuesta actualización:', response);
//           this.mensaje = '¡Empleado actualizado con éxito!';
//           setTimeout(() => {
//             this.mostrarModalEdicion = false;
//             this.mensaje = '';
//             // Actualizar la lista de empleados
//             this.cargarTodosLosEmpleados();
//           }, 1500);
//           this.cargando = false;
//         },
//         error: (error) => {
//           this.error = 'Error al actualizar el empleado: ' + (error.message || 'Verificar con el administrador');
//           console.error('Error al actualizar:', error);
//           this.cargando = false;
//         }
//       });
//     } else {
//       this.error = 'Por favor, completa todos los campos obligatorios.';
//     }
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
//       this.telefonos.some((tel) => tel.trim() !== '')
//     );
//   }

//   cerrarModalEdicion(): void {
//     this.mostrarModalEdicion = false;
//     this.error = '';
//     this.mensaje = '';
//   }

//   // Eliminar empleado
//   eliminarEmpleado(claveEmpleado: string): void {
//     if (confirm('¿Está seguro que desea eliminar este empleado?')) {
//       this.cargando = true;
//       this.empleadoService.eliminarEmpleado(claveEmpleado).subscribe({
//         next: (response) => {
//           console.log('Empleado eliminado:', response);
//           // Actualizar listas después de eliminar
//           this.empleados = this.empleados.filter(emp => emp.claveEmpleado !== claveEmpleado);
//           this.empleadosFiltrados = this.empleadosFiltrados.filter(emp => emp.claveEmpleado !== claveEmpleado);
//           this.cargando = false;
//         },
//         error: (error) => {
//           console.error('Error al eliminar empleado:', error);
//           this.mensajeError = 'Error al eliminar el empleado: ' + (error.message || 'Verificar con el administrador');
//           this.cargando = false;
//         },
//       });
//     }
//   }

//   // GESTIÓN DE CURSOS
//   abrirFormularioCurso(empleado: any): void {
//     this.empleadoSeleccionado = empleado;
//     this.cursoForm = {
//       nombreEmpleado: `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno}`,
//       claveEmpleado: empleado.claveEmpleado,
//       nombre: '',
//       fechaInicio: '',
//       fechaTermino: '',
//       tipoDocumento: 'Constancia'
//     };
//     this.mostrarFormularioCurso = true;
//   }

//   cerrarFormularioCurso(): void {
//     this.mostrarFormularioCurso = false;
//     this.cursoForm = {};
//     this.error = '';
//     this.mensaje = '';
//   }

//   guardarCurso(): void {
//     if (
//       this.cursoForm.nombre &&
//       this.cursoForm.fechaInicio &&
//       this.cursoForm.fechaTermino &&
//       this.cursoForm.tipoDocumento
//     ) {
//       const nuevoCurso = {
//         nombreEmpleado: this.cursoForm.nombreEmpleado,
//         nombreCurso: this.cursoForm.nombre,
//         fechaInicio: this.cursoForm.fechaInicio,
//         fechaTermino: this.cursoForm.fechaTermino,
//         documentoEntregado: {
//           tipoDocumento: this.cursoForm.tipoDocumento,
//           rutaArchivo: 'pendiente.pdf'
//         }
//       };

//       this.cargando = true;
//       console.log('Enviando nuevo curso:', nuevoCurso);

//       // Primero registrar el curso
//       this.cursosService.crearCurso(nuevoCurso).subscribe({
//         next: (responseCurso) => {
//           console.log('Curso registrado:', responseCurso);

//           // Ahora obtenemos el empleado completo antes de actualizarlo
//           this.empleadoService.obtenerEmpleado(this.empleadoSeleccionado.claveEmpleado).subscribe({
//             next: (empleado) => {
//               console.log('Empleado recuperado para actualizar:', empleado);

//               // Asegurarnos de que exista la propiedad cursosEmpleado
//               if (!empleado.cursosEmpleado) {
//                 empleado.cursosEmpleado = [];
//               }

//               // Añadir el nuevo curso
//               empleado.cursosEmpleado.push(this.cursoForm.nombre);

//               // Actualizar el empleado con el nuevo curso
//               this.empleadoService.actualizarEmpleado(
//                 empleado.claveEmpleado,
//                 empleado
//               ).subscribe({
//                 next: (responseEmpleado) => {
//                   console.log('Empleado actualizado con nuevo curso:', responseEmpleado);
//                   this.mensaje = '¡Curso registrado con éxito!';
//                   setTimeout(() => {
//                     this.cerrarFormularioCurso();
//                     this.cargarTodosLosEmpleados();
//                   }, 1500);
//                   this.cargando = false;
//                 },
//                 error: (error) => {
//                   console.error('Error al actualizar empleado con nuevo curso:', error);
//                   this.error = 'Error al asociar el curso al empleado: ' + (error.message || 'Verificar con el administrador');
//                   this.cargando = false;
//                 }
//               });
//             },
//             error: (error) => {
//               console.error('Error al obtener datos del empleado:', error);
//               this.error = 'Error al obtener datos actualizados del empleado: ' + (error.message || 'Verificar con el administrador');
//               this.cargando = false;
//             }
//           });
//         },
//         error: (error) => {
//           console.error('Error al registrar curso:', error);
//           this.error = 'Error al registrar el curso: ' + (error.message || 'Verificar con el administrador');
//           this.cargando = false;
//         }
//       });
//     } else {
//       this.error = 'Por favor, complete todos los campos requeridos del curso.';
//     }
//   }

//   // GESTIÓN DE ACTIVIDADES
//   abrirFormularioActividad(): void {
//     this.actividadForm = {
//       nombre: '',
//       estatus: 'Pendiente',
//       fechaInicio: '',
//       fechaTermino: '',
//       empleadosSeleccionados: []
//     };

//     // Asegurarse de que ya tenemos cargados los empleados
//     if (this.empleados.length === 0) {
//       this.cargando = true;
//       this.empleadoService.obtenerEmpleados().subscribe({
//         next: (empleados) => {
//           this.empleados = empleados;
//           this.cargando = false;
//           this.mostrarFormularioActividad = true;
//         },
//         error: (error) => {
//           console.error('Error al cargar empleados:', error);
//           this.error = 'Error al cargar la lista de empleados: ' + (error.message || 'Verificar con el administrador');
//           this.cargando = false;
//         }
//       });
//     } else {
//       this.mostrarFormularioActividad = true;
//     }
//   }

//   cerrarFormularioActividad(): void {
//     this.mostrarFormularioActividad = false;
//     this.actividadForm = {};
//     this.error = '';
//     this.mensaje = '';
//   }

//   guardarActividad(): void {
//     if (
//       this.actividadForm.nombre &&
//       this.actividadForm.estatus &&
//       this.actividadForm.fechaInicio &&
//       this.actividadForm.fechaTermino &&
//       this.actividadForm.empleadosSeleccionados &&
//       this.actividadForm.empleadosSeleccionados.length > 0
//     ) {
//       // Para cada empleado seleccionado, creamos una actividad
//       const promesasActividades = this.actividadForm.empleadosSeleccionados.map((claveEmpleado: string) => {
//         // Encontrar el empleado para obtener su nombre completo
//         const empleado = this.empleados.find(emp => emp.claveEmpleado === claveEmpleado);
//         const nombreEmpleado = empleado
//           ? `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno}`
//           : claveEmpleado;

//         const nuevaActividad = {
//           nombreEmpleado: nombreEmpleado,
//           nombreActividad: this.actividadForm.nombre,
//           estatus: this.actividadForm.estatus,
//           fechaInicioActividad: this.actividadForm.fechaInicio,
//           fechaTerminoActividad: this.actividadForm.fechaTermino
//         };

//         return this.actividadesService.crearActividad(nuevaActividad).toPromise();
//       });

//       this.cargando = true;

//       // Ejecutar todas las promesas
//       Promise.all(promesasActividades)
//         .then(responses => {
//           console.log('Actividades registradas:', responses);
//           this.mensaje = '¡Actividades registradas con éxito!';
//           setTimeout(() => {
//             this.cerrarFormularioActividad();
//           }, 1500);
//           this.cargando = false;
//         })
//         .catch(error => {
//           console.error('Error al registrar actividades:', error);
//           this.error = 'Error al registrar las actividades: ' + (error.message || 'Verificar con el administrador');
//           this.cargando = false;
//         });
//     } else {
//       this.error = 'Por favor, complete todos los campos y seleccione al menos un empleado.';
//     }
//   }

//   filtroEmpleadosActividad: string = '';

//   toggleEmpleadoSeleccionado(claveEmpleado: string): void {
//     if (!this.actividadForm.empleadosSeleccionados) {
//       this.actividadForm.empleadosSeleccionados = [];
//     }

//     const index = this.actividadForm.empleadosSeleccionados.indexOf(claveEmpleado);
//     if (index === -1) {
//       this.actividadForm.empleadosSeleccionados.push(claveEmpleado);
//     } else {
//       this.actividadForm.empleadosSeleccionados.splice(index, 1);
//     }
//   }

//   isEmpleadoSeleccionado(claveEmpleado: string): boolean {
//     return this.actividadForm.empleadosSeleccionados?.includes(claveEmpleado) || false;
//   }

//   // Métodos auxiliares para formularios
//   agregarTelefono(): void {
//     this.telefonos.push('');
//   }

//   eliminarTelefono(index: number): void {
//     if (this.telefonos.length > 1) {
//       this.telefonos.splice(index, 1);
//     }
//   }

//   agregarCorreo(): void {
//     this.correos.push('');
//   }

//   eliminarCorreo(index: number): void {
//     if (this.correos.length > 1) {
//       this.correos.splice(index, 1);
//     }
//   }

//   agregarReferencia(): void {
//     this.referencias.push({
//       nombre: '',
//       parentesco: '',
//       telefono: '',
//       correo: '',
//     });
//   }

//   eliminarReferencia(index: number): void {
//     if (this.referencias.length > 1) {
//       this.referencias.splice(index, 1);
//     }
//   }

//   agregarCurso(): void {
//     this.cursos.push('');
//   }

//   limpiarFormulario(): void {
//     this.nombre = '';
//     this.apellidoPaterno = '';
//     this.apellidoMaterno = '';
//     this.fechaNacimiento = '';
//     this.rfc = '';
//     this.claveEmpleado = '';
//     this.sexo = 'Masculino';
//     this.calle = '';
//     this.numeroInterior = '';
//     this.numeroExterior = '';
//     this.colonia = '';
//     this.codigoPostal = '';
//     this.ciudad = '';
//     this.departamento = '';
//     this.puesto = '';
//     this.cursos = [''];
//     this.telefonos = [''];
//     this.correos = [''];
//     this.referencias = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];
//     this.mensaje = '';
//     this.error = '';
//   }

//   // Función para generar la clave
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

//   // Generar RFC
//   generarRFC(): void {
//     if (
//       !this.nombre ||
//       !this.apellidoPaterno ||
//       !this.apellidoMaterno ||
//       !this.fechaNacimiento
//     ) {
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
// }





























// V3

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { EmpleadoService } from '../../services/empleado.service';
// import { RhNavegacionComponent } from '../../components/rh-navegacion/rh-navegacion.component';
// import { FiltrarEmpleadosPipe } from './filtrar-empleados.pipe';
// import { ActividadesService } from '../../services/actividades.service';
// import { CursosService } from '../../services/cursos.service';

// @Component({
//   selector: 'app-buscar-empleado',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule, RhNavegacionComponent, FiltrarEmpleadosPipe],
//   templateUrl: './buscar-empleado.component.html',
//   styleUrls: ['./buscar-empleado.component.css'],
// })
// export class BuscarEmpleadoComponent implements OnInit {
//   terminoBusqueda: string = '';
//   empleados: any[] = [];
//   empleadosFiltrados: any[] = [];
//   mensajeError: string = '';
//   cargando: boolean = false;
//   empleadoSeleccionado: any = null;
//   mostrarModal: boolean = false;
//   cursos: any[] = [];
//   cursoForm: any = {};
//   mostrarFormularioCurso: boolean = false;
//   mostrarFormularioActividad: boolean = false;
//   actividades: any[] = [];
//   actividadForm: any = {};
//   mostrarModalEdicion: boolean = false;
//   empleadoEdicion: any = {
//     nombreCompleto: {},
//     domicilio: {},
//     referencias: [],
//   };
//   mensaje: string = '';
//   error: string = '';

//   // Datos básicos para el formulario de edición
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

//   // Datos laborales
//   departamento: string = '';
//   puesto: string = '';

//   // Contacto y referencias
//   telefonos: string[] = [''];
//   correos: string[] = [''];
//   referencias: {
//     nombre: string;
//     parentesco: string;
//     telefono: string;
//     correo: string;
//   }[] = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];

//   consecutivoActual: number = 1;

//   constructor(
//     private empleadoService: EmpleadoService,
//     private router: Router,
//     private cursosService: CursosService,
//     private actividadesService: ActividadesService,
//   ) {}

//   ngOnInit(): void {
//     this.cargarTodosLosEmpleados();
//     this.cargarActividades();
//   }

//   // Cargar todos los empleados del backend
//   cargarTodosLosEmpleados(): void {
//     this.cargando = true;
//     this.empleadoService.obtenerEmpleados().subscribe({
//       next: (data) => {
//         console.log('Empleados cargados:', data);
//         this.empleados = data;
//         this.empleadosFiltrados = [...this.empleados];
//         this.cargando = false;
//       },
//       error: (error) => {
//         console.error('Error al cargar empleados:', error);
//         this.mensajeError =
//           'Error al cargar la lista de empleados. Intente nuevamente.';
//         this.cargando = false;
//       },
//     });
//   }

//   // Búsqueda de empleados
//   buscarEmpleados(): void {
//     if (!this.terminoBusqueda || this.terminoBusqueda.trim() === '') {
//       this.empleadosFiltrados = [...this.empleados];
//       this.mensajeError = '';
//       return;
//     }

//     // Si el término tiene al menos 3 caracteres, podemos usar el endpoint de búsqueda
//     if (this.terminoBusqueda.trim().length >= 3) {
//       this.cargando = true;
//       this.empleadoService.buscarEmpleados(this.terminoBusqueda).subscribe({
//         next: (data) => {
//           this.empleadosFiltrados = data;
//           this.cargando = false;
//           this.mensajeError = '';
//         },
//         error: (error) => {
//           console.error('Error en búsqueda:', error);
//           // Si hay error en la búsqueda, hacemos filtrado local
//           this.filtrarEmpleadosLocal();
//           this.cargando = false;
//         }
//       });
//     } else {
//       // Para términos cortos, hacemos filtrado local
//       this.filtrarEmpleadosLocal();
//     }
//   }

//   // Filtrado local de empleados
//   filtrarEmpleadosLocal(): void {
//     const termino = this.terminoBusqueda.toLowerCase().trim();
//     this.empleadosFiltrados = this.empleados.filter(
//       (emp) =>
//         emp.claveEmpleado?.toLowerCase().includes(termino) ||
//         emp.nombreCompleto?.nombre?.toLowerCase().includes(termino) ||
//         emp.nombreCompleto?.apellidoPaterno?.toLowerCase().includes(termino) ||
//         emp.nombreCompleto?.apellidoMaterno?.toLowerCase().includes(termino) ||
//         emp.RFC?.toLowerCase().includes(termino) ||
//         emp.departamento?.toLowerCase().includes(termino)
//     );

//     if (this.empleadosFiltrados.length === 0) {
//       this.mensajeError = 'No se encontraron empleados con ese criterio de búsqueda';
//     } else {
//       this.mensajeError = '';
//     }
//   }

//   // Ver detalles de un empleado
//   verDetalles(claveEmpleado: string): void {
//     this.cargando = true;
//     this.empleadoService.obtenerEmpleado(claveEmpleado).subscribe({
//       next: (data) => {
//         this.empleadoSeleccionado = data;
//         this.mostrarModal = true;
//         this.cargando = false;
//       },
//       error: (error) => {
//         console.error('Error al obtener detalles del empleado:', error);
//         this.mensajeError = 'Error al cargar los detalles del empleado';
//         this.cargando = false;
//       },
//     });
//   }

//   cerrarModal(): void {
//     this.mostrarModal = false;
//     this.empleadoSeleccionado = null;
//   }

//   // Editar empleado
//   editarEmpleado(claveEmpleado: string): void {
//     this.cargando = true;
//     this.empleadoService.obtenerEmpleado(claveEmpleado).subscribe({
//       next: (empleado) => {
//         console.log('Datos del empleado para edición:', empleado);

//         // Mapear los datos del empleado al formulario de edición
//         this.nombre = empleado.nombreCompleto.nombre;
//         this.apellidoPaterno = empleado.nombreCompleto.apellidoPaterno;
//         this.apellidoMaterno = empleado.nombreCompleto.apellidoMaterno;
//         this.fechaNacimiento = new Date(empleado.fechaNacimiento).toISOString().split('T')[0];
//         this.rfc = empleado.RFC;
//         this.claveEmpleado = empleado.claveEmpleado;
//         this.sexo = empleado.sexo;
//         this.departamento = empleado.departamento;
//         this.puesto = empleado.puesto;

//         // Mapear datos de domicilio
//         if (empleado.domicilio) {
//           this.calle = empleado.domicilio.calle || '';
//           this.numeroInterior = empleado.domicilio.numeroInterior || '';
//           this.numeroExterior = empleado.domicilio.numeroExterior || '';
//           this.colonia = empleado.domicilio.colonia || '';
//           this.codigoPostal = empleado.domicilio.codigoPostal || '';
//           this.ciudad = empleado.domicilio.ciudad || '';
//         }

//         // Mapear teléfonos
//         this.telefonos = empleado.telefono && empleado.telefono.length > 0
//           ? [...empleado.telefono]
//           : [''];

//         // Mapear correos
//         this.correos = empleado.correoElectronico && empleado.correoElectronico.length > 0
//           ? [...empleado.correoElectronico]
//           : [''];

//         // Mapear referencias
//         if (empleado.referencias && empleado.referencias.length > 0) {
//           this.referencias = empleado.referencias.map((ref: any) => ({
//             nombre: ref.nombreFamiliar,
//             parentesco: ref.parentesco,
//             telefono: ref.telefonoFamiliar,
//             correo: ref.correoElectronicoFamiliar || ''
//           }));
//         } else {
//           this.referencias = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];
//         }

//         // Mapear cursos si existen
//         this.cursos = empleado.cursosEmpleado && empleado.cursosEmpleado.length > 0
//           ? [...empleado.cursosEmpleado]
//           : [''];

//         this.cargando = false;
//         this.mostrarModalEdicion = true;
//       },
//       error: (error) => {
//         console.error('Error al obtener datos del empleado:', error);
//         this.mensajeError = 'Error al cargar los datos del empleado para edición';
//         this.cargando = false;
//       }
//     });
//   }

//   // Guardar cambios del empleado
//   guardarCambiosEmpleado(): void {
//     if (this.validarFormulario()) {
//       // Crear la estructura correcta para enviar al backend
//       const empleadoActualizado = {
//         nombreCompleto: {
//           nombre: this.nombre,
//           apellidoPaterno: this.apellidoPaterno,
//           apellidoMaterno: this.apellidoMaterno
//         },
//         fechaNacimiento: this.fechaNacimiento,
//         RFC: this.rfc,
//         sexo: this.sexo,
//         departamento: this.departamento,
//         puesto: this.puesto,
//         domicilio: {
//           calle: this.calle,
//           numeroInterior: this.numeroInterior,
//           numeroExterior: this.numeroExterior,
//           colonia: this.colonia,
//           codigoPostal: this.codigoPostal,
//           ciudad: this.ciudad
//         },
//         telefonos: this.telefonos.filter(t => t.trim() !== ''),
//         correos: this.correos.filter(c => c.trim() !== ''),
//         referencias: this.referencias
//           .filter(r => r.nombre.trim() !== '')
//           .map(ref => ({
//             nombreFamiliar: ref.nombre,
//             parentesco: ref.parentesco,
//             telefonoFamiliar: ref.telefono,
//             correoElectronicoFamiliar: ref.correo || ''
//           })),
//         cursosEmpleado: this.cursos.filter(c => c.trim() !== '')
//       };

//       this.cargando = true;
//       console.log('Enviando datos actualizados:', empleadoActualizado);

//       this.empleadoService.actualizarEmpleado(this.claveEmpleado, empleadoActualizado).subscribe({
//         next: (response) => {
//           console.log('Respuesta actualización:', response);
//           this.mensaje = '¡Empleado actualizado con éxito!';
//           setTimeout(() => {
//             this.mostrarModalEdicion = false;
//             this.mensaje = '';
//             // Actualizar la lista de empleados
//             this.cargarTodosLosEmpleados();
//           }, 1500);
//           this.cargando = false;
//         },
//         error: (error) => {
//           this.error = 'Error al actualizar el empleado: ' + (error.message || 'Verificar con el administrador');
//           console.error('Error al actualizar:', error);
//           this.cargando = false;
//         }
//       });
//     } else {
//       this.error = 'Por favor, completa todos los campos obligatorios.';
//     }
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
//       this.telefonos.some((tel) => tel.trim() !== '')
//     );
//   }

//   cerrarModalEdicion(): void {
//     this.mostrarModalEdicion = false;
//     this.error = '';
//     this.mensaje = '';
//   }

//   // Eliminar empleado
//   eliminarEmpleado(claveEmpleado: string): void {
//     if (confirm('¿Está seguro que desea eliminar este empleado?')) {
//       this.cargando = true;
//       this.empleadoService.eliminarEmpleado(claveEmpleado).subscribe({
//         next: (response) => {
//           console.log('Empleado eliminado:', response);
//           // Actualizar listas después de eliminar
//           this.empleados = this.empleados.filter(emp => emp.claveEmpleado !== claveEmpleado);
//           this.empleadosFiltrados = this.empleadosFiltrados.filter(emp => emp.claveEmpleado !== claveEmpleado);
//           this.cargando = false;
//         },
//         error: (error) => {
//           console.error('Error al eliminar empleado:', error);
//           this.mensajeError = 'Error al eliminar el empleado: ' + (error.message || 'Verificar con el administrador');
//           this.cargando = false;
//         },
//       });
//     }
//   }

//   // GESTIÓN DE CURSOS
//   abrirFormularioCurso(empleado: any): void {
//     this.empleadoSeleccionado = empleado;
//     this.cursoForm = {
//       nombreEmpleado: `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno}`,
//       claveEmpleado: empleado.claveEmpleado,
//       nombre: '',
//       fechaInicio: '',
//       fechaTermino: '',
//       tipoDocumento: 'Constancia'
//     };
//     this.mostrarFormularioCurso = true;
//   }

//   cerrarFormularioCurso(): void {
//     this.mostrarFormularioCurso = false;
//     this.cursoForm = {};
//     this.error = '';
//     this.mensaje = '';
//   }

//   guardarCurso(): void {
//     if (
//       this.cursoForm.nombre &&
//       this.cursoForm.fechaInicio &&
//       this.cursoForm.fechaTermino &&
//       this.cursoForm.tipoDocumento
//     ) {
//       const nuevoCurso = {
//         nombreEmpleado: this.cursoForm.nombreEmpleado,
//         nombreCurso: this.cursoForm.nombre,
//         fechaInicio: this.cursoForm.fechaInicio,
//         fechaTermino: this.cursoForm.fechaTermino,
//         documentoEntregado: {
//           tipoDocumento: this.cursoForm.tipoDocumento,
//           rutaArchivo: 'pendiente.pdf'
//         }
//       };

//       this.cargando = true;
//       console.log('Enviando nuevo curso:', nuevoCurso);

//       // Primero registrar el curso
//       this.cursosService.crearCurso(nuevoCurso).subscribe({
//         next: (responseCurso) => {
//           console.log('Curso registrado:', responseCurso);

//           // Ahora obtenemos el empleado completo antes de actualizarlo
//           this.empleadoService.obtenerEmpleado(this.empleadoSeleccionado.claveEmpleado).subscribe({
//             next: (empleado) => {
//               console.log('Empleado recuperado para actualizar:', empleado);

//               // Asegurarnos de que exista la propiedad cursosEmpleado
//               if (!empleado.cursosEmpleado) {
//                 empleado.cursosEmpleado = [];
//               }

//               // Añadir el nuevo curso
//               empleado.cursosEmpleado.push(this.cursoForm.nombre);

//               // Actualizar el empleado con el nuevo curso
//               this.empleadoService.actualizarEmpleado(
//                 empleado.claveEmpleado,
//                 empleado
//               ).subscribe({
//                 next: (responseEmpleado) => {
//                   console.log('Empleado actualizado con nuevo curso:', responseEmpleado);
//                   this.mensaje = '¡Curso registrado con éxito!';
//                   setTimeout(() => {
//                     this.cerrarFormularioCurso();
//                     this.cargarTodosLosEmpleados();
//                   }, 1500);
//                   this.cargando = false;
//                 },
//                 error: (error) => {
//                   console.error('Error al actualizar empleado con nuevo curso:', error);
//                   this.error = 'Error al asociar el curso al empleado: ' + (error.message || 'Verificar con el administrador');
//                   this.cargando = false;
//                 }
//               });
//             },
//             error: (error) => {
//               console.error('Error al obtener datos del empleado:', error);
//               this.error = 'Error al obtener datos actualizados del empleado: ' + (error.message || 'Verificar con el administrador');
//               this.cargando = false;
//             }
//           });
//         },
//         error: (error) => {
//           console.error('Error al registrar curso:', error);
//           this.error = 'Error al registrar el curso: ' + (error.message || 'Verificar con el administrador');
//           this.cargando = false;
//         }
//       });
//     } else {
//       this.error = 'Por favor, complete todos los campos requeridos del curso.';
//     }
//   }

//   // GESTIÓN DE ACTIVIDADES
//   abrirFormularioActividad(): void {
//     this.actividadForm = {
//       nombre: '',
//       estatus: 'Pendiente',
//       fechaInicio: '',
//       fechaTermino: '',
//       empleadosSeleccionados: []
//     };

//     // Asegurarse de que ya tenemos cargados los empleados
//     if (this.empleados.length === 0) {
//       this.cargando = true;
//       this.empleadoService.obtenerEmpleados().subscribe({
//         next: (empleados) => {
//           this.empleados = empleados;
//           this.cargando = false;
//           this.mostrarFormularioActividad = true;
//         },
//         error: (error) => {
//           console.error('Error al cargar empleados:', error);
//           this.error = 'Error al cargar la lista de empleados: ' + (error.message || 'Verificar con el administrador');
//           this.cargando = false;
//         }
//       });
//     } else {
//       this.mostrarFormularioActividad = true;
//     }
//   }

//   cerrarFormularioActividad(): void {
//     this.mostrarFormularioActividad = false;
//     this.actividadForm = {};
//     this.error = '';
//     this.mensaje = '';
//   }

//   guardarActividad(): void {
//     if (
//       this.actividadForm.nombre &&
//       this.actividadForm.estatus &&
//       this.actividadForm.fechaInicio &&
//       this.actividadForm.fechaTermino &&
//       this.actividadForm.empleadosSeleccionados &&
//       this.actividadForm.empleadosSeleccionados.length > 0
//     ) {
//       this.cargando = true;

//       // Crear una estructura que cumpla con el modelo de datos del backend
//       const nuevaActividad = {
//         nombreActividad: this.actividadForm.nombre,
//         estatus: this.actividadForm.estatus,
//         fechaInicioActividad: this.actividadForm.fechaInicio,
//         fechaTerminoActividad: this.actividadForm.fechaTermino,
//         empleadosAsociados: this.actividadForm.empleadosSeleccionados
//       };

//       console.log('Creando actividad:', nuevaActividad);

//       // Registrar la actividad
//       this.actividadesService.crearActividad(nuevaActividad).subscribe({
//         next: (response) => {
//           console.log('Actividad registrada:', response);
//           this.mensaje = '¡Actividad registrada con éxito!';

//           // Actualizar la lista de actividades (opcional)
//           this.cargarActividades();

//           setTimeout(() => {
//             this.cerrarFormularioActividad();
//           }, 1500);
//           this.cargando = false;
//         },
//         error: (error) => {
//           console.error('Error al registrar actividad:', error);
//           this.error = 'Error al registrar la actividad: ' + (error.message || 'Verificar con el administrador');
//           this.cargando = false;
//         }
//       });
//     } else {
//       this.error = 'Por favor, complete todos los campos y seleccione al menos un empleado.';
//     }
//   }

//   // Método para cargar actividades existentes
//   cargarActividades(): void {
//     this.actividadesService.obtenerActividades().subscribe({
//       next: (data) => {
//         console.log('Actividades cargadas:', data);
//         this.actividades = data;
//       },
//       error: (error) => {
//         console.error('Error al cargar actividades:', error);
//       }
//     });
//   }

//   filtroEmpleadosActividad: string = '';

//   toggleEmpleadoSeleccionado(claveEmpleado: string): void {
//     if (!this.actividadForm.empleadosSeleccionados) {
//       this.actividadForm.empleadosSeleccionados = [];
//     }

//     const index = this.actividadForm.empleadosSeleccionados.indexOf(claveEmpleado);
//     if (index === -1) {
//       this.actividadForm.empleadosSeleccionados.push(claveEmpleado);
//     } else {
//       this.actividadForm.empleadosSeleccionados.splice(index, 1);
//     }
//   }

//   isEmpleadoSeleccionado(claveEmpleado: string): boolean {
//     return this.actividadForm.empleadosSeleccionados?.includes(claveEmpleado) || false;
//   }

//   // Métodos auxiliares para formularios
//   agregarTelefono(): void {
//     this.telefonos.push('');
//   }

//   eliminarTelefono(index: number): void {
//     if (this.telefonos.length > 1) {
//       this.telefonos.splice(index, 1);
//     }
//   }

//   agregarCorreo(): void {
//     this.correos.push('');
//   }

//   eliminarCorreo(index: number): void {
//     if (this.correos.length > 1) {
//       this.correos.splice(index, 1);
//     }
//   }

//   agregarReferencia(): void {
//     this.referencias.push({
//       nombre: '',
//       parentesco: '',
//       telefono: '',
//       correo: '',
//     });
//   }

//   eliminarReferencia(index: number): void {
//     if (this.referencias.length > 1) {
//       this.referencias.splice(index, 1);
//     }
//   }

//   agregarCurso(): void {
//     this.cursos.push('');
//   }

//   limpiarFormulario(): void {
//     this.nombre = '';
//     this.apellidoPaterno = '';
//     this.apellidoMaterno = '';
//     this.fechaNacimiento = '';
//     this.rfc = '';
//     this.claveEmpleado = '';
//     this.sexo = 'Masculino';
//     this.calle = '';
//     this.numeroInterior = '';
//     this.numeroExterior = '';
//     this.colonia = '';
//     this.codigoPostal = '';
//     this.ciudad = '';
//     this.departamento = '';
//     this.puesto = '';
//     this.cursos = [''];
//     this.telefonos = [''];
//     this.correos = [''];
//     this.referencias = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];
//     this.mensaje = '';
//     this.error = '';
//   }

//   // Función para generar la clave
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

//   // Generar RFC
//   generarRFC(): void {
//     if (
//       !this.nombre ||
//       !this.apellidoPaterno ||
//       !this.apellidoMaterno ||
//       !this.fechaNacimiento
//     ) {
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
// }






















// V4

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { EmpleadoService } from '../../services/empleado.service';
// import { RhNavegacionComponent } from '../../components/rh-navegacion/rh-navegacion.component';
// import { FiltrarEmpleadosPipe } from './filtrar-empleados.pipe';
// import { ActividadesService } from '../../services/actividades.service';
// import { CursosService } from '../../services/cursos.service';

// @Component({
//   selector: 'app-buscar-empleado',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule, RhNavegacionComponent, FiltrarEmpleadosPipe],
//   templateUrl: './buscar-empleado.component.html',
//   styleUrls: ['./buscar-empleado.component.css'],
// })
// export class BuscarEmpleadoComponent implements OnInit {
//   terminoBusqueda: string = '';
//   empleados: any[] = [];
//   empleadosFiltrados: any[] = [];
//   mensajeError: string = '';
//   cargando: boolean = false;
//   empleadoSeleccionado: any = null;
//   mostrarModal: boolean = false;
//   cursos: any[] = [];
//   cursoForm: any = {};
//   mostrarFormularioCurso: boolean = false;
//   mostrarFormularioActividad: boolean = false;
//   actividades: any[] = [];
//   actividadForm: any = {};
//   mostrarModalEdicion: boolean = false;
//   empleadoEdicion: any = {
//     nombreCompleto: {},
//     domicilio: {},
//     referencias: [],
//   };
//   mensaje: string = '';
//   error: string = '';

//   // Datos básicos para el formulario de edición
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

//   // Datos laborales
//   departamento: string = '';
//   puesto: string = '';

//   // Contacto y referencias
//   telefonos: string[] = [''];
//   correos: string[] = [''];
//   referencias: {
//     nombre: string;
//     parentesco: string;
//     telefono: string;
//     correo: string;
//   }[] = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];

//   consecutivoActual: number = 1;

//   constructor(
//     private empleadoService: EmpleadoService,
//     private router: Router,
//     private cursosService: CursosService,
//     private actividadesService: ActividadesService,
//   ) {}

//   ngOnInit(): void {
//     this.cargarTodosLosEmpleados();
//     this.cargarActividades();
//   }

//   // Cargar todos los empleados del backend
//   cargarTodosLosEmpleados(): void {
//     this.cargando = true;
//     this.empleadoService.obtenerEmpleados().subscribe({
//       next: (data) => {
//         console.log('Empleados cargados:', data);
//         this.empleados = data;
//         this.empleadosFiltrados = [...this.empleados];
//         this.cargando = false;
//       },
//       error: (error) => {
//         console.error('Error al cargar empleados:', error);
//         this.mensajeError =
//           'Error al cargar la lista de empleados. Intente nuevamente.';
//         this.cargando = false;
//       },
//     });
//   }

//   // Búsqueda de empleados
//   buscarEmpleados(): void {
//     if (!this.terminoBusqueda || this.terminoBusqueda.trim() === '') {
//       this.empleadosFiltrados = [...this.empleados];
//       this.mensajeError = '';
//       return;
//     }

//     // Si el término tiene al menos 3 caracteres, podemos usar el endpoint de búsqueda
//     if (this.terminoBusqueda.trim().length >= 3) {
//       this.cargando = true;
//       this.empleadoService.buscarEmpleados(this.terminoBusqueda).subscribe({
//         next: (data) => {
//           this.empleadosFiltrados = data;
//           this.cargando = false;
//           this.mensajeError = '';
//         },
//         error: (error) => {
//           console.error('Error en búsqueda:', error);
//           // Si hay error en la búsqueda, hacemos filtrado local
//           this.filtrarEmpleadosLocal();
//           this.cargando = false;
//         }
//       });
//     } else {
//       // Para términos cortos, hacemos filtrado local
//       this.filtrarEmpleadosLocal();
//     }
//   }

//   // Filtrado local de empleados
//   filtrarEmpleadosLocal(): void {
//     const termino = this.terminoBusqueda.toLowerCase().trim();
//     this.empleadosFiltrados = this.empleados.filter(
//       (emp) =>
//         emp.claveEmpleado?.toLowerCase().includes(termino) ||
//         emp.nombreCompleto?.nombre?.toLowerCase().includes(termino) ||
//         emp.nombreCompleto?.apellidoPaterno?.toLowerCase().includes(termino) ||
//         emp.nombreCompleto?.apellidoMaterno?.toLowerCase().includes(termino) ||
//         emp.RFC?.toLowerCase().includes(termino) ||
//         emp.departamento?.toLowerCase().includes(termino)
//     );

//     if (this.empleadosFiltrados.length === 0) {
//       this.mensajeError = 'No se encontraron empleados con ese criterio de búsqueda';
//     } else {
//       this.mensajeError = '';
//     }
//   }

//   // Ver detalles de un empleado
//   verDetalles(claveEmpleado: string): void {
//     this.cargando = true;
//     this.empleadoService.obtenerEmpleado(claveEmpleado).subscribe({
//       next: (data) => {
//         this.empleadoSeleccionado = data;
//         this.mostrarModal = true;
//         this.cargando = false;
//       },
//       error: (error) => {
//         console.error('Error al obtener detalles del empleado:', error);
//         this.mensajeError = 'Error al cargar los detalles del empleado';
//         this.cargando = false;
//       },
//     });
//   }

//   cerrarModal(): void {
//     this.mostrarModal = false;
//     this.empleadoSeleccionado = null;
//   }

//   // Editar empleado
//   editarEmpleado(claveEmpleado: string): void {
//     this.cargando = true;
//     this.empleadoService.obtenerEmpleado(claveEmpleado).subscribe({
//       next: (empleado) => {
//         console.log('Datos del empleado para edición:', empleado);

//         // Mapear los datos del empleado al formulario de edición
//         this.nombre = empleado.nombreCompleto.nombre;
//         this.apellidoPaterno = empleado.nombreCompleto.apellidoPaterno;
//         this.apellidoMaterno = empleado.nombreCompleto.apellidoMaterno;
//         this.fechaNacimiento = new Date(empleado.fechaNacimiento).toISOString().split('T')[0];
//         this.rfc = empleado.RFC;
//         this.claveEmpleado = empleado.claveEmpleado;
//         this.sexo = empleado.sexo;
//         this.departamento = empleado.departamento;
//         this.puesto = empleado.puesto;

//         // Mapear datos de domicilio
//         if (empleado.domicilio) {
//           this.calle = empleado.domicilio.calle || '';
//           this.numeroInterior = empleado.domicilio.numeroInterior || '';
//           this.numeroExterior = empleado.domicilio.numeroExterior || '';
//           this.colonia = empleado.domicilio.colonia || '';
//           this.codigoPostal = empleado.domicilio.codigoPostal || '';
//           this.ciudad = empleado.domicilio.ciudad || '';
//         }

//         // Mapear teléfonos
//         this.telefonos = empleado.telefono && empleado.telefono.length > 0
//           ? [...empleado.telefono]
//           : [''];

//         // Mapear correos
//         this.correos = empleado.correoElectronico && empleado.correoElectronico.length > 0
//           ? [...empleado.correoElectronico]
//           : [''];

//         // Mapear referencias
//         if (empleado.referencias && empleado.referencias.length > 0) {
//           this.referencias = empleado.referencias.map((ref: any) => ({
//             nombre: ref.nombreFamiliar,
//             parentesco: ref.parentesco,
//             telefono: ref.telefonoFamiliar,
//             correo: ref.correoElectronicoFamiliar || ''
//           }));
//         } else {
//           this.referencias = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];
//         }

//         // Mapear cursos si existen
//         this.cursos = empleado.cursosEmpleado && empleado.cursosEmpleado.length > 0
//           ? [...empleado.cursosEmpleado]
//           : [''];

//         this.cargando = false;
//         this.mostrarModalEdicion = true;
//       },
//       error: (error) => {
//         console.error('Error al obtener datos del empleado:', error);
//         this.mensajeError = 'Error al cargar los datos del empleado para edición';
//         this.cargando = false;
//       }
//     });
//   }

//   // Guardar cambios del empleado
//   guardarCambiosEmpleado(): void {
//     if (this.validarFormulario()) {
//       // Crear la estructura correcta para enviar al backend
//       const empleadoActualizado = {
//         nombreCompleto: {
//           nombre: this.nombre,
//           apellidoPaterno: this.apellidoPaterno,
//           apellidoMaterno: this.apellidoMaterno
//         },
//         fechaNacimiento: this.fechaNacimiento,
//         RFC: this.rfc,
//         sexo: this.sexo,
//         departamento: this.departamento,
//         puesto: this.puesto,
//         domicilio: {
//           calle: this.calle,
//           numeroInterior: this.numeroInterior,
//           numeroExterior: this.numeroExterior,
//           colonia: this.colonia,
//           codigoPostal: this.codigoPostal,
//           ciudad: this.ciudad
//         },
//         telefonos: this.telefonos.filter(t => t.trim() !== ''),
//         correos: this.correos.filter(c => c.trim() !== ''),
//         referencias: this.referencias
//           .filter(r => r.nombre.trim() !== '')
//           .map(ref => ({
//             nombreFamiliar: ref.nombre,
//             parentesco: ref.parentesco,
//             telefonoFamiliar: ref.telefono,
//             correoElectronicoFamiliar: ref.correo || ''
//           })),
//         cursosEmpleado: this.cursos.filter(c => c.trim() !== '')
//       };

//       this.cargando = true;
//       console.log('Enviando datos actualizados:', empleadoActualizado);

//       this.empleadoService.actualizarEmpleado(this.claveEmpleado, empleadoActualizado).subscribe({
//         next: (response) => {
//           console.log('Respuesta actualización:', response);
//           this.mensaje = '¡Empleado actualizado con éxito!';
//           setTimeout(() => {
//             this.mostrarModalEdicion = false;
//             this.mensaje = '';
//             // Actualizar la lista de empleados
//             this.cargarTodosLosEmpleados();
//           }, 1500);
//           this.cargando = false;
//         },
//         error: (error) => {
//           this.error = 'Error al actualizar el empleado: ' + (error.message || 'Verificar con el administrador');
//           console.error('Error al actualizar:', error);
//           this.cargando = false;
//         }
//       });
//     } else {
//       this.error = 'Por favor, completa todos los campos obligatorios.';
//     }
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
//       this.telefonos.some((tel) => tel.trim() !== '')
//     );
//   }

//   cerrarModalEdicion(): void {
//     this.mostrarModalEdicion = false;
//     this.error = '';
//     this.mensaje = '';
//   }

//   // Eliminar empleado
//   eliminarEmpleado(claveEmpleado: string): void {
//     if (confirm('¿Está seguro que desea eliminar este empleado?')) {
//       this.cargando = true;
//       this.empleadoService.eliminarEmpleado(claveEmpleado).subscribe({
//         next: (response) => {
//           console.log('Empleado eliminado:', response);
//           // Actualizar listas después de eliminar
//           this.empleados = this.empleados.filter(emp => emp.claveEmpleado !== claveEmpleado);
//           this.empleadosFiltrados = this.empleadosFiltrados.filter(emp => emp.claveEmpleado !== claveEmpleado);
//           this.cargando = false;
//         },
//         error: (error) => {
//           console.error('Error al eliminar empleado:', error);
//           this.mensajeError = 'Error al eliminar el empleado: ' + (error.message || 'Verificar con el administrador');
//           this.cargando = false;
//         },
//       });
//     }
//   }

//   // GESTIÓN DE CURSOS
//   abrirFormularioCurso(empleado: any): void {
//     this.empleadoSeleccionado = empleado;
//     this.cursoForm = {
//       nombreEmpleado: `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno}`,
//       claveEmpleado: empleado.claveEmpleado,
//       nombre: '',
//       fechaInicio: '',
//       fechaTermino: '',
//       tipoDocumento: 'Constancia'
//     };
//     this.mostrarFormularioCurso = true;
//   }

//   cerrarFormularioCurso(): void {
//     this.mostrarFormularioCurso = false;
//     this.cursoForm = {};
//     this.error = '';
//     this.mensaje = '';
//   }

//   guardarCurso(): void {
//     if (
//       this.cursoForm.nombre &&
//       this.cursoForm.fechaInicio &&
//       this.cursoForm.fechaTermino &&
//       this.cursoForm.tipoDocumento
//     ) {
//       const nuevoCurso = {
//         nombreEmpleado: this.cursoForm.nombreEmpleado,
//         nombreCurso: this.cursoForm.nombre,
//         fechaInicio: this.cursoForm.fechaInicio,
//         fechaTermino: this.cursoForm.fechaTermino,
//         documentoEntregado: {
//           tipoDocumento: this.cursoForm.tipoDocumento,
//           rutaArchivo: 'pendiente.pdf'
//         }
//       };

//       this.cargando = true;
//       console.log('Enviando nuevo curso:', nuevoCurso);

//       // Primero registrar el curso
//       this.cursosService.crearCurso(nuevoCurso).subscribe({
//         next: (responseCurso) => {
//           console.log('Curso registrado:', responseCurso);

//           // Ahora obtenemos el empleado completo antes de actualizarlo
//           this.empleadoService.obtenerEmpleado(this.empleadoSeleccionado.claveEmpleado).subscribe({
//             next: (empleado) => {
//               console.log('Empleado recuperado para actualizar:', empleado);

//               // Asegurarnos de que exista la propiedad cursosEmpleado
//               if (!empleado.cursosEmpleado) {
//                 empleado.cursosEmpleado = [];
//               }

//               // Añadir el nuevo curso
//               empleado.cursosEmpleado.push(this.cursoForm.nombre);

//               // Actualizar el empleado con el nuevo curso
//               this.empleadoService.actualizarEmpleado(
//                 empleado.claveEmpleado,
//                 empleado
//               ).subscribe({
//                 next: (responseEmpleado) => {
//                   console.log('Empleado actualizado con nuevo curso:', responseEmpleado);
//                   this.mensaje = '¡Curso registrado con éxito!';
//                   setTimeout(() => {
//                     this.cerrarFormularioCurso();
//                     this.cargarTodosLosEmpleados();
//                   }, 1500);
//                   this.cargando = false;
//                 },
//                 error: (error) => {
//                   console.error('Error al actualizar empleado con nuevo curso:', error);
//                   this.error = 'Error al asociar el curso al empleado: ' + (error.message || 'Verificar con el administrador');
//                   this.cargando = false;
//                 }
//               });
//             },
//             error: (error) => {
//               console.error('Error al obtener datos del empleado:', error);
//               this.error = 'Error al obtener datos actualizados del empleado: ' + (error.message || 'Verificar con el administrador');
//               this.cargando = false;
//             }
//           });
//         },
//         error: (error) => {
//           console.error('Error al registrar curso:', error);
//           this.error = 'Error al registrar el curso: ' + (error.message || 'Verificar con el administrador');
//           this.cargando = false;
//         }
//       });
//     } else {
//       this.error = 'Por favor, complete todos los campos requeridos del curso.';
//     }
//   }

//   // GESTIÓN DE ACTIVIDADES
//   abrirFormularioActividad(): void {
//     this.actividadForm = {
//       nombre: '',
//       estatus: 'Pendiente',
//       fechaInicio: '',
//       fechaTermino: '',
//       empleadosSeleccionados: []
//     };

//     // Asegurarse de que ya tenemos cargados los empleados
//     if (this.empleados.length === 0) {
//       this.cargando = true;
//       this.empleadoService.obtenerEmpleados().subscribe({
//         next: (empleados) => {
//           this.empleados = empleados;
//           this.cargando = false;
//           this.mostrarFormularioActividad = true;
//         },
//         error: (error) => {
//           console.error('Error al cargar empleados:', error);
//           this.error = 'Error al cargar la lista de empleados: ' + (error.message || 'Verificar con el administrador');
//           this.cargando = false;
//         }
//       });
//     } else {
//       this.mostrarFormularioActividad = true;
//     }
//   }

//   cerrarFormularioActividad(): void {
//     this.mostrarFormularioActividad = false;
//     this.actividadForm = {};
//     this.error = '';
//     this.mensaje = '';
//   }

//   guardarActividad(): void {
//     if (
//       this.actividadForm.nombre &&
//       this.actividadForm.estatus &&
//       this.actividadForm.fechaInicio &&
//       this.actividadForm.fechaTermino &&
//       this.actividadForm.empleadosSeleccionados &&
//       this.actividadForm.empleadosSeleccionados.length > 0
//     ) {
//       this.cargando = true;

//       // Para cada empleado seleccionado, crear una actividad separada
//       const actividadesPromises = this.actividadForm.empleadosSeleccionados.map(claveEmpleado => {
//         // Encontrar el empleado para obtener su nombre completo
//         const empleado = this.empleados.find(emp => emp.claveEmpleado === claveEmpleado);
//         const nombreEmpleadoCompleto = empleado
//           ? `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno}`
//           : claveEmpleado;

//         // Crear estructura de actividad de acuerdo al modelo del backend
//         const nuevaActividad = {
//           nombreEmpleado: nombreEmpleadoCompleto,
//           nombreActividad: this.actividadForm.nombre,
//           estatus: this.actividadForm.estatus,
//           fechaInicioActividad: this.actividadForm.fechaInicio,
//           fechaTerminoActividad: this.actividadForm.fechaTermino
//         };

//         // Devolver la promesa de creación de actividad
//         return this.actividadesService.crearActividad(nuevaActividad).toPromise();
//       });

//       // Esperar a que todas las actividades se creen
//       Promise.all(actividadesPromises)
//         .then(responses => {
//           console.log('Actividades registradas:', responses);
//           this.mensaje = '¡Actividades registradas con éxito!';
//           setTimeout(() => {
//             this.cerrarFormularioActividad();
//             this.cargarActividades();
//           }, 1500);
//           this.cargando = false;
//         })
//         .catch(error => {
//           console.error('Error al registrar actividades:', error);
//           this.error = 'Error al registrar las actividades: ' + (error.message || 'Verificar con el administrador');
//           this.cargando = false;
//         });
//     } else {
//       this.error = 'Por favor, complete todos los campos y seleccione al menos un empleado.';
//     }
//   }

//   // Método para cargar actividades existentes
//   cargarActividades(): void {
//     this.actividadesService.obtenerActividades().subscribe({
//       next: (data) => {
//         console.log('Actividades cargadas:', data);
//         this.actividades = data;
//       },
//       error: (error) => {
//         console.error('Error al cargar actividades:', error);
//       }
//     });
//   }

//   filtroEmpleadosActividad: string = '';

//   toggleEmpleadoSeleccionado(claveEmpleado: string): void {
//     if (!this.actividadForm.empleadosSeleccionados) {
//       this.actividadForm.empleadosSeleccionados = [];
//     }

//     const index = this.actividadForm.empleadosSeleccionados.indexOf(claveEmpleado);
//     if (index === -1) {
//       this.actividadForm.empleadosSeleccionados.push(claveEmpleado);
//     } else {
//       this.actividadForm.empleadosSeleccionados.splice(index, 1);
//     }
//   }

//   isEmpleadoSeleccionado(claveEmpleado: string): boolean {
//     return this.actividadForm.empleadosSeleccionados?.includes(claveEmpleado) || false;
//   }

//   // Métodos auxiliares para formularios
//   agregarTelefono(): void {
//     this.telefonos.push('');
//   }

//   eliminarTelefono(index: number): void {
//     if (this.telefonos.length > 1) {
//       this.telefonos.splice(index, 1);
//     }
//   }

//   agregarCorreo(): void {
//     this.correos.push('');
//   }

//   eliminarCorreo(index: number): void {
//     if (this.correos.length > 1) {
//       this.correos.splice(index, 1);
//     }
//   }

//   agregarReferencia(): void {
//     this.referencias.push({
//       nombre: '',
//       parentesco: '',
//       telefono: '',
//       correo: '',
//     });
//   }

//   eliminarReferencia(index: number): void {
//     if (this.referencias.length > 1) {
//       this.referencias.splice(index, 1);
//     }
//   }

//   agregarCurso(): void {
//     this.cursos.push('');
//   }

//   limpiarFormulario(): void {
//     this.nombre = '';
//     this.apellidoPaterno = '';
//     this.apellidoMaterno = '';
//     this.fechaNacimiento = '';
//     this.rfc = '';
//     this.claveEmpleado = '';
//     this.sexo = 'Masculino';
//     this.calle = '';
//     this.numeroInterior = '';
//     this.numeroExterior = '';
//     this.colonia = '';
//     this.codigoPostal = '';
//     this.ciudad = '';
//     this.departamento = '';
//     this.puesto = '';
//     this.cursos = [''];
//     this.telefonos = [''];
//     this.correos = [''];
//     this.referencias = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];
//     this.mensaje = '';
//     this.error = '';
//   }

//   // Función para generar la clave
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

//   // Generar RFC
//   generarRFC(): void {
//     if (
//       !this.nombre ||
//       !this.apellidoPaterno ||
//       !this.apellidoMaterno ||
//       !this.fechaNacimiento
//     ) {
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
// }






































import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { RhNavegacionComponent } from '../../components/rh-navegacion/rh-navegacion.component';
import { FiltrarEmpleadosPipe } from './filtrar-empleados.pipe';
import { ActividadesService } from '../../services/actividades.service';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-buscar-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RhNavegacionComponent, FiltrarEmpleadosPipe],
  templateUrl: './buscar-empleado.component.html',
  styleUrls: ['./buscar-empleado.component.css'],
})
export class BuscarEmpleadoComponent implements OnInit {
  terminoBusqueda: string = '';
  empleados: any[] = [];
  empleadosFiltrados: any[] = [];
  mensajeError: string = '';
  cargando: boolean = false;
  empleadoSeleccionado: any = null;
  mostrarModal: boolean = false;
  cursos: any[] = [];
  cursoForm: any = {};
  mostrarFormularioCurso: boolean = false;
  mostrarFormularioActividad: boolean = false;
  actividades: any[] = [];
  actividadForm: any = {};
  mostrarModalEdicion: boolean = false;
  empleadoEdicion: any = {
    nombreCompleto: {},
    domicilio: {},
    referencias: [],
  };
  mensaje: string = '';
  error: string = '';

  // Datos básicos para el formulario de edición
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

  // Contacto y referencias
  telefonos: string[] = [''];
  correos: string[] = [''];
  referencias: {
    nombre: string;
    parentesco: string;
    telefono: string;
    correo: string;
  }[] = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];

  consecutivoActual: number = 1;

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    private cursosService: CursosService,
    private actividadesService: ActividadesService,
  ) {}

  ngOnInit(): void {
    this.cargarTodosLosEmpleados();
    this.cargarActividades();
  }

  // Cargar todos los empleados del backend
  cargarTodosLosEmpleados(): void {
    this.cargando = true;
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => {
        console.log('Empleados cargados:', data);
        this.empleados = data;
        this.empleadosFiltrados = [...this.empleados];
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar empleados:', error);
        this.mensajeError =
          'Error al cargar la lista de empleados. Intente nuevamente.';
        this.cargando = false;
      },
    });
  }

  // Búsqueda de empleados
  buscarEmpleados(): void {
    if (!this.terminoBusqueda || this.terminoBusqueda.trim() === '') {
      this.empleadosFiltrados = [...this.empleados];
      this.mensajeError = '';
      return;
    }

    // Si el término tiene al menos 3 caracteres, podemos usar el endpoint de búsqueda
    if (this.terminoBusqueda.trim().length >= 3) {
      this.cargando = true;
      this.empleadoService.buscarEmpleados(this.terminoBusqueda).subscribe({
        next: (data) => {
          this.empleadosFiltrados = data;
          this.cargando = false;
          this.mensajeError = '';
        },
        error: (error) => {
          console.error('Error en búsqueda:', error);
          // Si hay error en la búsqueda, hacemos filtrado local
          this.filtrarEmpleadosLocal();
          this.cargando = false;
        }
      });
    } else {
      // Para términos cortos, hacemos filtrado local
      this.filtrarEmpleadosLocal();
    }
  }

  // Filtrado local de empleados
  filtrarEmpleadosLocal(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    this.empleadosFiltrados = this.empleados.filter(
      (emp) =>
        emp.claveEmpleado?.toLowerCase().includes(termino) ||
        emp.nombreCompleto?.nombre?.toLowerCase().includes(termino) ||
        emp.nombreCompleto?.apellidoPaterno?.toLowerCase().includes(termino) ||
        emp.nombreCompleto?.apellidoMaterno?.toLowerCase().includes(termino) ||
        emp.RFC?.toLowerCase().includes(termino) ||
        emp.departamento?.toLowerCase().includes(termino)
    );

    if (this.empleadosFiltrados.length === 0) {
      this.mensajeError = 'No se encontraron empleados con ese criterio de búsqueda';
    } else {
      this.mensajeError = '';
    }
  }

  // Ver detalles de un empleado
  verDetalles(claveEmpleado: string): void {
    this.cargando = true;
    this.empleadoService.obtenerEmpleado(claveEmpleado).subscribe({
      next: (data) => {
        this.empleadoSeleccionado = data;
        this.mostrarModal = true;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al obtener detalles del empleado:', error);
        this.mensajeError = 'Error al cargar los detalles del empleado';
        this.cargando = false;
      },
    });
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.empleadoSeleccionado = null;
  }

  // Editar empleado
  editarEmpleado(claveEmpleado: string): void {
    this.cargando = true;
    this.empleadoService.obtenerEmpleado(claveEmpleado).subscribe({
      next: (empleado) => {
        console.log('Datos del empleado para edición:', empleado);

        // Mapear los datos del empleado al formulario de edición
        this.nombre = empleado.nombreCompleto.nombre;
        this.apellidoPaterno = empleado.nombreCompleto.apellidoPaterno;
        this.apellidoMaterno = empleado.nombreCompleto.apellidoMaterno;
        this.fechaNacimiento = new Date(empleado.fechaNacimiento).toISOString().split('T')[0];
        this.rfc = empleado.RFC;
        this.claveEmpleado = empleado.claveEmpleado;
        this.sexo = empleado.sexo;
        this.departamento = empleado.departamento;
        this.puesto = empleado.puesto;

        // Mapear datos de domicilio
        if (empleado.domicilio) {
          this.calle = empleado.domicilio.calle || '';
          this.numeroInterior = empleado.domicilio.numeroInterior || '';
          this.numeroExterior = empleado.domicilio.numeroExterior || '';
          this.colonia = empleado.domicilio.colonia || '';
          this.codigoPostal = empleado.domicilio.codigoPostal || '';
          this.ciudad = empleado.domicilio.ciudad || '';
        }

        // Mapear teléfonos
        this.telefonos = empleado.telefono && empleado.telefono.length > 0
          ? [...empleado.telefono]
          : [''];

        // Mapear correos
        this.correos = empleado.correoElectronico && empleado.correoElectronico.length > 0
          ? [...empleado.correoElectronico]
          : [''];

        // Mapear referencias
        if (empleado.referencias && empleado.referencias.length > 0) {
          this.referencias = empleado.referencias.map((ref: any) => ({
            nombre: ref.nombreFamiliar,
            parentesco: ref.parentesco,
            telefono: ref.telefonoFamiliar,
            correo: ref.correoElectronicoFamiliar || ''
          }));
        } else {
          this.referencias = [{ nombre: '', parentesco: '', telefono: '', correo: '' }];
        }

        // Mapear cursos si existen
        this.cursos = empleado.cursosEmpleado && empleado.cursosEmpleado.length > 0
          ? [...empleado.cursosEmpleado]
          : [''];

        this.cargando = false;
        this.mostrarModalEdicion = true;
      },
      error: (error) => {
        console.error('Error al obtener datos del empleado:', error);
        this.mensajeError = 'Error al cargar los datos del empleado para edición';
        this.cargando = false;
      }
    });
  }

  // Guardar cambios del empleado
  guardarCambiosEmpleado(): void {
    if (this.validarFormulario()) {
      // Crear la estructura correcta para enviar al backend
      const empleadoActualizado = {
        nombreCompleto: {
          nombre: this.nombre,
          apellidoPaterno: this.apellidoPaterno,
          apellidoMaterno: this.apellidoMaterno
        },
        fechaNacimiento: this.fechaNacimiento,
        RFC: this.rfc,
        sexo: this.sexo,
        departamento: this.departamento,
        puesto: this.puesto,
        domicilio: {
          calle: this.calle,
          numeroInterior: this.numeroInterior,
          numeroExterior: this.numeroExterior,
          colonia: this.colonia,
          codigoPostal: this.codigoPostal,
          ciudad: this.ciudad
        },
        telefonos: this.telefonos.filter(t => t.trim() !== ''),
        correos: this.correos.filter(c => c.trim() !== ''),
        referencias: this.referencias
          .filter(r => r.nombre.trim() !== '')
          .map(ref => ({
            nombreFamiliar: ref.nombre,
            parentesco: ref.parentesco,
            telefonoFamiliar: ref.telefono,
            correoElectronicoFamiliar: ref.correo || ''
          })),
        cursosEmpleado: this.cursos.filter(c => c.trim() !== '')
      };

      this.cargando = true;
      console.log('Enviando datos actualizados:', empleadoActualizado);

      this.empleadoService.actualizarEmpleado(this.claveEmpleado, empleadoActualizado).subscribe({
        next: (response) => {
          console.log('Respuesta actualización:', response);
          this.mensaje = '¡Empleado actualizado con éxito!';
          setTimeout(() => {
            this.mostrarModalEdicion = false;
            this.mensaje = '';
            // Actualizar la lista de empleados
            this.cargarTodosLosEmpleados();
          }, 1500);
          this.cargando = false;
        },
        error: (error) => {
          this.error = 'Error al actualizar el empleado: ' + (error.message || 'Verificar con el administrador');
          console.error('Error al actualizar:', error);
          this.cargando = false;
        }
      });
    } else {
      this.error = 'Por favor, completa todos los campos obligatorios.';
    }
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
      this.telefonos.some((tel) => tel.trim() !== '')
    );
  }

  cerrarModalEdicion(): void {
    this.mostrarModalEdicion = false;
    this.error = '';
    this.mensaje = '';
  }

  // Eliminar empleado
  eliminarEmpleado(claveEmpleado: string): void {
    if (confirm('¿Está seguro que desea eliminar este empleado?')) {
      this.cargando = true;
      this.empleadoService.eliminarEmpleado(claveEmpleado).subscribe({
        next: (response) => {
          console.log('Empleado eliminado:', response);
          // Actualizar listas después de eliminar
          this.empleados = this.empleados.filter(emp => emp.claveEmpleado !== claveEmpleado);
          this.empleadosFiltrados = this.empleadosFiltrados.filter(emp => emp.claveEmpleado !== claveEmpleado);
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al eliminar empleado:', error);
          this.mensajeError = 'Error al eliminar el empleado: ' + (error.message || 'Verificar con el administrador');
          this.cargando = false;
        },
      });
    }
  }

  // GESTIÓN DE CURSOS
  abrirFormularioCurso(empleado: any): void {
    this.empleadoSeleccionado = empleado;
    this.cursoForm = {
      nombreEmpleado: `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno}`,
      claveEmpleado: empleado.claveEmpleado,
      nombre: '',
      fechaInicio: '',
      fechaTermino: '',
      tipoDocumento: 'Constancia'
    };
    this.mostrarFormularioCurso = true;
  }

  cerrarFormularioCurso(): void {
    this.mostrarFormularioCurso = false;
    this.cursoForm = {};
    this.error = '';
    this.mensaje = '';
  }

  guardarCurso(): void {
    if (
      this.cursoForm.nombre &&
      this.cursoForm.fechaInicio &&
      this.cursoForm.fechaTermino &&
      this.cursoForm.tipoDocumento
    ) {
      const nuevoCurso = {
        nombreEmpleado: this.cursoForm.nombreEmpleado,
        nombreCurso: this.cursoForm.nombre,
        fechaInicio: this.cursoForm.fechaInicio,
        fechaTermino: this.cursoForm.fechaTermino,
        documentoEntregado: {
          tipoDocumento: this.cursoForm.tipoDocumento,
          rutaArchivo: 'pendiente.pdf'
        }
      };

      this.cargando = true;
      console.log('Enviando nuevo curso:', nuevoCurso);

      // Primero registrar el curso
      this.cursosService.crearCurso(nuevoCurso).subscribe({
        next: (responseCurso) => {
          console.log('Curso registrado:', responseCurso);

          // Ahora obtenemos el empleado completo antes de actualizarlo
          this.empleadoService.obtenerEmpleado(this.empleadoSeleccionado.claveEmpleado).subscribe({
            next: (empleado) => {
              console.log('Empleado recuperado para actualizar:', empleado);

              // Asegurarnos de que exista la propiedad cursosEmpleado
              if (!empleado.cursosEmpleado) {
                empleado.cursosEmpleado = [];
              }

              // Añadir el nuevo curso
              empleado.cursosEmpleado.push(this.cursoForm.nombre);

              // Actualizar el empleado con el nuevo curso
              this.empleadoService.actualizarEmpleado(
                empleado.claveEmpleado,
                empleado
              ).subscribe({
                next: (responseEmpleado) => {
                  console.log('Empleado actualizado con nuevo curso:', responseEmpleado);
                  this.mensaje = '¡Curso registrado con éxito!';
                  setTimeout(() => {
                    this.cerrarFormularioCurso();
                    this.cargarTodosLosEmpleados();
                  }, 1500);
                  this.cargando = false;
                },
                error: (error) => {
                  console.error('Error al actualizar empleado con nuevo curso:', error);
                  this.error = 'Error al asociar el curso al empleado: ' + (error.message || 'Verificar con el administrador');
                  this.cargando = false;
                }
              });
            },
            error: (error) => {
              console.error('Error al obtener datos del empleado:', error);
              this.error = 'Error al obtener datos actualizados del empleado: ' + (error.message || 'Verificar con el administrador');
              this.cargando = false;
            }
          });
        },
        error: (error) => {
          console.error('Error al registrar curso:', error);
          this.error = 'Error al registrar el curso: ' + (error.message || 'Verificar con el administrador');
          this.cargando = false;
        }
      });
    } else {
      this.error = 'Por favor, complete todos los campos requeridos del curso.';
    }
  }

  // GESTIÓN DE ACTIVIDADES
  abrirFormularioActividad(): void {
    this.actividadForm = {
      nombre: '',
      estatus: 'Pendiente',
      fechaInicio: '',
      fechaTermino: '',
      empleadosSeleccionados: []
    };

    // Asegurarse de que ya tenemos cargados los empleados
    if (this.empleados.length === 0) {
      this.cargando = true;
      this.empleadoService.obtenerEmpleados().subscribe({
        next: (empleados) => {
          this.empleados = empleados;
          this.cargando = false;
          this.mostrarFormularioActividad = true;
        },
        error: (error) => {
          console.error('Error al cargar empleados:', error);
          this.error = 'Error al cargar la lista de empleados: ' + (error.message || 'Verificar con el administrador');
          this.cargando = false;
        }
      });
    } else {
      this.mostrarFormularioActividad = true;
    }
  }

  cerrarFormularioActividad(): void {
    this.mostrarFormularioActividad = false;
    this.actividadForm = {};
    this.error = '';
    this.mensaje = '';
  }


  guardarActividad(): void {
    if (
      this.actividadForm.nombre &&
      this.actividadForm.estatus &&
      this.actividadForm.fechaInicio &&
      this.actividadForm.fechaTermino &&
      this.actividadForm.empleadosSeleccionados &&
      this.actividadForm.empleadosSeleccionados.length > 0
    ) {
      this.cargando = true;

      // Para cada empleado seleccionado, crear una actividad separada
      const actividadesPromises = this.actividadForm.empleadosSeleccionados.map((claveEmpleado: string) => {
        // Encontrar el empleado para obtener su nombre completo
        const empleado = this.empleados.find(emp => emp.claveEmpleado === claveEmpleado);
        const nombreEmpleadoCompleto = empleado
          ? `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno}`
          : claveEmpleado;

        // Crear estructura de actividad de acuerdo al modelo del backend
        const nuevaActividad = {
          nombreEmpleado: nombreEmpleadoCompleto,
          nombreActividad: this.actividadForm.nombre,
          estatus: this.actividadForm.estatus,
          fechaInicioActividad: this.actividadForm.fechaInicio,
          fechaTerminoActividad: this.actividadForm.fechaTermino
        };

        // Devolver la promesa de creación de actividad
        return this.actividadesService.crearActividad(nuevaActividad).toPromise();
      });

      // Esperar a que todas las actividades se creen
      Promise.all(actividadesPromises)
        .then(responses => {
          console.log('Actividades registradas:', responses);
          this.mensaje = '¡Actividades registradas con éxito!';
          setTimeout(() => {
            this.cerrarFormularioActividad();
            this.cargarActividades();
          }, 1500);
          this.cargando = false;
        })
        .catch(error => {
          console.error('Error al registrar actividades:', error);
          this.error = 'Error al registrar las actividades: ' + (error.message || 'Verificar con el administrador');
          this.cargando = false;
        });
    } else {
      this.error = 'Por favor, complete todos los campos y seleccione al menos un empleado.';
    }
  }

  // Método para cargar actividades existentes
  cargarActividades(): void {
    this.actividadesService.obtenerActividades().subscribe({
      next: (data) => {
        console.log('Actividades cargadas:', data);
        this.actividades = data;
      },
      error: (error) => {
        console.error('Error al cargar actividades:', error);
      }
    });
  }

  filtroEmpleadosActividad: string = '';

  toggleEmpleadoSeleccionado(claveEmpleado: string): void {
    if (!this.actividadForm.empleadosSeleccionados) {
      this.actividadForm.empleadosSeleccionados = [];
    }

    const index = this.actividadForm.empleadosSeleccionados.indexOf(claveEmpleado);
    if (index === -1) {
      this.actividadForm.empleadosSeleccionados.push(claveEmpleado);
    } else {
      this.actividadForm.empleadosSeleccionados.splice(index, 1);
    }
  }

  isEmpleadoSeleccionado(claveEmpleado: string): boolean {
    return this.actividadForm.empleadosSeleccionados?.includes(claveEmpleado) || false;
  }

  // Métodos auxiliares para formularios
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
    this.referencias.push({
      nombre: '',
      parentesco: '',
      telefono: '',
      correo: '',
    });
  }

  eliminarReferencia(index: number): void {
    if (this.referencias.length > 1) {
      this.referencias.splice(index, 1);
    }
  }

  agregarCurso(): void {
    this.cursos.push('');
  }

  limpiarFormulario(): void {
    this.nombre = '';
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
    this.fechaNacimiento = '';
    this.rfc = '';
    this.claveEmpleado = '';
    this.sexo = 'Masculino';
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
    this.mensaje = '';
    this.error = '';
  }

  // Función para generar la clave
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

  // Generar RFC
  generarRFC(): void {
    if (
      !this.nombre ||
      !this.apellidoPaterno ||
      !this.apellidoMaterno ||
      !this.fechaNacimiento
    ) {
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
}
