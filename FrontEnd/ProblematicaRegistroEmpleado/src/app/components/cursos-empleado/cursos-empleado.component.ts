// import { Component } from '@angular/core';
// import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-cursos-empleado',
//   imports: [EmpleadoNavegacionComponent, FormsModule, CommonModule],
//   templateUrl: './cursos-empleado.component.html',
//   styleUrl: './cursos-empleado.component.css'
// })
// // export class CursosEmpleadoComponent {
// //   mostrarFormularioCurso: boolean = false; // Controla la visibilidad del formulario de curso
// //   cursos: any[] = []; // Lista de cursos
// //   cursoForm: any = {}; // Datos del formulario de curso

// //     // Función para abrir el formulario de curso
// //     abrirFormularioCurso(): void {
// //       this.mostrarFormularioCurso = true;
// //     }

// //     // Función para cerrar el formulario de curso
// //     cerrarFormularioCurso(): void {
// //       this.mostrarFormularioCurso = false;
// //       this.cursoForm = {};
// //     }

// //     // Función para guardar un nuevo curso
// //     guardarCurso(): void {
// //       if (this.cursoForm.nombre && this.cursoForm.fechaInicio && this.cursoForm.fechaTermino) {
// //         const nuevoCurso = {
// //           nombre: this.cursoForm.nombre,
// //           inicio: this.cursoForm.fechaInicio,
// //           termino: this.cursoForm.fechaTermino,
// //           empleadosInscritos: this.cursoForm.empleadosInscritos || []
// //         };
// //         this.cursos.push(nuevoCurso);
// //         this.cerrarFormularioCurso();
// //       }
// //     }

// //     // Función para agregar un curso con el boton
// //     agregarCurso(index: number): void {

// //       this.mostrarFormularioCurso = true;
// //     }

// // }





// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-cursos-empleado',
// //   templateUrl: './cursos-empleado.component.html',
// //   styleUrls: ['./cursos-empleado.component.css']
// // })
// export class CursosEmpleadoComponent {
//   mostrarFormularioCurso: boolean = false; // Controla la visibilidad del formulario de curso
//   cursos: any[] = []; // Lista de cursos
//   cursoForm: any = {}; // Datos del formulario de curso

//   // Función para abrir el formulario de curso
//   abrirFormularioCurso(): void {
//     this.mostrarFormularioCurso = true;
//   }

//   // Función para cerrar el formulario de curso
//   cerrarFormularioCurso(): void {
//     this.mostrarFormularioCurso = false;
//     this.cursoForm = {};
//   }

//   // Función para guardar un nuevo curso
//   guardarCurso(): void {
//     if (this.cursoForm.nombre && this.cursoForm.fechaInicio && this.cursoForm.fechaTermino) {
//       const nuevoCurso = {
//         nombre: this.cursoForm.nombre,
//         inicio: this.cursoForm.fechaInicio,
//         termino: this.cursoForm.fechaTermino,
//         empleadosInscritos: this.cursoForm.empleadosInscritos || []
//       };
//       this.cursos.push(nuevoCurso);
//       this.cerrarFormularioCurso();
//     }
//   }

//   // Función para editar un curso
//   editarCurso(index: number): void {
//     const curso = this.cursos[index];
//     this.cursoForm = { ...curso }; // Copia el curso seleccionado al formulario
//     this.abrirFormularioCurso(); // Abre el formulario
//   }

//   // Función para actualizar un curso existente
//   actualizarCurso(index: number): void {
//     if (this.cursoForm.nombre && this.cursoForm.fechaInicio && this.cursoForm.fechaTermino) {
//       this.cursos[index] = { ...this.cursoForm }; // Actualiza el curso en la lista
//       this.cerrarFormularioCurso(); // Cierra el formulario
//     }
//   }

//   // Función para eliminar un curso
//   eliminarCurso(index: number): void {
//     if (confirm('¿Estás seguro de eliminar este curso?')) {
//       this.cursos.splice(index, 1); // Elimina el curso de la lista
//     }
//   }
// }



























