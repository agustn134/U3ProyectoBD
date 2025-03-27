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

  cargarActividades(): void {
    this.actividadesService.obtenerActividades().subscribe({
      next: (data: Actividad[]) => {
        this.actividades = data;
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

  // Método para filtrar actividades
  get actividadesFiltradas(): Actividad[] {
    return this.actividades.filter(actividad =>
      (this.filtroNombreEmpleado === '' ||
       actividad.nombreEmpleado.toLowerCase().includes(this.filtroNombreEmpleado.toLowerCase())) &&
      (this.filtroNombreActividad === '' ||
       actividad.nombreActividad.toLowerCase().includes(this.filtroNombreActividad.toLowerCase())) &&
      (this.filtroEstatus === '' || actividad.estatus === this.filtroEstatus)
    );
  }

  // Método para obtener empleados que no han sido a actividades
  obtenerEmpleadosSinActividades(): Empleado[] {
    const empleadosConActividades = new Set(this.actividades.map(a => a.nombreEmpleado));
    return this.empleados.filter(empleado =>
      !empleadosConActividades.has(`${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno} ${empleado.nombreCompleto.apellidoMaterno}`)
    );
  }

  // Método para limpiar filtros
  limpiarFiltros(): void {
    this.filtroNombreEmpleado = '';
    this.filtroNombreActividad = '';
    this.filtroEstatus = '';
  }
}
