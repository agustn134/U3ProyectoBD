import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = '/api/empleados'; // Usamos el proxy configurado

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) { }

  registrarEmpleado(empleado: any): Observable<any> {
    // Formatear el objeto empleado para coincidir con el esquema del backend
    const empleadoFormateado = this.formatearEmpleadoParaBackend(empleado);
    console.log('Registro - Datos enviados al backend:', empleadoFormateado);

    return this.http.post(this.apiUrl, empleadoFormateado)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  obtenerEmpleados(): Observable<any> {
    return this.http.get(this.apiUrl)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  obtenerEmpleado(claveEmpleado: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${claveEmpleado}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  actualizarEmpleado(claveEmpleado: string, empleado: any): Observable<any> {
    // Formatear el objeto empleado para coincidir con el esquema del backend
    const empleadoFormateado = this.formatearEmpleadoParaBackend(empleado);
    console.log('Actualización - Datos enviados al backend:', empleadoFormateado);

    return this.http.put(`${this.apiUrl}/${claveEmpleado}`, empleadoFormateado)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  eliminarEmpleado(claveEmpleado: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${claveEmpleado}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  buscarEmpleados(termino: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/buscar`, { params: { termino } })
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  // Método para formatear los datos del empleado para el backend
  private formatearEmpleadoParaBackend(empleado: any): any {
    // Crear un objeto nuevo para no modificar el original
    const empleadoFormateado: any = {};

    // Asignar propiedades directas (si existen en el objeto original)
    if (empleado.claveEmpleado) empleadoFormateado.claveEmpleado = empleado.claveEmpleado;
    if (empleado.RFC) empleadoFormateado.RFC = empleado.RFC;
    if (empleado.sexo) empleadoFormateado.sexo = empleado.sexo;
    if (empleado.departamento) empleadoFormateado.departamento = empleado.departamento;
    if (empleado.puesto) empleadoFormateado.puesto = empleado.puesto;
    if (empleado.fechaNacimiento) empleadoFormateado.fechaNacimiento = empleado.fechaNacimiento;
    if (empleado.foto) empleadoFormateado.foto = empleado.foto;
    if (empleado.cursosEmpleado) empleadoFormateado.cursosEmpleado = empleado.cursosEmpleado;

    // Formatear nombreCompleto
    if (empleado.nombreCompleto) {
      // Si ya tiene estructura correcta
      empleadoFormateado.nombreCompleto = empleado.nombreCompleto;
    } else if (empleado.nombre || empleado.apellidoPaterno || empleado.apellidoMaterno) {
      // Si están como propiedades individuales
      empleadoFormateado.nombreCompleto = {
        nombre: empleado.nombre,
        apellidoPaterno: empleado.apellidoPaterno,
        apellidoMaterno: empleado.apellidoMaterno
      };
    }

    // Formatear domicilio
    if (empleado.domicilio) {
      // Si ya tiene estructura correcta
      empleadoFormateado.domicilio = empleado.domicilio;
    } else if (empleado.calle || empleado.ciudad) {
      // Si están como propiedades individuales
      empleadoFormateado.domicilio = {
        calle: empleado.calle || '',
        numeroInterior: empleado.numeroInterior || '',
        numeroExterior: empleado.numeroExterior || '',
        colonia: empleado.colonia || '',
        codigoPostal: empleado.codigoPostal || '',
        ciudad: empleado.ciudad || ''
      };
    }

    // Formatear teléfonos y correos
    if (empleado.telefono) {
      // Si ya tiene el nombre correcto para la API
      empleadoFormateado.telefono = empleado.telefono;
    } else if (empleado.telefonos) {
      // Si viene del formulario (utiliza telefonos en plural)
      empleadoFormateado.telefono = empleado.telefonos.filter((tel: string) => tel.trim() !== '');
    }

    if (empleado.correoElectronico) {
      // Si ya tiene el nombre correcto para la API
      empleadoFormateado.correoElectronico = empleado.correoElectronico;
    } else if (empleado.correos) {
      // Si viene del formulario (utiliza correos en plural)
      empleadoFormateado.correoElectronico = empleado.correos.filter((correo: string) => correo.trim() !== '');
    }

    // Formatear referencias
    if (empleado.referencias) {
      if (empleado.referencias.length > 0 && empleado.referencias[0].nombreFamiliar) {
        // Si ya tienen el formato correcto para la API
        empleadoFormateado.referencias = empleado.referencias;
      } else {
        // Si vienen del formulario con estructura diferente
        empleadoFormateado.referencias = empleado.referencias
          .filter((ref: any) => ref.nombre && ref.nombre.trim() !== '')
          .map((ref: any) => ({
            nombreFamiliar: ref.nombre,
            parentesco: ref.parentesco,
            telefonoFamiliar: ref.telefono,
            correoElectronicoFamiliar: ref.correo || ''
          }));
      }
    }

    return empleadoFormateado;
  }}
