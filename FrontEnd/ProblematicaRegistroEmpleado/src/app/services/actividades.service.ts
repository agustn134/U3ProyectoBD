// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ActividadesService {
//   private apiUrl = 'http://localhost:5000/api/actividades';

//   constructor(private http: HttpClient) { }

//   // Obtener todas las actividades
//   obtenerActividades(): Observable<any> {
//     return this.http.get(this.apiUrl);
//   }

//   // Crear una nueva actividad
//   crearActividad(actividad: any): Observable<any> {
//     return this.http.post(this.apiUrl, actividad);
//   }

//   // Obtener una actividad por su ID
//   obtenerActividadPorId(id: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${id}`);
//   }

//   // Actualizar una actividad
//   actualizarActividad(id: string, actividad: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, actividad);
//   }
// }








































import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private apiUrl = '/api/actividades';

  constructor(private http: HttpClient) { }

  // Obtener todas las actividades
  obtenerActividades(): Observable<any> {
    return this.http.get(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Crear una nueva actividad
  crearActividad(actividad: any): Observable<any> {
    const actividadFormateada = this.formatearActividadParaBackend(actividad);
    console.log('Creando actividad:', actividadFormateada);

    return this.http.post(this.apiUrl, actividadFormateada)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Obtener una actividad por su ID
  obtenerActividadPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Actualizar una actividad
  actualizarActividad(id: string, actividad: any): Observable<any> {
    const actividadFormateada = this.formatearActividadParaBackend(actividad);
    console.log('Actualizando actividad:', actividadFormateada);

    return this.http.put(`${this.apiUrl}/${id}`, actividadFormateada)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para manejar errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
      if (error.error && error.error.msg) {
        errorMessage = error.error.msg;
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Método para formatear los datos de la actividad para el backend
  private formatearActividadParaBackend(actividad: any): any {
    // Crear objeto nuevo para no modificar el original
    const actividadFormateada: any = {
      nombreEmpleado: actividad.nombreEmpleado || '',
      nombreActividad: actividad.nombreActividad || actividad.nombre || '',
      estatus: actividad.estatus || 'Pendiente'
    };

    // Formatear fechas
    if (actividad.fechaInicioActividad) {
      actividadFormateada.fechaInicioActividad = actividad.fechaInicioActividad;
    } else if (actividad.fechaInicio) {
      actividadFormateada.fechaInicioActividad = actividad.fechaInicio;
    } else {
      actividadFormateada.fechaInicioActividad = new Date();
    }

    if (actividad.fechaTerminoActividad) {
      actividadFormateada.fechaTerminoActividad = actividad.fechaTerminoActividad;
    } else if (actividad.fechaTermino) {
      actividadFormateada.fechaTerminoActividad = actividad.fechaTermino;
    } else {
      // Por defecto, fecha de término una semana después del inicio
      const fechaTermino = new Date(actividadFormateada.fechaInicioActividad);
      fechaTermino.setDate(fechaTermino.getDate() + 7);
      actividadFormateada.fechaTerminoActividad = fechaTermino;
    }

    return actividadFormateada;
  }
}
