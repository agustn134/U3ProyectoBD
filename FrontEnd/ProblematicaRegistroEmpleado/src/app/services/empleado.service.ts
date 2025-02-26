import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // El servicio está disponible en toda la aplicación
})
export class EmpleadoService {
  private apiUrl = '/api/empleados'; // URL del backend

  constructor(private http: HttpClient) { }

  // Método para obtener empleados
  getEmpleados(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para crear un empleado
  createEmpleado(empleado: any): Observable<any> {
    return this.http.post(this.apiUrl, empleado);
  }
}