// import { Component, OnInit } from '@angular/core';
// import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { CursosService } from '../../services/cursos.service';

// @Component({
//   selector: 'app-cursos-empleado',
//   standalone: true,
//   imports: [EmpleadoNavegacionComponent, FormsModule, CommonModule],
//   templateUrl: './cursos-empleado.component.html',
//   styleUrl: './cursos-empleado.component.css'
// })
// export class CursosEmpleadoComponent implements OnInit {
//   mostrarFormularioCurso: boolean = false;
//   cursos: any[] = [];
//   cursoForm: any = {
//     nombre: '',
//     fechaInicio: '',
//     fechaTermino: ''
//   };

//   constructor(private cursosService: CursosService) {}

//   ngOnInit(): void {
//     this.cargarCursos();
//   }

//   cargarCursos(): void {
//     this.cursosService.obtenerCursos().subscribe({
//       next: (data) => {
//         // Transformar los datos recibidos al formato que espera la tabla
//         this.cursos = data.map((curso: any) => ({
//           nombre: curso.nombreCurso,
//           inicio: new Date(curso.fechaInicio).toLocaleDateString(),
//           termino: new Date(curso.fechaTermino).toLocaleDateString()
//         }));
//       },
//       error: (error) => {
//         console.error('Error al cargar los cursos:', error);
//       }
//     });
//   }

//   abrirFormularioCurso(): void {
//     this.mostrarFormularioCurso = true;
//   }

//   cerrarFormularioCurso(): void {
//     this.mostrarFormularioCurso = false;
//     this.cursoForm = {
//       nombre: '',
//       fechaInicio: '',
//       fechaTermino: ''
//     };
//   }

//   guardarCurso(): void {
//     if (this.cursoForm.nombre && this.cursoForm.fechaInicio && this.cursoForm.fechaTermino) {
//       // Crear el objeto con el formato que espera el backend
//       const nuevoCurso = {
//         nombreEmpleado: 'Nombre del Empleado', // Esto debe ser dinámico o según tu lógica de negocio
//         nombreCurso: this.cursoForm.nombre,
//         fechaInicio: this.cursoForm.fechaInicio,
//         fechaTermino: this.cursoForm.fechaTermino,
//         documentoEntregado: {
//           tipoDocumento: 'Constancia', // Valor por defecto o según tu lógica
//           rutaArchivo: 'ruta/por/defecto' // Valor por defecto o según tu lógica
//         }
//       };

//       this.cursosService.crearCurso(nuevoCurso).subscribe({
//         next: (response) => {
//           console.log('Curso guardado con éxito:', response);
//           this.cargarCursos(); // Recargar la lista después de guardar
//           this.cerrarFormularioCurso();
//         },
//         error: (error) => {
//           console.error('Error al guardar el curso:', error);
//         }
//       });
//     }
//   }
// }


























































// import { Component, OnInit } from '@angular/core';
// import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { CursosService } from '../../services/cursos.service';

// @Component({
//   selector: 'app-cursos-empleado',
//   standalone: true,
//   imports: [EmpleadoNavegacionComponent, FormsModule, CommonModule],
//   templateUrl: './cursos-empleado.component.html',
//   styleUrl: './cursos-empleado.component.css'
// })
// export class CursosEmpleadoComponent implements OnInit {
//   mostrarFormularioCurso: boolean = false;
//   cursos: any[] = [];
//   cursoForm: any = {
//     nombre: '',
//     fechaInicio: '',
//     fechaTermino: '',
//     tipoDocumento: 'Constancia', // Valor por defecto
//     rutaArchivo: '' // Este campo podría requerir un input file en el HTML
//   };

//   // Array de opciones para el tipo de documento
//   tiposDocumento: string[] = ['Constancia', 'Título', 'Diploma'];

//   constructor(private cursosService: CursosService) {}

//   ngOnInit(): void {
//     this.cargarCursos();
//   }

