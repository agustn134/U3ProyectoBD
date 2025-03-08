// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RhNavegacionComponent } from '../rh-navegacion/rh-navegacion.component';

// @Component({
//   selector: 'app-buscar-empleado',
//   standalone: true,
//   imports: [
//       CommonModule, // Necesario para *ngFor
//       FormsModule, // Necesario para ngModel
//       RhNavegacionComponent
//     ],
//   templateUrl: './buscar-empleado.component.html',
//   styleUrls: ['./buscar-empleado.component.css']
// })
// export class BuscarEmpleadoComponent {
//   // Datos de ejemplo (simulando una base de datos)
//   empleados = [
//     {
//       clave: "EMP-001",
//       nombre: "Juan Pérez",
//       departamento: "Recursos Humanos",
//       puesto: "Gerente de Recursos Humanos",
//       fechaAlta: "2023-01-15",
//       rfc: "SIGR-770910",
//       sexo: "Masculino",
//       foto: "url_de_la_foto",
//       domicilio: {
//         calle: "Av. Reforma",
//         numeroInterior: "123",
//         numeroExterior: "456",
//         colonia: "Centro",
//         codigoPostal: "12345",
//         ciudad: "Ciudad de México"
//       },
//       telefonos: ["555-1234", "555-5678"],
//       correos: ["juan.perez@empresa.com"],
//       referencias: [
//         {
//           nombre: "María López",
//           parentesco: "Esposa",
//           telefono: "555-9876",
//           correo: "maria.lopez@example.com"
//         }
//       ]
//     }
//     // Agrega más empleados aquí...
//   ];

//   searchTerm: string = ''; // Término de búsqueda
//   empleadosFiltrados: any[] = []; // Resultados filtrados
//   mostrarModal: boolean = false; // Controla la visibilidad del modal
//   empleadoSeleccionado: any = null; // Empleado seleccionado para ver detalles

//   // Constructor
//   constructor() {
//     this.empleadosFiltrados = [...this.empleados]; // Inicializar con todos los empleados
//   }

//   // Función para buscar empleados
//   buscarEmpleados(): void {
//     const term = this.searchTerm.toLowerCase();
//     this.empleadosFiltrados = this.empleados.filter(
//       (empleado) =>
//         empleado.clave.toLowerCase().includes(term) ||
//         empleado.rfc.toLowerCase().includes(term) ||
//         empleado.nombre.toLowerCase().includes(term)
//     );
//   }

//   // Función para ver detalles del empleado
//   verDetalles(clave: string): void {
//     this.empleadoSeleccionado = this.empleados.find((e) => e.clave === clave);
//     this.mostrarModal = true;
//   }

//   // Función para cerrar el modal
//   cerrarModal(): void {
//     this.mostrarModal = false;
//     this.empleadoSeleccionado = null;
//   }

//   // Función para eliminar empleado
//   eliminarEmpleado(clave: string): void {
//     if (confirm('¿Estás seguro de eliminar este empleado?')) {
//       const index = this.empleados.findIndex((e) => e.clave === clave);
//       if (index !== -1) {
//         this.empleados.splice(index, 1);
//         this.buscarEmpleados(); // Refrescar la tabla
//       }
//     }
//   }

//   // Función para editar empleado (simulación)
//   editarEmpleado(clave: string): void {
//     alert(`Editar empleado con clave: ${clave}`);
//   }


// }













































// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RhNavegacionComponent } from '../rh-navegacion/rh-navegacion.component';

// @Component({
//   selector: 'app-buscar-empleado',
//   standalone: true,
//   imports: [
//     CommonModule, // Necesario para *ngFor
//     FormsModule, // Necesario para ngModel
//     RhNavegacionComponent
//   ],
//   templateUrl: './buscar-empleado.component.html',
//   styleUrls: ['./buscar-empleado.component.css']
// })
// export class BuscarEmpleadoComponent {
//   // Datos de ejemplo (simulando una base de datos)
//   empleados = [
//     {
//       clave: "EMP-001",
//       nombre: "Juan Pérez",
//       departamento: "Recursos Humanos",
//       puesto: "Gerente de Recursos Humanos",
//       fechaAlta: "2023-01-15",
//       rfc: "SIGR-770910",
//       sexo: "Masculino",
//       foto: "url_de_la_foto",
//       domicilio: {
//         calle: "Av. Reforma",
//         numeroInterior: "123",
//         numeroExterior: "456",
//         colonia: "Centro",
//         codigoPostal: "12345",
//         ciudad: "Ciudad de México"
//       },
//       telefonos: ["555-1234", "555-5678"],
//       correos: ["juan.perez@empresa.com"],
//       referencias: [
//         {
//           nombre: "María López",
//           parentesco: "Esposa",
//           telefono: "555-9876",
//           correo: "maria.lopez@example.com"
//         }
//       ],
//       cursos: [] // Cursos del empleado
//     }
//     // Agrega más empleados aquí...
//   ];

