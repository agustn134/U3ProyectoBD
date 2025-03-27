

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";
// import { ActividadesService } from '../../services/actividades.service';
// import { EmpleadoService } from '../../services/empleado.service';

// @Component({
//   selector: 'app-actividades-empleado',
//   templateUrl: './actividades-empleado.component.html',
//   styleUrls: ['./actividades-empleado.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule, EmpleadoNavegacionComponent]
// })
// export class ActividadesEmpleadoComponent implements OnInit {
//   actividades: any[] = [];
//   actividadesFiltradas: any[] = [];
//   cargando: boolean = false;
//   error: string = '';
//   claveEmpleado: string = 'ALP-001'; // Clave de ejemplo para pruebas
//   nombreEmpleado: string = '';

//   // Filtros
//   filtroNombreActividad: string = '';
//   filtroEstatus: string = '';
//   filtroFechaDesde: Date | null = null;
//   filtroFechaHasta: Date | null = null;

//   // Contadores de actividades
//   pendingCount: number = 0;
//   inProgressCount: number = 0;
//   completedCount: number = 0;

//   constructor(
//     private actividadesService: ActividadesService,
//     private empleadoService: EmpleadoService
//   ) { }

//   ngOnInit(): void {
//     this.cargarDatosEmpleado();
//   }

//   cargarDatosEmpleado(): void {
//     this.cargando = true;
//     this.empleadoService.obtenerEmpleado(this.claveEmpleado).subscribe({
//       next: (empleado) => {
//         this.nombreEmpleado = `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno}`;
//         this.cargarActividades();
//       },
//       error: (error) => {
//         console.error('Error al cargar datos del empleado:', error);
//         this.error = 'No se pudieron cargar los datos del empleado';
//         this.cargando = false;
//       }
//     });
//   }

//   cargarActividades(): void {
//     this.actividadesService.obtenerActividades().subscribe({
//       next: (data) => {
//         // Filtrar solo actividades del empleado actual (sin incluir lista de empleados sin actividades)
//         this.actividades = data
//           .filter((act: any) =>
//             act.nombreEmpleado &&
//             act.nombreEmpleado.toLowerCase().includes(this.nombreEmpleado.toLowerCase())
//           )
//           .map((act: any) => ({
//             descripcion: act.nombreActividad,
//             fechaInicio: new Date(act.fechaInicioActividad),
//             fechaTermino: new Date(act.fechaTerminoActividad),
//             estado: this.mapearEstatus(act.estatus),
//           }));

//         this.aplicarFiltros();
//         this.actualizarContadores();
//         this.cargando = false;
//       },
//       error: (error) => {
//         console.error('Error al cargar actividades:', error);
//         this.error = 'No se pudieron cargar las actividades';
//         this.cargando = false;
//       }
//     });
//   }

//   aplicarFiltros(): void {
//     this.actividadesFiltradas = this.actividades.filter(actividad => {
//       const nombreCoincide = !this.filtroNombreActividad ||
//         actividad.descripcion.toLowerCase().includes(this.filtroNombreActividad.toLowerCase());

//       const estatusCoincide = !this.filtroEstatus ||
//         actividad.estado === this.filtroEstatus;

//       const fechaDesdeCoincide = !this.filtroFechaDesde ||
//         actividad.fechaInicio >= this.filtroFechaDesde;

//       const fechaHastaCoincide = !this.filtroFechaHasta ||
//         actividad.fechaTermino <= this.filtroFechaHasta;

//       return nombreCoincide && estatusCoincide && fechaDesdeCoincide && fechaHastaCoincide;
//     });

//     // Actualizar contadores con actividades filtradas
//     this.pendingCount = this.actividadesFiltradas.filter(a => a.estado === 'Pendiente').length;
//     this.inProgressCount = this.actividadesFiltradas.filter(a => a.estado === 'En Proceso').length;
//     this.completedCount = this.actividadesFiltradas.filter(a => a.estado === 'Completada').length;
//   }

//   limpiarFiltros(): void {
//     this.filtroNombreActividad = '';
//     this.filtroEstatus = '';
//     this.filtroFechaDesde = null;
//     this.filtroFechaHasta = null;
//     this.aplicarFiltros();
//   }

//   mapearEstatus(estatus: string): 'Completada' | 'En Proceso' | 'Pendiente' {
//     const estatusMap: {[key: string]: 'Completada' | 'En Proceso' | 'Pendiente'} = {
//       'Finalizada': 'Completada',
//       'En Curso': 'En Proceso',
//       'Asignada': 'Pendiente',
//       'Cancelada': 'Pendiente'
//     };
//     return estatusMap[estatus] || 'Pendiente';
//   }