//   cargarCursos(): void {
//     this.cursosService.obtenerCursos().subscribe({
//       next: (data) => {
//         console.log('Cursos obtenidos:', data);
//         this.cursos = data.map((curso: any) => ({
//           id: curso._id, // Guardar el ID para operaciones futuras
//           nombre: curso.nombreCurso,
//           inicio: new Date(curso.fechaInicio).toLocaleDateString(),
//           termino: new Date(curso.fechaTermino).toLocaleDateString(),
//           tipoDocumento: curso.documentoEntregado?.tipoDocumento,
//           rutaArchivo: curso.documentoEntregado?.rutaArchivo
//         }));
//       },
//       error: (error) => {
//         console.error('Error al cargar los cursos:', error);
//       }
//     });
//   }

//   abrirFormularioCurso(): void {
//     this.mostrarFormularioCurso = true;
//     // Resetear el formulario
//     this.cursoForm = {
//       nombre: '',
//       fechaInicio: '',
//       fechaTermino: '',
//       tipoDocumento: 'Constancia',
//       rutaArchivo: ''
//     };
//   }

//   cerrarFormularioCurso(): void {
//     this.mostrarFormularioCurso = false;
//   }

//   guardarCurso(): void {
//     if (this.cursoForm.nombre && this.cursoForm.fechaInicio && this.cursoForm.fechaTermino &&
//         this.cursoForm.tipoDocumento && this.cursoForm.rutaArchivo) {

//       // Crear el objeto con el formato que espera el backend
//       const nuevoCurso = {
//         nombreEmpleado: 'Nombre del Empleado Actual', // Esto debería obtenerse dinámicamente
//         nombreCurso: this.cursoForm.nombre,
//         fechaInicio: this.cursoForm.fechaInicio,
//         fechaTermino: this.cursoForm.fechaTermino,
//         documentoEntregado: {
//           tipoDocumento: this.cursoForm.tipoDocumento,
//           rutaArchivo: this.cursoForm.rutaArchivo
//         }
//       };

//       console.log('Enviando curso:', nuevoCurso);

//       this.cursosService.crearCurso(nuevoCurso).subscribe({
//         next: (response) => {
//           console.log('Curso guardado con éxito:', response);
//           this.cargarCursos(); // Recargar la lista después de guardar
//           this.cerrarFormularioCurso();
//         },
//         error: (error) => {
//           console.error('Error al guardar el curso:', error);
//           alert('Error al guardar el curso. Por favor, intenta de nuevo.');
//         }
//       });
//     } else {
//       alert('Por favor, completa todos los campos requeridos.');
//     }
//   }
// }









































// import { Component, OnInit } from '@angular/core';
// import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { CursosService } from '../../services/cursos.service';
// import { FileUploadComponent } from '../file-upload/file-upload.component';


// @Component({
//   selector: 'app-cursos-empleado',
//   standalone: true,
//   imports: [EmpleadoNavegacionComponent, FormsModule, CommonModule, FileUploadComponent],
//   templateUrl: './cursos-empleado.component.html',
//   styleUrl: './cursos-empleado.component.css'
// })
// export class CursosEmpleadoComponent implements OnInit {
//   mostrarFormularioCurso: boolean = false;
//   cursos: any[] = [];
//   cursoForm: any = {
//     nombre: '',
//     fechaInicio: '',
//     fechaTermino: '',
//     tipoDocumento: 'Constancia',
//     rutaArchivo: '' // Este valor se actualizará con la URL del archivo subido
//   };

//   // Propiedades para la carga de archivos
//   uploading: boolean = false;
//   errorMensaje: string = '';

//   // Array de opciones para el tipo de documento
//   tiposDocumento: string[] = ['Constancia', 'Título', 'Diploma'];

//   constructor(private cursosService: CursosService) {}

//   ngOnInit(): void {
//     this.cargarCursos();
//   }

