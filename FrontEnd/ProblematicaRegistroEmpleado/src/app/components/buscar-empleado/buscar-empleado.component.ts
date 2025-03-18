import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { RhNavegacionComponent } from '../../components/rh-navegacion/rh-navegacion.component';

@Component({
  selector: 'app-buscar-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RhNavegacionComponent],
  templateUrl: './buscar-empleado.component.html',
  styleUrls: ['./buscar-empleado.component.css']
})
export class BuscarEmpleadoComponent implements OnInit {
  terminoBusqueda: string = '';
  empleados: any[] = [];
  empleadosFiltrados: any[] = [];
  mensajeError: string = '';
  cargando: boolean = false;
  empleadoSeleccionado: any = null;
  mostrarModal: boolean = false;

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    // Cargar todos los empleados al inicializar el componente
    this.cargarTodosLosEmpleados();
  }

  cargarTodosLosEmpleados(): void {
    this.cargando = true;
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        this.empleadosFiltrados = [...this.empleados];
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar empleados:', error);
        this.mensajeError = 'Error al cargar la lista de empleados. Intente nuevamente.';
        this.cargando = false;
      }
    });
  }

  buscarEmpleados(): void {
    if (!this.terminoBusqueda || this.terminoBusqueda.trim() === '') {
      this.empleadosFiltrados = [...this.empleados];
      return;
    }

    const termino = this.terminoBusqueda.toLowerCase().trim();
    
    this.empleadosFiltrados = this.empleados.filter(emp => 
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
      }
    });
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.empleadoSeleccionado = null;
  }

  editarEmpleado(claveEmpleado: string): void {
    // Implementar navegación a formulario de edición
    console.log('Editar empleado:', claveEmpleado);
    // Ejemplo: this.router.navigate(['/empleados/editar', claveEmpleado]);
  }

  eliminarEmpleado(claveEmpleado: string): void {
    if (confirm('¿Está seguro que desea eliminar este empleado?')) {
      this.cargando = true;
      this.empleadoService.eliminarEmpleado(claveEmpleado).subscribe({
        next: () => {
          this.empleados = this.empleados.filter(emp => emp.claveEmpleado !== claveEmpleado);
          this.empleadosFiltrados = this.empleadosFiltrados.filter(emp => emp.claveEmpleado !== claveEmpleado);
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al eliminar empleado:', error);
          this.mensajeError = 'Error al eliminar el empleado';
          this.cargando = false;
        }
      });
    }
  }
}