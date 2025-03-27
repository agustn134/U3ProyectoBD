// import { Component, OnInit } from '@angular/core';
// import { RhNavegacionComponent } from "../rh-navegacion/rh-navegacion.component";
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ActividadesService } from '../../services/actividades.service';
// import { EmpleadoService } from '../../services/empleado.service';

// interface Actividad {
//   _id?: string;
//   nombreEmpleado: string;
//   nombreActividad: string;
//   estatus: string;
//   fechaInicioActividad: Date;
//   fechaTerminoActividad: Date;
// }

// interface Empleado {
//   claveEmpleado: string;
//   nombreCompleto: {
//     nombre: string;
//     apellidoPaterno: string;
//     apellidoMaterno: string;
//   };
// }

// @Component({
//   selector: 'app-actividades-rh',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RhNavegacionComponent],
//   templateUrl: './actividades-rh.component.html',
//   styleUrl: './actividades-rh.component.css'
// })
// export class ActividadesRhComponent implements OnInit {
//   actividades: Actividad[] = [];
//   empleados: Empleado[] = [];

//   // Filtros
//   filtroNombreEmpleado: string = '';
//   filtroNombreActividad: string = '';
//   filtroEstatus: string = '';

//   constructor(
//     private actividadesService: ActividadesService,
//     private empleadoService: EmpleadoService
//   ) { }

//   ngOnInit(): void {
//     this.cargarActividades();
//     this.cargarEmpleados();
//   }

//   cargarActividades(): void {
//     this.actividadesService.obtenerActividades().subscribe({
//       next: (data: Actividad[]) => {
//         this.actividades = data;
//       },
//       error: (error) => {
//         console.error('Error al cargar actividades:', error);
//       }
//     });
//   }

//   cargarEmpleados(): void {
//     this.empleadoService.obtenerEmpleados().subscribe({
//       next: (data: Empleado[]) => {
//         this.empleados = data;
//       },
//       error: (error) => {
//         console.error('Error al cargar empleados:', error);
//       }
//     });
//   }

//   // Método para filtrar actividades
//   get actividadesFiltradas(): Actividad[] {
//     return this.actividades.filter(actividad =>
//       (this.filtroNombreEmpleado === '' ||
//        actividad.nombreEmpleado.toLowerCase().includes(this.filtroNombreEmpleado.toLowerCase())) &&
//       (this.filtroNombreActividad === '' ||
//        actividad.nombreActividad.toLowerCase().includes(this.filtroNombreActividad.toLowerCase())) &&
//       (this.filtroEstatus === '' || actividad.estatus === this.filtroEstatus)
//     );
//   }

//   // Método para obtener empleados que no han sido a actividades
//   obtenerEmpleadosSinActividades(): Empleado[] {
//     const empleadosConActividades = new Set(this.actividades.map(a => a.nombreEmpleado));
//     return this.empleados.filter(empleado =>
//       !empleadosConActividades.has(`${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno} ${empleado.nombreCompleto.apellidoMaterno}`)
//     );
//   }

//   // Método para limpiar filtros
//   limpiarFiltros(): void {
//     this.filtroNombreEmpleado = '';
//     this.filtroNombreActividad = '';
//     this.filtroEstatus = '';
//   }
// }



import { Component, OnInit } from '@angular/core';
import { RhNavegacionComponent } from "../rh-navegacion/rh-navegacion.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActividadesService } from '../../services/actividades.service';
import { EmpleadoService } from '../../services/empleado.service';

interface Actividad {
  _id?: string;
  nombreEmpleado: string;
  nombreActividad: string;
  estatus: string;
  fechaInicioActividad: Date;
  fechaTerminoActividad: Date;
}

interface Empleado {
  claveEmpleado: string;
  nombreCompleto: {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
  };
}

@Component({
  selector: 'app-actividades-rh',
  standalone: true,
  imports: [CommonModule, FormsModule, RhNavegacionComponent],
  templateUrl: './actividades-rh.component.html',
  styleUrl: './actividades-rh.component.css'
})
export class ActividadesRhComponent implements OnInit {
  actividades: Actividad[] = [];
  empleados: Empleado[] = [];

  // Filtros
  filtroNombreEmpleado: string = '';
  filtroNombreActividad: string = '';
  filtroEstatus: string = '';

  constructor(
    private actividadesService: ActividadesService,
    private empleadoService: EmpleadoService
  ) { }

  ngOnInit(): void {
    this.cargarActividades();
    this.cargarEmpleados();
  }

  // Add a method to map statuses
private mapearEstatus(estatus: string): string {
  const estatusMap: { [key: string]: string } = {
    'Completada': 'Completado',
    'Completado': 'Completado',
    'En Progreso': 'En Progreso',
    'Pendiente': 'Pendiente'
  };
  return estatusMap[estatus] || estatus;
}

  // Modify cargarActividades to map statuses
cargarActividades(): void {
  this.actividadesService.obtenerActividades().subscribe({
    next: (data: Actividad[]) => {
      // Normalizar los nombres de empleados y actividades, y mapear estatus
      this.actividades = data.map(actividad => ({
        ...actividad,
        estatus: this.mapearEstatus(actividad.estatus),
        nombreEmpleadoNormalizado: this.normalizarTexto(actividad.nombreEmpleado),
        nombreActividadNormalizado: this.normalizarTexto(actividad.nombreActividad)
      }));
    },
    error: (error) => {
      console.error('Error al cargar actividades:', error);
    }
  });
}

  cargarEmpleados(): void {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data: Empleado[]) => {
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar empleados:', error);
      }
    });
  }

  // Método para normalizar texto (quitar acentos, minúsculas)
  private normalizarTexto(texto: string): string {
    return texto.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // Método para filtrar actividades
  get actividadesFiltradas(): Actividad[] {
    return this.actividades.filter(actividad => {
      const nombreEmpleadoCoincide = !this.filtroNombreEmpleado ||
        this.normalizarTexto(actividad.nombreEmpleado)
          .includes(this.normalizarTexto(this.filtroNombreEmpleado));

      const nombreActividadCoincide = !this.filtroNombreActividad ||
        this.normalizarTexto(actividad.nombreActividad)
          .includes(this.normalizarTexto(this.filtroNombreActividad));

      const estatusCoincide = !this.filtroEstatus ||
        actividad.estatus === this.filtroEstatus;

      return nombreEmpleadoCoincide && nombreActividadCoincide && estatusCoincide;
    });
  }

  // Método para obtener empleados que no han sido a actividades
  obtenerEmpleadosSinActividades(): Empleado[] {
    const empleadosConActividades = new Set(this.actividades.map(a =>
      this.normalizarTexto(a.nombreEmpleado)
    ));

    return this.empleados.filter(empleado => {
      const nombreCompleto = this.normalizarTexto(
        `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno} ${empleado.nombreCompleto.apellidoMaterno}`
      );
      return !empleadosConActividades.has(nombreCompleto);
    });
  }

  // Método para limpiar filtros
  limpiarFiltros(): void {
    this.filtroNombreEmpleado = '';
    this.filtroNombreActividad = '';
    this.filtroEstatus = '';
  }
}