//   cargarCursos(): void {
//     this.cursosService.obtenerCursos().subscribe({
//       next: (data) => {
//         console.log('Cursos obtenidos:', data);
//         this.cursos = data.map((curso: any) => ({
//           id: curso._id, // Guardar el ID para operaciones futuras
//           nombre: curso.nombreCurso,
//           inicio: new Date(curso.fechaInicio).toLocaleDateString(),
//           termino: new Date(curso.fechaTermino).toLocaleDateString(),
//           tipoDocumento: curso.documentoEntregado?.tipoDocumento,
//           rutaArchivo: curso.documentoEntregado?.rutaArchivo
//         }));
//       },
//       error: (error) => {
//         console.error('Error al cargar los cursos:', error);
//         this.errorMensaje = 'Error al cargar los cursos. Por favor, intenta nuevamente.';
//       }
//     });
//   }

//   abrirFormularioCurso(): void {
//     this.mostrarFormularioCurso = true;
//     // Resetear el formulario
//     this.cursoForm = {
//       nombre: '',
//       fechaInicio: '',
//       fechaTermino: '',
//       tipoDocumento: 'Constancia',
//       rutaArchivo: ''
//     };
//     this.errorMensaje = '';
//   }

//   cerrarFormularioCurso(): void {
//     this.mostrarFormularioCurso = false;
//   }

//   // Método para manejar el evento de archivo subido
//   onFileUploaded(fileInfo: {url: string, filename: string}): void {
//     console.log('Archivo subido:', fileInfo);
//     this.cursoForm.rutaArchivo = fileInfo.url;
//   }

//   guardarCurso(): void {
//     if (this.cursoForm.nombre && this.cursoForm.fechaInicio && this.cursoForm.fechaTermino &&
//         this.cursoForm.tipoDocumento && this.cursoForm.rutaArchivo) {

//       // Crear el objeto con el formato que espera el backend
//       const nuevoCurso = {
//         nombreEmpleado: 'Nombre del Empleado Actual', // Esto debería obtenerse dinámicamente
//         nombreCurso: this.cursoForm.nombre,
//         fechaInicio: this.cursoForm.fechaInicio,
//         fechaTermino: this.cursoForm.fechaTermino,
//         documentoEntregado: {
//           tipoDocumento: this.cursoForm.tipoDocumento,
//           rutaArchivo: this.cursoForm.rutaArchivo
//         }
//       };

//       console.log('Enviando curso:', nuevoCurso);

//       this.cursosService.crearCurso(nuevoCurso).subscribe({
//         next: (response) => {
//           console.log('Curso guardado con éxito:', response);
//           this.cargarCursos(); // Recargar la lista después de guardar
//           this.cerrarFormularioCurso();
//         },
//         error: (error) => {
//           console.error('Error al guardar el curso:', error);
//           this.errorMensaje = 'Error al guardar el curso. Por favor, intenta de nuevo.';
//         }
//       });
//     } else {
//       this.errorMensaje = 'Por favor, completa todos los campos requeridos.';
//     }
//   }
// }













// import { Component, OnInit } from '@angular/core';
// import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { CursosService } from '../../services/cursos.service';
// import { FileUploadComponent } from '../file-upload/file-upload.component';
// import { DocumentViewerComponent } from '../document-viewer/document-viewer.component';


// @Component({
//   selector: 'app-cursos-empleado',
//   standalone: true,
//   imports: [
//     EmpleadoNavegacionComponent,
//     FormsModule,
//     CommonModule,
//     FileUploadComponent,
//     DocumentViewerComponent // Importar el componente de visualización de documentos
//   ],
//   templateUrl: './cursos-empleado.component.html',
//   styleUrl: './cursos-empleado.component.css'
// })
// export class CursosEmpleadoComponent implements OnInit {
//   mostrarFormularioCurso: boolean = false;
//   cursos: any[] = [];
//   cursoForm: any = {
//     nombre: '',
//     fechaInicio: '',
//     fechaTermino: '',
//     tipoDocumento: 'Constancia',
//     rutaArchivo: ''
//   };

