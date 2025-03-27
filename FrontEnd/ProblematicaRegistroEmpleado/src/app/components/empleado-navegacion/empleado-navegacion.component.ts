import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleado-navegacion',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    CommonModule
  ],
  templateUrl: './empleado-navegacion.component.html',
  styleUrl: './empleado-navegacion.component.css'
})
export class EmpleadoNavegacionComponent implements OnInit {
  claveEmpleado: string = '';
  nombreEmpleado: string = '';
  fotoUrl: string = '';
  cargando: boolean = false;

  constructor(private empleadoService: EmpleadoService) {}

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
        this.fotoUrl = empleado.foto || 'https://images.unsplash.com/photo-1742201835826-3b607fa4e8b2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar datos del empleado:', error);
        this.cargando = false;
      }
    });
  }
}
