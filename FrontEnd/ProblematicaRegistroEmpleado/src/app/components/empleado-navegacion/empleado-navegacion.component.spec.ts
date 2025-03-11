import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoNavegacionComponent } from './empleado-navegacion.component';

describe('EmpleadoNavegacionComponent', () => {
  let component: EmpleadoNavegacionComponent;
  let fixture: ComponentFixture<EmpleadoNavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoNavegacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