//   // Propiedades para la vista detallada
//   cursoSeleccionado: any = null;

//   // Propiedades para la carga de archivos
//   uploading: boolean = false;
//   errorMensaje: string = '';

//   // Array de opciones para el tipo de documento
//   tiposDocumento: string[] = ['Constancia', 'Título', 'Diploma'];

//   constructor(private cursosService: CursosService) {}

//   ngOnInit(): void {
//     this.cargarCursos();
//   }

//   cargarCursos(): void {
//     this.cursosService.obtenerCursos().subscribe({
//       next: (data) => {
//         console.log('Cursos obtenidos:', data);
//         this.cursos = data.map((curso: any) => ({
//           id: curso._id,
//           nombre: curso.nombreCurso,
//           inicio: new Date(curso.fechaInicio).toLocaleDateString(),
//           termino: new Date(curso.fechaTermino).toLocaleDateString(),
//           empleado: curso.nombreEmpleado,
//           tipoDocumento: curso.documentoEntregado?.tipoDocumento,
//           rutaArchivo: curso.documentoEntregado?.rutaArchivo
//         }));
//       },
//       error: (error) => {
//         console.error('Error al cargar los cursos:', error);
//         this.errorMensaje = 'Error al cargar los cursos. Por favor, intenta nuevamente.';
//       }
//     });
//   }

//   abrirFormularioCurso(): void {
//     this.mostrarFormularioCurso = true;
//     // Resetear el formulario
//     this.cursoForm = {
//       nombre: '',
//       fechaInicio: '',
//       fechaTermino: '',
//       tipoDocumento: 'Constancia',
//       rutaArchivo: ''
//     };
//     this.errorMensaje = '';
//   }

//   cerrarFormularioCurso(): void {
//     this.mostrarFormularioCurso = false;
//   }

//   // Método para manejar el evento de archivo subido
//   onFileUploaded(fileInfo: {url: string, filename: string}): void {
//     console.log('Archivo subido:', fileInfo);
//     this.cursoForm.rutaArchivo = fileInfo.url;
//   }

//   guardarCurso(): void {
//     if (this.cursoForm.nombre && this.cursoForm.fechaInicio && this.cursoForm.fechaTermino &&
//         this.cursoForm.tipoDocumento && this.cursoForm.rutaArchivo) {

//       // Crear el objeto con el formato que espera el backend
//       const nuevoCurso = {
//         nombreEmpleado: 'Nombre del Empleado Actual', // Esto debería obtenerse dinámicamente
//         nombreCurso: this.cursoForm.nombre,
//         fechaInicio: this.cursoForm.fechaInicio,
//         fechaTermino: this.cursoForm.fechaTermino,
//         documentoEntregado: {
//           tipoDocumento: this.cursoForm.tipoDocumento,
//           rutaArchivo: this.cursoForm.rutaArchivo
//         }
//       };

//       console.log('Enviando curso:', nuevoCurso);

//       this.cursosService.crearCurso(nuevoCurso).subscribe({
//         next: (response) => {
//           console.log('Curso guardado con éxito:', response);
//           this.cargarCursos(); // Recargar la lista después de guardar
//           this.cerrarFormularioCurso();
//         },
//         error: (error) => {
//           console.error('Error al guardar el curso:', error);
//           this.errorMensaje = 'Error al guardar el curso. Por favor, intenta de nuevo.';
//         }
//       });
//     } else {
//       this.errorMensaje = 'Por favor, completa todos los campos requeridos.';
//     }
//   }

//   // Métodos para la vista detallada de un curso
//   abrirDetalleCurso(curso: any): void {
//     this.cursoSeleccionado = curso;
//   }

//   cerrarDetalleCurso(): void {
//     this.cursoSeleccionado = null;
//   }
// }







































// import { Component, OnInit } from '@angular/core';
// import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { CursosService } from '../../services/cursos.service';
// import { FileUploadComponent } from '../file-upload/file-upload.component';
// import { DocumentViewerComponent } from '../document-viewer/document-viewer.component';
// import { DomSanitizer } from '@angular/platform-browser';

