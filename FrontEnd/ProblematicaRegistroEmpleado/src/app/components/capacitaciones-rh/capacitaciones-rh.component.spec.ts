import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionesRhComponent } from './capacitaciones-rh.component';

describe('CapacitacionesRhComponent', () => {
  let component: CapacitacionesRhComponent;
  let fixture: ComponentFixture<CapacitacionesRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacitacionesRhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacitacionesRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
