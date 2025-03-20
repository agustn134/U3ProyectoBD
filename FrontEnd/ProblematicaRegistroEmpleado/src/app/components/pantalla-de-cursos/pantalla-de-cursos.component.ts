import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CursosService } from '../../services/cursos.service';
import { EmpleadoNavegacionComponent } from '../empleado-navegacion/empleado-navegacion.component';

@Component({
  selector: 'app-pantalla-de-cursos',
  templateUrl: './pantalla-de-cursos.component.html',
  styleUrls: ['./pantalla-de-cursos.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, EmpleadoNavegacionComponent]
})
export class PantallaDeCursosComponent implements OnInit {
  cursos: any[] = [];
  cursosFiltrados: any[] = [];
  terminoBusqueda: string = '';
  cargando: boolean = false;
  error: string = '';

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cargando = true;
    this.cursosService.obtenerCursos().subscribe({
      next: (data) => {
        this.cursos = data.map((curso: any) => ({
          id: curso._id,
          nombre: curso.nombreCurso,
          fechaInicio: new Date(curso.fechaInicio).toLocaleDateString(),
          fechaTermino: new Date(curso.fechaTermino).toLocaleDateString(),
          tipoDocumento: curso.documentoEntregado?.tipoDocumento || 'N/A',
          empleado: curso.nombreEmpleado
        }));
        this.cursosFiltrados = [...this.cursos];
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar cursos:', error);
        this.error = 'No se pudieron cargar los cursos';
        this.cargando = false;
      }
    });
  }

  buscarCursos(): void {
    if (!this.terminoBusqueda || this.terminoBusqueda.trim() === '') {
      this.cursosFiltrados = [...this.cursos];
      return;
    }

    const termino = this.terminoBusqueda.toLowerCase().trim();

    this.cursosFiltrados = this.cursos.filter(curso =>
      curso.nombre.toLowerCase().includes(termino) ||
      curso.empleado.toLowerCase().includes(termino) ||
      curso.tipoDocumento.toLowerCase().includes(termino)
    );
  }
}
