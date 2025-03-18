import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RhNavegacionComponent } from '../rh-navegacion/rh-navegacion.component';

interface Actividad {
  descripcion: string;
  fecha: Date;
  estado: 'Completada' | 'En Proceso' | 'Pendiente';
}

@Component({
  selector: 'app-actividades-empleado',
  templateUrl: './actividades-empleado.component.html',
  styleUrls: ['./actividades-empleado.component.css'],
  // Definiendo el componente como standalone
  standalone: true,
  // Importando los módulos y componentes necesarios
  imports: [CommonModule, FormsModule, RhNavegacionComponent]
})
export class ActividadesEmpleadoComponent implements OnInit {
  actividades: Actividad[] = [];

  constructor() { }

  ngOnInit(): void {
    // Cargar actividades de ejemplo
    this.cargarActividadesEjemplo();
  }

  cargarActividadesEjemplo(): void {
    // Datos de ejemplo
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