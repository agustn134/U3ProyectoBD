import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

  // Método genérico para procesar errores HTTP
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del backend
      switch (error.status) {
        case 400:
          errorMessage = 'Solicitud incorrecta. Verifique los datos enviados.';
          break;
        case 401:
          errorMessage = 'No autorizado. Por favor, inicie sesión nuevamente.';
          break;
        case 403:
          errorMessage = 'Acceso prohibido. No tiene permisos para esta acción.';
          break;
        case 404:
          errorMessage = 'El recurso solicitado no existe.';
          break;
        case 409:
          errorMessage = 'Conflicto con el estado actual del recurso.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intente más tarde.';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }

      // Si el backend envía un mensaje específico, usarlo
      if (error.error && error.error.msg) {
        errorMessage = error.error.msg;
      }
    }

    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  // Método para mostrar errores de validación de formularios
  getFormValidationErrors(form: any): string[] {
    const errors: string[] = [];

    Object.keys(form.controls).forEach(key => {
      const controlErrors = form.controls[key].errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          let errorMsg = '';
          switch (keyError) {
            case 'required':
              errorMsg = `El campo ${key} es requerido`;
              break;
            case 'email':
              errorMsg = `El campo ${key} debe ser un correo válido`;
              break;
            case 'minlength':
              errorMsg = `El campo ${key} debe tener al menos ${controlErrors[keyError].requiredLength} caracteres`;
              break;
            case 'maxlength':
              errorMsg = `El campo ${key} no debe exceder ${controlErrors[keyError].requiredLength} caracteres`;
              break;
            case 'pattern':
              errorMsg = `El formato del campo ${key} es inválido`;
              break;
            default:
              errorMsg = `${key}: ${keyError}`;
          }
          errors.push(errorMsg);
        });
      }
    });

    return errors;
  }
}