// @Component({
//   selector: 'app-cursos-empleado',
//   standalone: true,
//   imports: [
//     EmpleadoNavegacionComponent,
//     FormsModule,
//     CommonModule,
//   ],
//   templateUrl: './cursos-empleado.component.html',
//   styleUrl: './cursos-empleado.component.css'
// })
// export class CursosEmpleadoComponent implements OnInit {
//   mostrarFormularioCurso: boolean = false;
//   cursos: any[] = [];
//   cursoForm: any = {
//     nombre: '',
//     fechaInicio: '',
//     fechaTermino: '',
//     tipoDocumento: 'Constancia',
//     rutaArchivo: ''
//   };

//   // Propiedades para la vista detallada
//   cursoSeleccionado: any = null;

//   // Propiedades para la carga de archivos
//   uploading: boolean = false;
//   errorMensaje: string = '';

//   // Array de opciones para el tipo de documento
//   tiposDocumento: string[] = ['Constancia', 'Título', 'Diploma'];

//   constructor(private cursosService: CursosService) {}

//   ngOnInit(): void {
//     this.cargarCursos();
//   }


//   cargarCursos(): void {
//     this.cursosService.obtenerCursos().subscribe({
//       next: (data) => {
//         console.log('Cursos obtenidos:', data);
//         this.cursos = data.map((curso: any) => ({
//           id: curso._id,
//           nombre: curso.nombreCurso,
//           inicio: new Date(curso.fechaInicio).toLocaleDateString(),
//           termino: new Date(curso.fechaTermino).toLocaleDateString(),
//           empleado: curso.nombreEmpleado,
//           tipoDocumento: curso.documentoEntregado?.tipoDocumento,
//           rutaArchivo: curso.documentoEntregado?.rutaArchivo
//             ? curso.documentoEntregado.rutaArchivo  // Usa solo el nombre del archivo
//             : ''
//         }));
//       },
//       error: (error) => {
//         console.error('Error al cargar los cursos:', error);
//         this.errorMensaje = 'Error al cargar los cursos. Por favor, intenta nuevamente.';
//       }
//     });
//   }


//   abrirFormularioCurso(): void {
//     this.mostrarFormularioCurso = true;
//     // Resetear el formulario
//     this.cursoForm = {
//       nombre: '',
//       fechaInicio: '',
//       fechaTermino: '',
//       tipoDocumento: 'Constancia',
//       rutaArchivo: ''
//     };
//     this.errorMensaje = '';
//   }

//   cerrarFormularioCurso(): void {
//     this.mostrarFormularioCurso = false;
//   }





//   guardarCurso(): void {
//     if (this.cursoForm.nombre && this.cursoForm.fechaInicio && this.cursoForm.fechaTermino &&
//       this.cursoForm.tipoDocumento && this.cursoForm.rutaArchivo) {

//     // Extraer solo el nombre del archivo de la ruta completa
//     const fileName = this.cursoForm.rutaArchivo.split('/').pop();

//       const nuevoCurso = {
//         nombreEmpleado: 'Nombre del Empleado Actual',
//         nombreCurso: this.cursoForm.nombre,
//         fechaInicio: this.cursoForm.fechaInicio,
//         fechaTermino: this.cursoForm.fechaTermino,
//         documentoEntregado: {
//           tipoDocumento: this.cursoForm.tipoDocumento,
//           rutaArchivo: fileName // Solo el nombre del archivo
//         }
//       };

//       console.log('Enviando curso:', nuevoCurso);

//       this.cursosService.crearCurso(nuevoCurso).subscribe({
//         next: (response) => {
//           console.log('Curso guardado con éxito:', response);
//           this.cargarCursos(); // Recargar la lista después de guardar
//           this.cerrarFormularioCurso();
//         },
//         error: (error) => {
//           console.error('Error al guardar el curso:', error);
//           this.errorMensaje = 'Error al guardar el curso. Por favor, intenta de nuevo.';
//         }
//       });
//     } else {
//       this.errorMensaje = 'Por favor, completa todos los campos requeridos.';
//     }
//   }


