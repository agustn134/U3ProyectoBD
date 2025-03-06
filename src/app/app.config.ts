import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Para peticiones HTTP si usas servicios
import { routes } from './app.routes';
import { EmpleadoService } from './services/empleado.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Habilita el enrutador
    provideHttpClient(),
    EmpleadoService
  ]
};

// En aplicaciones standalone, en lugar de importar HttpClientModule, debes usar provideHttpClient() en la configuración global.
// HttpClient es necesario porque EmpleadoService seguramente usa HttpClient para hacer peticiones HTTP.