//   actualizarContadores(): void {
//     this.pendingCount = this.actividades.filter(a => a.estado === 'Pendiente').length;
//     this.inProgressCount = this.actividades.filter(a => a.estado === 'En Proceso').length;
//     this.completedCount = this.actividades.filter(a => a.estado === 'Completada').length;
//   }
// }




























// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";
// import { ActividadesService } from '../../services/actividades.service';
// import { EmpleadoService } from '../../services/empleado.service';

// @Component({
//   selector: 'app-actividades-empleado',
//   templateUrl: './actividades-empleado.component.html',
//   styleUrls: ['./actividades-empleado.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule, EmpleadoNavegacionComponent]
// })
// export class ActividadesEmpleadoComponent implements OnInit {
//   actividades: any[] = [];
//   actividadesFiltradas: any[] = [];
//   cargando: boolean = false;
//   error: string = '';
//   claveEmpleado: string = '';
//   nombreEmpleado: string = '';

//   // Filtros
//   filtroNombreActividad: string = '';
//   filtroEstatus: string = '';
//   filtroFechaDesde: Date | null = null;
//   filtroFechaHasta: Date | null = null;

//   constructor(
//     private actividadesService: ActividadesService,
//     private empleadoService: EmpleadoService
//   ) { }

//   ngOnInit(): void {
//     // Asigna una clave de empleado directamente para pruebas
//     this.claveEmpleado = 'E12345'; // o la clave que quieras probar
//     this.cargarDatosEmpleado();
//   }

//   cargarDatosEmpleado(): void {
//     this.cargando = true;
//     this.empleadoService.obtenerEmpleado(this.claveEmpleado).subscribe({
//       next: (empleado) => {
//         this.nombreEmpleado = `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno}`;
//         this.cargarActividades();
//       },
//       error: (error) => {
//         console.error('Error al cargar datos del empleado:', error);
//         this.error = 'No se pudieron cargar los datos del empleado';
//         this.cargando = false;
//       }
//     });
//   }

//   cargarActividades(): void {
//     this.actividadesService.obtenerActividades().subscribe({
//       next: (data) => {
//         // Filtrar solo actividades del empleado actual
//         this.actividades = data.filter((act: any) =>
//           act.nombreEmpleado &&
//           act.nombreEmpleado.toLowerCase().includes(this.nombreEmpleado.toLowerCase())
//         );

//         this.aplicarFiltros();
//         this.cargando = false;
//       },
//       error: (error) => {
//         console.error('Error al cargar actividades:', error);
//         this.error = 'No se pudieron cargar las actividades';
//         this.cargando = false;
//       }
//     });
//   }

//   aplicarFiltros(): void {
//     this.actividadesFiltradas = this.actividades.filter(actividad => {
//       // Filtro por nombre de actividad
//       const nombreCoincide = !this.filtroNombreActividad ||
//         actividad.nombreActividad.toLowerCase().includes(this.filtroNombreActividad.toLowerCase());

//       // Filtro por estatus
//       let estatusCoincide = true;
//       if (this.filtroEstatus) {
//         if (this.filtroEstatus === 'Pendiente') {
//           estatusCoincide = actividad.estatus === 'Asignada' || actividad.estatus === 'Cancelada';
//         } else if (this.filtroEstatus === 'En Proceso') {
//           estatusCoincide = actividad.estatus === 'En Curso';
//         } else if (this.filtroEstatus === 'Completada') {
//           estatusCoincide = actividad.estatus === 'Finalizada';
//         }
//       }

//       // Filtro por fechas
//       const fechaInicio = new Date(actividad.fechaInicioActividad);
//       const fechaTermino = new Date(actividad.fechaTerminoActividad);

//       const fechaDesdeCoincide = !this.filtroFechaDesde ||
//         fechaInicio >= new Date(this.filtroFechaDesde.toString());

//       const fechaHastaCoincide = !this.filtroFechaHasta ||
//         fechaTermino <= new Date(this.filtroFechaHasta.toString());

//       return nombreCoincide && estatusCoincide && fechaDesdeCoincide && fechaHastaCoincide;
//     });
//   }

//   limpiarFiltros(): void {
//     this.filtroNombreActividad = '';
//     this.filtroEstatus = '';
//     this.filtroFechaDesde = null;
//     this.filtroFechaHasta = null;
//     this.aplicarFiltros();
//   }
// }