//   searchTerm: string = ''; // Término de búsqueda
//   empleadosFiltrados: any[] = []; // Resultados filtrados
//   mostrarModal: boolean = false; // Controla la visibilidad del modal
//   empleadoSeleccionado: any = null; // Empleado seleccionado para ver detalles
//   mostrarFormularioCurso: boolean = false; // Controla la visibilidad del formulario de curso
//   cursos: any[] = []; // Lista de cursos
//   cursoForm: any = {}; // Datos del formulario de curso

//   // Constructor
//   constructor() {
//     this.empleadosFiltrados = [...this.empleados]; // Inicializar con todos los empleados
//   }

//   // Función para buscar empleados
//   buscarEmpleados(): void {
//     const term = this.searchTerm.toLowerCase();
//     this.empleadosFiltrados = this.empleados.filter(
//       (empleado) =>
//         empleado.clave.toLowerCase().includes(term) ||
//         empleado.rfc.toLowerCase().includes(term) ||
//         empleado.nombre.toLowerCase().includes(term)
//     );
//   }

//   // Función para ver detalles del empleado
//   verDetalles(clave: string): void {
//     this.empleadoSeleccionado = this.empleados.find((e) => e.clave === clave);
//     this.mostrarModal = true;
//   }

//   // Función para cerrar el modal
//   cerrarModal(): void {
//     this.mostrarModal = false;
//     this.empleadoSeleccionado = null;
//   }

//   // Función para eliminar empleado
//   eliminarEmpleado(clave: string): void {
//     if (confirm('¿Estás seguro de eliminar este empleado?')) {
//       const index = this.empleados.findIndex((e) => e.clave === clave);
//       if (index !== -1) {
//         this.empleados.splice(index, 1);
//         this.buscarEmpleados(); // Refrescar la tabla
//       }
//     }
//   }

//   // Función para editar empleado (simulación)
//   editarEmpleado(clave: string): void {
//     alert(`Editar empleado con clave: ${clave}`);
//   }

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

//   // Función para eliminar un curso
//   eliminarCurso(index: number): void {
//     if (confirm('¿Estás seguro de eliminar este curso?')) {
//       this.cursos.splice(index, 1);
//     }
//   }

//   // Función para editar un curso
//   editarCurso(index: number): void {
//     const curso = this.cursos[index];
//     this.cursoForm = { ...curso };
//     this.mostrarFormularioCurso = true;
//   }
// }
























import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RhNavegacionComponent } from '../rh-navegacion/rh-navegacion.component';

@Component({
  selector: 'app-buscar-empleado',
  standalone: true,
  imports: [
    CommonModule, // Necesario para *ngFor
    FormsModule, // Necesario para ngModel
    RhNavegacionComponent
  ],
  templateUrl: './buscar-empleado.component.html',
  styleUrls: ['./buscar-empleado.component.css']
})
export class BuscarEmpleadoComponent {

  // Propiedades para los términos de búsqueda
  searchRFC: string = ''; // Término de búsqueda por RFC
  searchApellido: string = ''; // Término de búsqueda por Apellido
  searchClave: string = ''; // Término de búsqueda por Clave


  // Datos de ejemplo (simulando una base de datos)
  empleados = [
    {
      clave: "EMP-001",
      nombre: "Juan Pérez",
      departamento: "Recursos Humanos",
      puesto: "Gerente de Recursos Humanos",
      fechaAlta: "2023-01-15",
      rfc: "SIGR-770910",
      sexo: "Masculino",
      foto: "url_de_la_foto",
      domicilio: {
        calle: "Av. Reforma",
        numeroInterior: "123",
        numeroExterior: "456",
        colonia: "Centro",
        codigoPostal: "12345",
        ciudad: "Ciudad de México"
      },
      telefonos: ["555-1234", "555-5678"],
      correos: ["juan.perez@empresa.com"],
      referencias: [
        {
          nombre: "María López",
          parentesco: "Esposa",
          telefono: "555-9876",
          correo: "maria.lopez@example.com"
        }
      ],
      cursos: [] // Cursos del empleado
    }
    // Agrega más empleados aquí...
  ];

