import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarDatosEmpleadoComponent } from './actualizar-datos-empleado.component';

describe('ActualizarDatosEmpleadoComponent', () => {
  let component: ActualizarDatosEmpleadoComponent;
  let fixture: ComponentFixture<ActualizarDatosEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarDatosEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarDatosEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
