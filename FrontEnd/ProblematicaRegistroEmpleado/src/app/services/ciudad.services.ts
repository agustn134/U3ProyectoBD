import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  private apiUrl = 'http://localhost:5000/api/ciudades';

  constructor(private http: HttpClient) { }

  // Obtener todas las actividades
  verCiudades(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Crear una nueva actividad
  crearCiudad(actividad: any): Observable<any> {
    return this.http.post(this.apiUrl, actividad);
  }

  // Obtener una actividad por su ID
  obtenerCiudad(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Actualizar una actividad
  actualizarCiudad(id: string, actividad: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, actividad);
  }
}
