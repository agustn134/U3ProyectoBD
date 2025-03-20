import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = 'http://localhost:5000/api/uploads';

  constructor(private http: HttpClient) { }

  // Método para subir un archivo y mostrar el progreso
  uploadFile(file: File, tipo: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('tipo', tipo);

    const req = new HttpRequest('POST', `${this.apiUrl}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  // Método para obtener la URL de un archivo
  getFileUrl(fileName: string): string {
    return `${this.apiUrl}/${fileName}`;
  }
}
