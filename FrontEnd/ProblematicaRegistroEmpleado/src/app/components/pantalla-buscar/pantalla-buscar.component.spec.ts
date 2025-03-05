import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaBuscarComponent } from './pantalla-buscar.component';

describe('PantallaBuscarComponent', () => {
  let component: PantallaBuscarComponent;
  let fixture: ComponentFixture<PantallaBuscarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantallaBuscarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaBuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