  searchTerm: string = ''; // Término de búsqueda
  empleadosFiltrados: any[] = []; // Resultados filtrados
  mostrarModal: boolean = false; // Controla la visibilidad del modal
  empleadoSeleccionado: any = null; // Empleado seleccionado para ver detalles
  mostrarFormularioCurso: boolean = false; // Controla la visibilidad del formulario de curso
  cursos: any[] = []; // Lista de cursos
  cursoForm: any = {}; // Datos del formulario de curso

  // Propiedades para actividades
  mostrarFormularioActividad: boolean = false; // Controla la visibilidad del formulario de actividad
  actividades: any[] = []; // Lista de actividades
  actividadForm: any = {}; // Datos del formulario de actividad

  // Constructor
  constructor() {
    this.empleadosFiltrados = [...this.empleados]; // Inicializar con todos los empleados
  }

  // Función para buscar empleados
  buscarEmpleados(): void {
    const termRFC = this.searchRFC.toLowerCase();
    const termApellido = this.searchApellido.toLowerCase();
    const termClave = this.searchClave.toLowerCase();

    this.empleadosFiltrados = this.empleados.filter(
      (empleado) =>
        (termRFC === '' || empleado.rfc.toLowerCase().includes(termRFC)) &&
        (termApellido === '' || empleado.nombre.toLowerCase().includes(termApellido)) &&
        (termClave === '' || empleado.clave.toLowerCase().includes(termClave))
    );
  }

  // Función para limpiar los filtros
limpiarFiltros(): void {
  this.searchRFC = '';
  this.searchApellido = '';
  this.searchClave = '';
  this.buscarEmpleados(); // Refrescar la tabla
}

  // Función para ver detalles del empleado
  verDetalles(clave: string): void {
    this.empleadoSeleccionado = this.empleados.find((e) => e.clave === clave);
    this.mostrarModal = true;
  }

  // Función para cerrar el modal
  cerrarModal(): void {
    this.mostrarModal = false;
    this.empleadoSeleccionado = null;
  }

  // Función para eliminar empleado
  eliminarEmpleado(clave: string): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      const index = this.empleados.findIndex((e) => e.clave === clave);
      if (index !== -1) {
        this.empleados.splice(index, 1);
        this.buscarEmpleados(); // Refrescar la tabla
      }
    }
  }

  // Función para editar empleado (simulación)
  editarEmpleado(clave: string): void {
    alert(`Editar empleado con clave: ${clave}`);
  }

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

  // Función para eliminar un curso
  eliminarCurso(index: number): void {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      this.cursos.splice(index, 1);
    }
  }

  // Función para editar un curso
  editarCurso(index: number): void {
    const curso = this.cursos[index];
    this.cursoForm = { ...curso };
    this.mostrarFormularioCurso = true;
  }

  // Función para abrir el formulario de actividad
  abrirFormularioActividad(): void {
    this.mostrarFormularioActividad = true;
  }

  // Función para cerrar el formulario de actividad
  cerrarFormularioActividad(): void {
    this.mostrarFormularioActividad = false;
    this.actividadForm = {};
  }

  // Función para guardar una nueva actividad
  guardarActividad(): void {
    if (this.actividadForm.nombre && this.actividadForm.estatus && this.actividadForm.fechaInicio && this.actividadForm.fechaTermino) {
      const nuevaActividad = {
        nombre: this.actividadForm.nombre,
        estatus: this.actividadForm.estatus,
        inicio: this.actividadForm.fechaInicio,
        termino: this.actividadForm.fechaTermino,
      };
      this.actividades.push(nuevaActividad);
      this.cerrarFormularioActividad();
    }
  }

  // Función para eliminar una actividad
  eliminarActividad(index: number): void {
    if (confirm('¿Estás seguro de eliminar esta actividad?')) {
      this.actividades.splice(index, 1);
    }
  }

  // Función para editar una actividad
  editarActividad(index: number): void {
    const actividad = this.actividades[index];
    this.actividadForm = { ...actividad };
    this.mostrarFormularioActividad = true;
  }
}
