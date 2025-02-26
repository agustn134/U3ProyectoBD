import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCursosComponent } from './consulta-cursos.component';

describe('ConsultaCursosComponent', () => {
  let component: ConsultaCursosComponent;
  let fixture: ComponentFixture<ConsultaCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaCursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
