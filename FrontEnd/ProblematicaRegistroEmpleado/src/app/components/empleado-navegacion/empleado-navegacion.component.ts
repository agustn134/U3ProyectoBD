import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { CursosService } from '../../services/cursos.service';
import { ActividadesService } from '../../services/actividades.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleado-navegacion',
  imports: [
     RouterLink,
        RouterModule,
        CommonModule
  ],
  templateUrl: './empleado-navegacion.component.html',
  styleUrl: './empleado-navegacion.component.css'
})
export class EmpleadoNavegacionComponent {


}
