import { Component } from '@angular/core';
import { EmpleadoNavegacionComponent } from "../empleado-navegacion/empleado-navegacion.component";

@Component({
  selector: 'app-actividades-empleado',
  imports: [EmpleadoNavegacionComponent],
  templateUrl: './actividades-empleado.component.html',
  styleUrl: './actividades-empleado.component.css'
})
export class ActividadesEmpleadoComponent {
// Propiedades para actividades
mostrarFormularioActividad: boolean = false; // Controla la visibilidad del formulario de actividad
actividades: any[] = []; // Lista de actividades
actividadForm: any = {}; // Datos del formulario de actividad


}
