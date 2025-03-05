import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaDeCursosComponent } from './pantalla-de-cursos.component';

describe('PantallaDeCursosComponent', () => {
  let component: PantallaDeCursosComponent;
  let fixture: ComponentFixture<PantallaDeCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantallaDeCursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaDeCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
