import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosEmpleadoComponent } from './cursos-empleado.component';

describe('CursosEmpleadoComponent', () => {
  let component: CursosEmpleadoComponent;
  let fixture: ComponentFixture<CursosEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
