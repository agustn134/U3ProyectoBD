import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CursosService } from '../../services/cursos.service';
import { EmpleadoService } from '../../services/empleado.service';
import { RhNavegacionComponent } from '../rh-navegacion/rh-navegacion.component';

@Component({
  selector: 'app-capacitaciones-rh',
  standalone: true,
  imports: [CommonModule, FormsModule, RhNavegacionComponent],
  templateUrl: './capacitaciones-rh.component.html',
  styleUrls: ['./capacitaciones-rh.component.css']
})
export class CapacitacionesRhComponent implements OnInit {
  cursos: any[] = [];
  empleados: any[] = [];
  cursosFiltrados: any[] = [];
  cargando: boolean = false;
  error: string = '';
  mensaje: string = '';

  // Filtros
  filtroNombreEmpleado: string = '';
  filtroNombreCurso: string = '';
  filtroTipoDocumento: string = '';
  filtroFechaInicio: string = '';
  filtroFechaFin: string = '';

  constructor(
    private cursosService: CursosService,
    private empleadoService: EmpleadoService
  ) { }

  ngOnInit(): void {
    this.cargarCursos();
    this.cargarEmpleados();
  }

  cargarCursos(): void {
    this.cargando = true;
    this.cursosService.obtenerCursos().subscribe({
      next: (data) => {
        console.log('Cursos cargados:', data);
        this.cursos = data;
        this.cursosFiltrados = [...this.cursos];
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar cursos:', error);
        this.error = 'Error al cargar la lista de cursos.';
        this.cargando = false;
      }
    });
  }

  cargarEmpleados(): void {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => {
        console.log('Empleados cargados:', data);
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al cargar empleados:', error);
      }
    });
  }

  aplicarFiltros(): void {
    this.cursosFiltrados = this.cursos.filter(curso => {
      // Filtro por nombre de empleado
      if (this.filtroNombreEmpleado &&
          !curso.nombreEmpleado.toLowerCase().includes(this.filtroNombreEmpleado.toLowerCase())) {
        return false;
      }

      // Filtro por nombre de curso
      if (this.filtroNombreCurso &&
          !curso.nombreCurso.toLowerCase().includes(this.filtroNombreCurso.toLowerCase())) {
        return false;
      }

      // Filtro por tipo de documento
      if (this.filtroTipoDocumento &&
          curso.documentoEntregado.tipoDocumento !== this.filtroTipoDocumento) {
        return false;
      }

      // Filtro por fecha de inicio
      if (this.filtroFechaInicio) {
        const fechaInicioCurso = new Date(curso.fechaInicio);
        const fechaInicioFiltro = new Date(this.filtroFechaInicio);
        if (fechaInicioCurso < fechaInicioFiltro) {
          return false;
        }
      }

      // Filtro por fecha de fin
      if (this.filtroFechaFin) {
        const fechaFinCurso = new Date(curso.fechaTermino);
        const fechaFinFiltro = new Date(this.filtroFechaFin);
        if (fechaFinCurso > fechaFinFiltro) {
          return false;
        }
      }

      return true;
    });
  }

  limpiarFiltros(): void {
    this.filtroNombreEmpleado = '';
    this.filtroNombreCurso = '';
    this.filtroTipoDocumento = '';
    this.filtroFechaInicio = '';
    this.filtroFechaFin = '';
    this.cursosFiltrados = [...this.cursos];
  }

  // Obtener nombre completo del empleado por su clave
  obtenerNombreEmpleado(claveEmpleado: string): string {
    const empleado = this.empleados.find(emp => emp.claveEmpleado === claveEmpleado);
    return empleado ?
      `${empleado.nombreCompleto.nombre} ${empleado.nombreCompleto.apellidoPaterno}` :
      'Empleado no encontrado';
  }

  // Formatear fecha para mostrar
  formatearFecha(fecha: string): string {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-MX');
  }

  // Eliminar curso
  eliminarCurso(id: string): void {
    if (confirm('¿Está seguro que desea eliminar este curso?')) {
      this.cargando = true;
      this.cursosService.eliminarCurso(id).subscribe({
        next: (response) => {
          console.log('Curso eliminado:', response);
          this.mensaje = 'Curso eliminado con éxito';
          this.cargarCursos(); // Recargar la lista
          this.cargando = false;
          setTimeout(() => {
            this.mensaje = '';
          }, 3000);
        },
        error: (error) => {
          console.error('Error al eliminar curso:', error);
          this.error = 'Error al eliminar el curso';
          this.cargando = false;
          setTimeout(() => {
            this.error = '';
          }, 3000);
        }
      });
    }
  }
}
