import { Routes } from '@angular/router';
import { RegistroEmpleadoComponent } from './components/registro-empleado/registro-empleado.component';
import { ConsultaEmpleadoComponent } from './components/consulta-empleado/consulta-empleado.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registro-empleado', component: RegistroEmpleadoComponent }, // Verifica que esté bien escrito
  { path: 'consulta-empleado', component: ConsultaEmpleadoComponent },
  { path: '**', redirectTo: '' } // Redirección a la página principal si la ruta no existe
];
