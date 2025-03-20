// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";

// interface Actividad {
//   descripcion: string;
//   fecha: Date;
//   estado: 'Completada' | 'En Proceso' | 'Pendiente';
// }

// @Component({
//   selector: 'app-actividades-empleado',
//   templateUrl: './actividades-empleado.component.html',
//   styleUrls: ['./actividades-empleado.component.css'],
//   // Definiendo el componente como standalone
//   standalone: true,
//   // Importando los módulos y componentes necesarios
//   imports: [CommonModule, FormsModule, EmpleadoNavegacionComponent]
// })
// export class ActividadesEmpleadoComponent implements OnInit {
//   actividades: Actividad[] = [];

//   constructor() { }

//   ngOnInit(): void {
//     // Cargar actividades de ejemplo
//     this.cargarActividadesEjemplo();
//   }

//   cargarActividadesEjemplo(): void {
//     // Datos de ejemplo
//     this.actividades = [
//       {
//         descripcion: 'Entrega de documentación',
//         fecha: new Date('2025-03-10'),
//         estado: 'Completada'
//       },
//       {
//         descripcion: 'Entrevista con recursos humanos',
//         fecha: new Date('2025-03-12'),
//         estado: 'Completada'
//       },
//       {
//         descripcion: 'Capacitación inicial',
//         fecha: new Date('2025-03-15'),
//         estado: 'En Proceso'
//       },
//       {
//         descripcion: 'Asignación de proyecto',
//         fecha: new Date('2025-03-20'),
//         estado: 'Pendiente'
//       }
//     ];
//   }
// }













import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";
import { ActividadesService } from '../../services/actividades.service';

interface Actividad {
  _id?: string;
  nombreActividad: string;
  estatus: string;
  fechaInicioActividad: Date;
  fechaTerminoActividad: Date;
}

@Component({
  selector: 'app-actividades-empleado',
  templateUrl: './actividades-empleado.component.html',
  styleUrls: ['./actividades-empleado.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, EmpleadoNavegacionComponent]
})
export class ActividadesEmpleadoComponent implements OnInit {
  actividades: any[] = [];
  cargando: boolean = false;
  error: string = '';

  constructor(private actividadesService: ActividadesService) { }

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(): void {
    this.cargando = true;
    this.actividadesService.obtenerActividades().subscribe({
      next: (data) => {
        // Transformar los datos a un formato que espera la vista
        this.actividades = data.map((act: any) => ({
          descripcion: act.nombreActividad,
          fecha: new Date(act.fechaInicioActividad),
          estado: this.mapearEstatus(act.estatus)
        }));
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar actividades:', error);
        this.error = 'No se pudieron cargar las actividades';
        this.cargando = false;
        // Cargar datos de ejemplo en caso de error
        this.cargarActividadesEjemplo();
      }
    });
  }

  // Mapea los estados del backend a los estados que maneja la vista
  mapearEstatus(estatus: string): 'Completada' | 'En Proceso' | 'Pendiente' {
    const estatusMap: {[key: string]: 'Completada' | 'En Proceso' | 'Pendiente'} = {
      'Finalizada': 'Completada',
      'En Curso': 'En Proceso',
      'Asignada': 'Pendiente',
      'Cancelada': 'Pendiente'
    };
    return estatusMap[estatus] || 'Pendiente';
  }

  cargarActividadesEjemplo(): void {
    // Datos de ejemplo (fallback)
    this.actividades = [
      {
        descripcion: 'Entrega de documentación',
        fecha: new Date('2025-03-10'),
        estado: 'Completada'
      },
      {
        descripcion: 'Entrevista con recursos humanos',
        fecha: new Date('2025-03-12'),
        estado: 'Completada'
      },
      {
        descripcion: 'Capacitación inicial',
        fecha: new Date('2025-03-15'),
        estado: 'En Proceso'
      },
      {
        descripcion: 'Asignación de proyecto',
        fecha: new Date('2025-03-20'),
        estado: 'Pendiente'
      }
    ];
  }
}
