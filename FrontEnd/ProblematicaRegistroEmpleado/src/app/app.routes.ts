import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { InicioEmpleadoComponent } from './components/inicio-empleado/inicio-empleado.component';
import { PantallaBuscarComponent } from './components/pantalla-buscar/pantalla-buscar.component';
import { ActividadesEmpleadoComponent } from './components/actividades-empleado/actividades-empleado.component';
import { ActualizarDatosEmpleadoComponent } from './components/actualizar-datos-empleado/actualizar-datos-empleado.component';
import { CursosEmpleadoComponent } from './components/cursos-empleado/cursos-empleado.component';
import { DocumentosExternosComponent } from './components/documentos-externos/documentos-externos.component';
import { GenerarClavesComponent } from './components/generar-claves/generar-claves.component';
import { PantallaDeCursosComponent } from './components/pantalla-de-cursos/pantalla-de-cursos.component';
import { RegistrarEmpleadoComponent } from './components/registrar-empleado/registrar-empleado.component';
import { RhNavegacionComponent } from './components/rh-navegacion/rh-navegacion.component';
import { BuscarEmpleadoComponent } from './components/buscar-empleado/buscar-empleado.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'empleado/actividades', component: ActividadesComponent }, // Verifica que esté bien escrito
  { path: 'empleado/actividades-empleado', component: ActividadesEmpleadoComponent },
  { path: 'empleado/actualizar-datos-empleado', component: ActualizarDatosEmpleadoComponent },
  { path: 'empleado/cursos-empleado', component: CursosEmpleadoComponent },
  { path: 'empleado/documentos-externos', component: DocumentosExternosComponent },
  { path: 'empleado/generar-claves', component: GenerarClavesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'empleado/inicio', component: InicioEmpleadoComponent },
  { path: 'rh/pantalla-buscar', component: PantallaBuscarComponent },
  { path: 'empleado/buscar-curso', component: PantallaDeCursosComponent },
  { path: 'rh/registrar-empleado', component: RegistrarEmpleadoComponent },
  { path: 'rh/buscar-empleado', component: BuscarEmpleadoComponent },
  { path: 'rh', component: RhNavegacionComponent },


  { path: '**', redirectTo: 'home' } // Redirección a la página principal si la ruta no existe
];