// }







import { Component, OnInit } from '@angular/core';
import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CursosService } from '../../services/cursos.service';
import { EmpleadoService } from '../../services/empleado.service';
import { HttpEventType } from '@angular/common/http';
import { FileUploadService } from '../../services/file-upload.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cursos-empleado',
  standalone: true,
  imports: [
    EmpleadoNavegacionComponent,
    FormsModule,
    CommonModule,
  ],
  providers: [DatePipe],
  templateUrl: './cursos-empleado.component.html',
  styleUrl: './cursos-empleado.component.css'
})
export class CursosEmpleadoComponent implements OnInit {
  mostrarFormularioCurso: boolean = false;
  cursos: any[] = [];
  cursosFiltrados: any[] = [];
  claveEmpleado: string = '';
  nombreEmpleado: string = '';

  cursoForm: any = {
    nombre: '',
    fechaInicio: '',
    fechaTermino: '',
    tipoDocumento: 'Constancia',
    rutaArchivo: ''
  };

  // Propiedades para la carga de archivos
  uploading: boolean = false;
  errorMensaje: string = '';
  archivoSeleccionado: File | null = null;
  progresoCarga: number = 0;

  // Filtros
  filtroNombreCurso: string = '';
  filtroTipoDocumento: string = '';
  filtroFechaDesde: string | null = null;
  filtroFechaHasta: string | null = null;

  // Array de opciones para el tipo de documento
  tiposDocumento: string[] = ['Constancia', 'Título', 'Diploma'];

  constructor(
    private cursosService: CursosService,
    private empleadoService: EmpleadoService,
    private fileUploadService: FileUploadService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // Clave de empleado para pruebas
    this.claveEmpleado = 'E12345';
    this.cargarDatosEmpleado();
  }

  cargarDatosEmpleado(): void {
    this.empleadoService.obtenerEmpleado(this.claveEmpleado).subscribe({
      next: (empleado) => {
        this.nombreEmpleado = `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno}`;
        this.cargarCursos();
      },
      error: (error) => {
        console.error('Error al cargar datos del empleado:', error);
        this.errorMensaje = 'No se pudieron cargar los datos del empleado';
        // Continuar cargando cursos de todas formas para pruebas
        this.cargarCursos();
      }
    });
  }

  cargarCursos(): void {
    this.cursosService.obtenerCursos().subscribe({
      next: (data) => {
        console.log('Cursos obtenidos:', data);

        // Filtrar solo los cursos del empleado actual (si hay nombre de empleado)
        const cursosFiltrados = this.nombreEmpleado ?
          data.filter((curso: any) => curso.nombreEmpleado &&
            curso.nombreEmpleado.toLowerCase().includes(this.nombreEmpleado.toLowerCase())) :
          data;

        this.cursos = cursosFiltrados.map((curso: any) => ({
          id: curso._id,
          nombre: curso.nombreCurso,
          inicio: new Date(curso.fechaInicio).toLocaleDateString(),
          fechaInicio: new Date(curso.fechaInicio), // Fecha sin formatear para filtros
          termino: new Date(curso.fechaTermino).toLocaleDateString(),
          fechaTermino: new Date(curso.fechaTermino), // Fecha sin formatear para filtros
          tipoDocumento: curso.documentoEntregado?.tipoDocumento || 'Sin documento',
          rutaArchivo: curso.documentoEntregado?.rutaArchivo || ''
        }));

        this.aplicarFiltros();
      },
      error: (error) => {
        console.error('Error al cargar los cursos:', error);
        this.errorMensaje = 'Error al cargar los cursos. Por favor, intenta nuevamente.';
      }
    });
  }

