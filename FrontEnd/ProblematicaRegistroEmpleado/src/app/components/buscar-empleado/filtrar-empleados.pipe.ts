// filtrar-empleados.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarEmpleados',
  standalone: true
})
export class FiltrarEmpleadosPipe implements PipeTransform {
  transform(empleados: any[], filtro: string): any[] {
    if (!empleados || !filtro) {
      return empleados;
    }

    filtro = filtro.toLowerCase();

    return empleados.filter(empleado => {
      return (
        empleado.claveEmpleado?.toLowerCase().includes(filtro) ||
        empleado.nombreCompleto?.nombre?.toLowerCase().includes(filtro) ||
        empleado.nombreCompleto?.apellidoPaterno?.toLowerCase().includes(filtro) ||
        empleado.nombreCompleto?.apellidoMaterno?.toLowerCase().includes(filtro) ||
        empleado.RFC?.toLowerCase().includes(filtro) ||
        empleado.departamento?.toLowerCase().includes(filtro)
      );
    });
  }
}
