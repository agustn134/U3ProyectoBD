import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private apiUrl = 'http://localhost:5000/api/actividades';

  constructor(private http: HttpClient) { }

  // Obtener todas las actividades
  obtenerActividades(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Crear una nueva actividad
  crearActividad(actividad: any): Observable<any> {
    return this.http.post(this.apiUrl, actividad);
  }

  // Obtener una actividad por su ID
  obtenerActividadPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Actualizar una actividad
  actualizarActividad(id: string, actividad: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, actividad);
  }
}
