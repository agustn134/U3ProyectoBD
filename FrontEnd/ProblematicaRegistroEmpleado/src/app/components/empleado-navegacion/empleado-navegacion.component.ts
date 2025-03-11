import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-empleado-navegacion',
  imports: [
     RouterLink,
        RouterModule
  ],
  templateUrl: './empleado-navegacion.component.html',
  styleUrl: './empleado-navegacion.component.css'
})
export class EmpleadoNavegacionComponent {

}
