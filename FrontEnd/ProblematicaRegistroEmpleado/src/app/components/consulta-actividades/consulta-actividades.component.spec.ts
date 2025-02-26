import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaActividadesComponent } from './consulta-actividades.component';

describe('ConsultaActividadesComponent', () => {
  let component: ConsultaActividadesComponent;
  let fixture: ComponentFixture<ConsultaActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaActividadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
