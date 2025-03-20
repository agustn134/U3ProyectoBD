import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl = 'http://localhost:5000/api/cursos';

  constructor(private http: HttpClient) { }

  obtenerCursos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearCurso(curso: any): Observable<any> {
    return this.http.post(this.apiUrl, curso);
  }

  obtenerCursoPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarCurso(id: string, curso: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, curso);
  }

  eliminarCurso(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