  aplicarFiltros(): void {
    this.cursosFiltrados = this.cursos.filter(curso => {
      // Filtro por nombre del curso
      const nombreCoincide = !this.filtroNombreCurso ||
        curso.nombre.toLowerCase().includes(this.filtroNombreCurso.toLowerCase());

      // Filtro por tipo de documento
      const tipoDocumentoCoincide = !this.filtroTipoDocumento ||
        curso.tipoDocumento === this.filtroTipoDocumento;

      // Filtro por fecha de inicio
      let fechaDesdeCoincide = true;
      if (this.filtroFechaDesde) {
        const fechaDesde = new Date(this.filtroFechaDesde);
        fechaDesdeCoincide = curso.fechaInicio >= fechaDesde;
      }

      // Filtro por fecha de término
      let fechaHastaCoincide = true;
      if (this.filtroFechaHasta) {
        const fechaHasta = new Date(this.filtroFechaHasta);
        fechaHastaCoincide = curso.fechaTermino <= fechaHasta;
      }

      return nombreCoincide && tipoDocumentoCoincide && fechaDesdeCoincide && fechaHastaCoincide;
    });

    console.log('Cursos filtrados:', this.cursosFiltrados);
  }

  limpiarFiltros(): void {
    this.filtroNombreCurso = '';
    this.filtroTipoDocumento = '';
    this.filtroFechaDesde = null;
    this.filtroFechaHasta = null;
    this.aplicarFiltros();
  }

  abrirFormularioCurso(): void {
    this.mostrarFormularioCurso = true;
    // Resetear el formulario
    this.cursoForm = {
      nombre: '',
      fechaInicio: '',
      fechaTermino: '',
      tipoDocumento: 'Constancia',
      rutaArchivo: ''
    };
    this.errorMensaje = '';
    this.archivoSeleccionado = null;
    this.progresoCarga = 0;
  }

  cerrarFormularioCurso(): void {
    this.mostrarFormularioCurso = false;
  }

  // Manejo de archivo
  onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  subirArchivo(): void {
    if (!this.archivoSeleccionado) {
      this.errorMensaje = 'Por favor seleccione un archivo primero';
      return;
    }

    this.uploading = true;
    this.progresoCarga = 0;

    this.fileUploadService.uploadFile(this.archivoSeleccionado, 'cursos').subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progresoCarga = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          const response = event.body;
          this.cursoForm.rutaArchivo = response.file.url;
          this.uploading = false;
        }
      },
      error => {
        console.error('Error al subir el archivo:', error);
        this.errorMensaje = 'Error al cargar el archivo. Intente nuevamente.';
        this.uploading = false;
      }
    );
  }

  guardarCurso(): void {
    if (this.cursoForm.nombre && this.cursoForm.fechaInicio && this.cursoForm.fechaTermino &&
      this.cursoForm.tipoDocumento && this.cursoForm.rutaArchivo) {

      const nuevoCurso = {
        nombreEmpleado: this.nombreEmpleado || 'Empleado Prueba',
        nombreCurso: this.cursoForm.nombre,
        fechaInicio: this.cursoForm.fechaInicio,
        fechaTermino: this.cursoForm.fechaTermino,
        documentoEntregado: {
          tipoDocumento: this.cursoForm.tipoDocumento,
          rutaArchivo: this.cursoForm.rutaArchivo
        }
      };

      console.log('Enviando curso:', nuevoCurso);

      this.cursosService.crearCurso(nuevoCurso).subscribe({
        next: (response) => {
          console.log('Curso guardado con éxito:', response);
          this.cargarCursos(); // Recargar la lista después de guardar
          this.cerrarFormularioCurso();
        },
        error: (error) => {
          console.error('Error al guardar el curso:', error);
          this.errorMensaje = 'Error al guardar el curso. Por favor, intenta de nuevo.';
        }
      });
    } else {
      this.errorMensaje = 'Por favor, completa todos los campos requeridos.';
    }
  }

  // Función para formatear fechas en el template
  formatDate(date: string | Date): string {
    if (!date) return '';
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }
}




























