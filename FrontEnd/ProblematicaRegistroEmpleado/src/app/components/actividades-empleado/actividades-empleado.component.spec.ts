import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesEmpleadoComponent } from './actividades-empleado.component';

describe('ActividadesEmpleadoComponent', () => {
  let component: ActividadesEmpleadoComponent;
  let fixture: ComponentFixture<ActividadesEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
