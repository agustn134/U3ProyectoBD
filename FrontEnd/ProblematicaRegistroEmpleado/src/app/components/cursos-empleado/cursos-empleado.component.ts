import { Component } from '@angular/core';
import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursos-empleado',
  imports: [EmpleadoNavegacionComponent, FormsModule, CommonModule],
  templateUrl: './cursos-empleado.component.html',
  styleUrl: './cursos-empleado.component.css'
})
// export class CursosEmpleadoComponent {
//   mostrarFormularioCurso: boolean = false; // Controla la visibilidad del formulario de curso
//   cursos: any[] = []; // Lista de cursos
//   cursoForm: any = {}; // Datos del formulario de curso

//     // Función para abrir el formulario de curso
//     abrirFormularioCurso(): void {
//       this.mostrarFormularioCurso = true;
//     }

//     // Función para cerrar el formulario de curso
//     cerrarFormularioCurso(): void {
//       this.mostrarFormularioCurso = false;
//       this.cursoForm = {};
//     }

//     // Función para guardar un nuevo curso
//     guardarCurso(): void {
//       if (this.cursoForm.nombre && this.cursoForm.fechaInicio && this.cursoForm.fechaTermino) {
//         const nuevoCurso = {
//           nombre: this.cursoForm.nombre,
//           inicio: this.cursoForm.fechaInicio,
//           termino: this.cursoForm.fechaTermino,
//           empleadosInscritos: this.cursoForm.empleadosInscritos || []
//         };
//         this.cursos.push(nuevoCurso);
//         this.cerrarFormularioCurso();
//       }
//     }

//     // Función para agregar un curso con el boton
//     agregarCurso(index: number): void {

//       this.mostrarFormularioCurso = true;
//     }

// }





// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-cursos-empleado',
//   templateUrl: './cursos-empleado.component.html',
//   styleUrls: ['./cursos-empleado.component.css']
// })
export class CursosEmpleadoComponent {
  mostrarFormularioCurso: boolean = false; // Controla la visibilidad del formulario de curso
  cursos: any[] = []; // Lista de cursos
  cursoForm: any = {}; // Datos del formulario de curso

  // Función para abrir el formulario de curso
  abrirFormularioCurso(): void {
    this.mostrarFormularioCurso = true;
  }

  // Función para cerrar el formulario de curso
  cerrarFormularioCurso(): void {
    this.mostrarFormularioCurso = false;
    this.cursoForm = {};
  }

  // Función para guardar un nuevo curso
  guardarCurso(): void {
    if (this.cursoForm.nombre && this.cursoForm.fechaInicio && this.cursoForm.fechaTermino) {
      const nuevoCurso = {
        nombre: this.cursoForm.nombre,
        inicio: this.cursoForm.fechaInicio,
        termino: this.cursoForm.fechaTermino,
        empleadosInscritos: this.cursoForm.empleadosInscritos || []
      };
      this.cursos.push(nuevoCurso);
      this.cerrarFormularioCurso();
    }
  }

  // Función para editar un curso
  editarCurso(index: number): void {
    const curso = this.cursos[index];
    this.cursoForm = { ...curso }; // Copia el curso seleccionado al formulario
    this.abrirFormularioCurso(); // Abre el formulario
  }

  // Función para actualizar un curso existente
  actualizarCurso(index: number): void {
    if (this.cursoForm.nombre && this.cursoForm.fechaInicio && this.cursoForm.fechaTermino) {
      this.cursos[index] = { ...this.cursoForm }; // Actualiza el curso en la lista
      this.cerrarFormularioCurso(); // Cierra el formulario
    }
  }

  // Función para eliminar un curso
  eliminarCurso(index: number): void {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      this.cursos.splice(index, 1); // Elimina el curso de la lista
    }
  }
}
