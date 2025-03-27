// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CursosService {
//   private apiUrl = 'http://localhost:5000/api/cursos';

//   constructor(private http: HttpClient) { }

//   obtenerCursos(): Observable<any> {
//     return this.http.get(this.apiUrl);
//   }

//   crearCurso(curso: any): Observable<any> {
//     return this.http.post(this.apiUrl, curso);
//   }

//   obtenerCursoPorId(id: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${id}`);
//   }

//   actualizarCurso(id: string, curso: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, curso);
//   }

//   eliminarCurso(id: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
// }


























import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl = '/api/cursos';

  constructor(private http: HttpClient) { }

  obtenerCursos(): Observable<any> {
    return this.http.get(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  crearCurso(curso: any): Observable<any> {
    // Verificamos que el curso tenga la estructura correcta para el backend
    const cursoFormateado = this.formatearCursoParaBackend(curso);
    console.log('Creando curso:', cursoFormateado);

    return this.http.post(this.apiUrl, cursoFormateado)
      .pipe(
        catchError(this.handleError)
      );
  }

  obtenerCursoPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  actualizarCurso(id: string, curso: any): Observable<any> {
    const cursoFormateado = this.formatearCursoParaBackend(curso);
    console.log('Actualizando curso:', cursoFormateado);

    return this.http.put(`${this.apiUrl}/${id}`, cursoFormateado)
      .pipe(
        catchError(this.handleError)
      );
  }

  eliminarCurso(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
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

  // Método para formatear los datos del curso para el backend
  private formatearCursoParaBackend(curso: any): any {
    // Crear objeto nuevo para no modificar el original
    const cursoFormateado: any = {
      nombreEmpleado: curso.nombreEmpleado || '',
      nombreCurso: curso.nombreCurso || curso.nombre || '',
      fechaInicio: curso.fechaInicio || new Date(),
      fechaTermino: curso.fechaTermino || new Date()
    };

    // Formatear el documento entregado
    if (curso.documentoEntregado) {
      cursoFormateado.documentoEntregado = curso.documentoEntregado;
    } else if (curso.tipoDocumento) {
      cursoFormateado.documentoEntregado = {
        tipoDocumento: curso.tipoDocumento,
        rutaArchivo: curso.rutaArchivo || 'pendiente.pdf'
      };
    } else {
      // Valores por defecto si no hay documento
      cursoFormateado.documentoEntregado = {
        tipoDocumento: 'Constancia',
        rutaArchivo: 'pendiente.pdf'
      };
    }

    return cursoFormateado;
  }
}
