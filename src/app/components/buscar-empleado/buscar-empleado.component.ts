import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RhNavegacionComponent } from '../rh-navegacion/rh-navegacion.component';

@Component({
  selector: 'app-buscar-empleado',
  standalone: true,
  imports: [
      CommonModule, // Necesario para *ngFor
      FormsModule, // Necesario para ngModel
      RhNavegacionComponent
    ],
  templateUrl: './buscar-empleado.component.html',
  styleUrls: ['./buscar-empleado.component.css']
})
export class BuscarEmpleadoComponent {
  // Datos de ejemplo (simulando una base de datos)
  empleados = [
    {
      clave: "EMP-001",
      nombre: "Juan Pérez",
      departamento: "Recursos Humanos",
      puesto: "Gerente de Recursos Humanos",
      fechaAlta: "2023-01-15",
      rfc: "SIGR-770910",
      sexo: "Masculino",
      foto: "url_de_la_foto",
      domicilio: {
        calle: "Av. Reforma",
        numeroInterior: "123",
        numeroExterior: "456",
        colonia: "Centro",
        codigoPostal: "12345",
        ciudad: "Ciudad de México"
      },
      telefonos: ["555-1234", "555-5678"],
      correos: ["juan.perez@empresa.com"],
      referencias: [
        {
          nombre: "María López",
          parentesco: "Esposa",
          telefono: "555-9876",
          correo: "maria.lopez@example.com"
        }
      ]
    }
    // Agrega más empleados aquí...
  ];

  searchTerm: string = ''; // Término de búsqueda
  empleadosFiltrados: any[] = []; // Resultados filtrados
  mostrarModal: boolean = false; // Controla la visibilidad del modal
  empleadoSeleccionado: any = null; // Empleado seleccionado para ver detalles

  // Constructor
  constructor() {
    this.empleadosFiltrados = [...this.empleados]; // Inicializar con todos los empleados
  }

  // Función para buscar empleados
  buscarEmpleados(): void {
    const term = this.searchTerm.toLowerCase();
    this.empleadosFiltrados = this.empleados.filter(
      (empleado) =>
        empleado.clave.toLowerCase().includes(term) ||
        empleado.rfc.toLowerCase().includes(term) ||
        empleado.nombre.toLowerCase().includes(term)
    );
  }

  // Función para ver detalles del empleado
  verDetalles(clave: string): void {
    this.empleadoSeleccionado = this.empleados.find((e) => e.clave === clave);
    this.mostrarModal = true;
  }

  // Función para cerrar el modal
  cerrarModal(): void {
    this.mostrarModal = false;
    this.empleadoSeleccionado = null;
  }

  // Función para eliminar empleado
  eliminarEmpleado(clave: string): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      const index = this.empleados.findIndex((e) => e.clave === clave);
      if (index !== -1) {
        this.empleados.splice(index, 1);
        this.buscarEmpleados(); // Refrescar la tabla
      }
    }
  }

  // Función para editar empleado (simulación)
  editarEmpleado(clave: string): void {
    alert(`Editar empleado con clave: ${clave}`);
  }
}
