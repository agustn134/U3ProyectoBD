import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ActividadesEmpleadoComponent } from './components/actividades-empleado/actividades-empleado.component';
import { ActualizarDatosEmpleadoComponent } from './components/actualizar-datos-empleado/actualizar-datos-empleado.component';
import { CursosEmpleadoComponent } from './components/cursos-empleado/cursos-empleado.component';
import { PantallaDeCursosComponent } from './components/pantalla-de-cursos/pantalla-de-cursos.component';
import { RegistrarEmpleadoComponent } from './components/registrar-empleado/registrar-empleado.component';
import { RhNavegacionComponent } from './components/rh-navegacion/rh-navegacion.component';
import { BuscarEmpleadoComponent } from './components/buscar-empleado/buscar-empleado.component';
import { EmpleadoNavegacionComponent } from './components/empleado-navegacion/empleado-navegacion.component';
import { ActividadesRhComponent } from './components/actividades-rh/actividades-rh.component';
import { CapacitacionesRhComponent } from './components/capacitaciones-rh/capacitaciones-rh.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'empleado/actividades-empleado', component: ActividadesEmpleadoComponent },
  { path: 'empleado/actualizar-datos-empleado', component: ActualizarDatosEmpleadoComponent },
  { path: 'empleado/cursos-empleado', component: CursosEmpleadoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'empleado/buscar-curso', component: PantallaDeCursosComponent },
  { path: 'rh/registrar-empleado', component: RegistrarEmpleadoComponent },
  { path: 'rh/buscar-empleado', component: BuscarEmpleadoComponent },
  { path: 'rh/actividades-empleado', component: ActividadesRhComponent },
  { path: 'rh/capacitaciones-empleado', component: CapacitacionesRhComponent },


  { path: 'rh', component: RhNavegacionComponent },
  { path: 'empleado', component: EmpleadoNavegacionComponent },
  {
    path: 'empleado/actualizar-datos-empleado/:claveEmpleado',
    component: ActualizarDatosEmpleadoComponent
  },
  {
    path: 'empleado/actualizar-datos-empleado/:claveEmpleado',
    component: ActualizarDatosEmpleadoComponent
  },


  { path: '**', redirectTo: 'home' }
];
