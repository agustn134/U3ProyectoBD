import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:5000/api/empleados';

  constructor(private http: HttpClient) { }

  registrarEmpleado(empleado: any): Observable<any> {
    const crearEmpleado = {
      claveEmpleado: empleado.claveEmpleado,
      nombreCompleto: {
        nombre: empleado.nombre,
        apellidoPaterno: empleado.apellidoPaterno,
        apellidoMaterno: empleado.apellidoMaterno
      },
      RFC: empleado.rfc,
      fechaNacimiento: empleado.fechaNacimiento,
      sexo: empleado.sexo || 'Masculino', 
      domicilio: {
        calle: empleado.calle || '',
        numeroInterior: empleado.numeroInterior || '',
        numeroExterior: empleado.numeroExterior || '',
        colonia: empleado.colonia || '',
        codigoPostal: empleado.codigoPostal || '',
        ciudad: empleado.ciudad || ''
      },
      departamento: empleado.departamento || '',
      puesto: empleado.puesto || '',
      telefono: empleado.telefonos,
      correoElectronico: empleado.correos,
      referencias: empleado.referencias.map((ref: any) => ({
        nombreFamiliar: ref.nombre,
        parentesco: ref.parentesco,
        telefonoFamiliar: ref.telefono,
        correoElectronicoFamiliar: ref.correo
      }))
    };

    return this.http.post(this.apiUrl, crearEmpleado);
  }

  obtenerEmpleados(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  obtenerEmpleado(claveEmpleado: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${claveEmpleado}`);
  }

  actualizarEmpleado(claveEmpleado: string, empleado: any): Observable<any> {
    const actualizarEmpleado = {
      claveEmpleado: empleado.claveEmpleado,
      nombreCompleto: {
        nombre: empleado.nombre,
        apellidoPaterno: empleado.apellidoPaterno,
        apellidoMaterno: empleado.apellidoMaterno
      },
      RFC: empleado.rfc,
      fechaNacimiento: empleado.fechaNacimiento,
      sexo: empleado.sexo || 'Masculino',
      domicilio: {
        calle: empleado.calle || '',
        numeroInterior: empleado.numeroInterior || '',
        numeroExterior: empleado.numeroExterior || '',
        colonia: empleado.colonia || '',
        codigoPostal: empleado.codigoPostal || '',
        ciudad: empleado.ciudad || ''
      },
      departamento: empleado.departamento || '',
      puesto: empleado.puesto || '',
      telefono: empleado.telefonos,
      correoElectronico: empleado.correos,
      referencias: empleado.referencias.map((ref: any) => ({
        nombreFamiliar: ref.nombre,
        parentesco: ref.parentesco,
        telefonoFamiliar: ref.telefono,
        correoElectronicoFamiliar: ref.correo
      }))
    };
    
    return this.http.put(`${this.apiUrl}/${claveEmpleado}`, actualizarEmpleado);
  }

  eliminarEmpleado(claveEmpleado: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${claveEmpleado}`);
  }
}