import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";
import { ActividadesService } from '../../services/actividades.service';
import { EmpleadoService } from '../../services/empleado.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-actividades-empleado',
  templateUrl: './actividades-empleado.component.html',
  styleUrls: ['./actividades-empleado.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, EmpleadoNavegacionComponent],
  providers: [DatePipe]
})
export class ActividadesEmpleadoComponent implements OnInit {
  actividades: any[] = [];
  actividadesFiltradas: any[] = [];
  cargando: boolean = false;
  error: string = '';
  claveEmpleado: string = '';
  nombreEmpleado: string = '';

  // Filtros
  filtroNombreActividad: string = '';
  filtroEstatus: string = '';
  filtroFechaDesde: string | null = null;
  filtroFechaHasta: string | null = null;

  constructor(
    private actividadesService: ActividadesService,
    private empleadoService: EmpleadoService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    // Asigna una clave de empleado directamente para pruebas
    this.claveEmpleado = 'ALP-001'; // o la clave que quieras probar
    this.cargarDatosEmpleado();
  }

  cargarDatosEmpleado(): void {
    this.cargando = true;
    this.empleadoService.obtenerEmpleado(this.claveEmpleado).subscribe({
      next: (empleado) => {
        this.nombreEmpleado = `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno}`;
        this.cargarActividades();
      },
      error: (error) => {
        console.error('Error al cargar datos del empleado:', error);
        this.error = 'No se pudieron cargar los datos del empleado';
        this.cargando = false;
      }
    });
  }

  cargarActividades(): void {
    this.actividadesService.obtenerActividades().subscribe({
      next: (data) => {
        // Filtrar solo actividades del empleado actual
        this.actividades = data.filter((act: any) =>
          act.nombreEmpleado &&
          act.nombreEmpleado.toLowerCase().includes(this.nombreEmpleado.toLowerCase())
        );

        console.log('Actividades cargadas:', this.actividades);
        this.aplicarFiltros();
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar actividades:', error);
        this.error = 'No se pudieron cargar las actividades';
        this.cargando = false;
      }
    });
  }

  aplicarFiltros(): void {
    this.actividadesFiltradas = this.actividades.filter(actividad => {
      // Filtro por nombre de actividad
      const nombreCoincide = !this.filtroNombreActividad ||
        (actividad.nombreActividad &&
        actividad.nombreActividad.toLowerCase().includes(this.filtroNombreActividad.toLowerCase()));

      // Filtro por estatus
      let estatusCoincide = true;
      if (this.filtroEstatus) {
        if (this.filtroEstatus === 'Pendiente') {
          estatusCoincide = actividad.estatus === 'Asignada' || actividad.estatus === 'Pendiente';
        } else if (this.filtroEstatus === 'En Proceso') {
          estatusCoincide = actividad.estatus === 'En Progreso' || actividad.estatus === 'En Progreso';
        } else if (this.filtroEstatus === 'Completada') {
          estatusCoincide = actividad.estatus === 'Finalizada' || actividad.estatus === 'Completada';
        } else {
          estatusCoincide = actividad.estatus === this.filtroEstatus;
        }
      }

      // Filtro por fechas
      let fechaDesdeCoincide = true;
      let fechaHastaCoincide = true;

      if (actividad.fechaInicioActividad && this.filtroFechaDesde) {
        const fechaInicio = new Date(actividad.fechaInicioActividad);
        const fechaDesde = new Date(this.filtroFechaDesde);
        fechaDesdeCoincide = fechaInicio >= fechaDesde;
      }

      if (actividad.fechaTerminoActividad && this.filtroFechaHasta) {
        const fechaTermino = new Date(actividad.fechaTerminoActividad);
        const fechaHasta = new Date(this.filtroFechaHasta);
        fechaHastaCoincide = fechaTermino <= fechaHasta;
      }

      return nombreCoincide && estatusCoincide && fechaDesdeCoincide && fechaHastaCoincide;
    });

    console.log('Actividades filtradas:', this.actividadesFiltradas);
  }

  limpiarFiltros(): void {
    this.filtroNombreActividad = '';
    this.filtroEstatus = '';
    this.filtroFechaDesde = null;
    this.filtroFechaHasta = null;
    this.aplicarFiltros();
  }

  // Función para formatear fechas en el template
  formatDate(date: string | Date): string {
    if (!date) return '';
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }
}
