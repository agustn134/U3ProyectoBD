import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { InicioEmpleadoComponent } from './components/inicio-empleado/inicio-empleado.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'actividades-empleado', component: ActividadesComponent }, // Verifica que esté bien escrito
  { path: 'inicio-empleado', component: InicioEmpleadoComponent },
  { path: '**', redirectTo: '/actividades-empleado' } // Redirección a la página principal si la ruta no existe
];
