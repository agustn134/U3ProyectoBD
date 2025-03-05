import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarClavesComponent } from './generar-claves.component';

describe('GenerarClavesComponent', () => {
  let component: GenerarClavesComponent;
  let fixture: ComponentFixture<GenerarClavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarClavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarClavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
