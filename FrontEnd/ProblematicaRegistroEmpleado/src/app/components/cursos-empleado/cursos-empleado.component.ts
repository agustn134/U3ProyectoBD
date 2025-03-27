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







































import { Component, OnInit } from '@angular/core';
import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CursosService } from '../../services/cursos.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { DocumentViewerComponent } from '../document-viewer/document-viewer.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cursos-empleado',
  standalone: true,
  imports: [
    EmpleadoNavegacionComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './cursos-empleado.component.html',
  styleUrl: './cursos-empleado.component.css'
})
export class CursosEmpleadoComponent implements OnInit {
  mostrarFormularioCurso: boolean = false;
  cursos: any[] = [];
  cursoForm: any = {
    nombre: '',
    fechaInicio: '',
    fechaTermino: '',
    tipoDocumento: 'Constancia',
    rutaArchivo: ''
  };

  // Propiedades para la vista detallada
  cursoSeleccionado: any = null;

  // Propiedades para la carga de archivos
  uploading: boolean = false;
  errorMensaje: string = '';

  // Array de opciones para el tipo de documento
  tiposDocumento: string[] = ['Constancia', 'Título', 'Diploma'];

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.cargarCursos();
  }


  cargarCursos(): void {
    this.cursosService.obtenerCursos().subscribe({
      next: (data) => {
        console.log('Cursos obtenidos:', data);
        this.cursos = data.map((curso: any) => ({
          id: curso._id,
          nombre: curso.nombreCurso,
          inicio: new Date(curso.fechaInicio).toLocaleDateString(),
          termino: new Date(curso.fechaTermino).toLocaleDateString(),
          empleado: curso.nombreEmpleado,
          tipoDocumento: curso.documentoEntregado?.tipoDocumento,
          rutaArchivo: curso.documentoEntregado?.rutaArchivo
            ? curso.documentoEntregado.rutaArchivo  // Usa solo el nombre del archivo
            : ''
        }));
      },
      error: (error) => {
        console.error('Error al cargar los cursos:', error);
        this.errorMensaje = 'Error al cargar los cursos. Por favor, intenta nuevamente.';
      }
    });
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
  }

  cerrarFormularioCurso(): void {
    this.mostrarFormularioCurso = false;
  }





  guardarCurso(): void {
    if (this.cursoForm.nombre && this.cursoForm.fechaInicio && this.cursoForm.fechaTermino &&
      this.cursoForm.tipoDocumento && this.cursoForm.rutaArchivo) {

    // Extraer solo el nombre del archivo de la ruta completa
    const fileName = this.cursoForm.rutaArchivo.split('/').pop();

      const nuevoCurso = {
        nombreEmpleado: 'Nombre del Empleado Actual',
        nombreCurso: this.cursoForm.nombre,
        fechaInicio: this.cursoForm.fechaInicio,
        fechaTermino: this.cursoForm.fechaTermino,
        documentoEntregado: {
          tipoDocumento: this.cursoForm.tipoDocumento,
          rutaArchivo: fileName // Solo el nombre del archivo
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


}




































