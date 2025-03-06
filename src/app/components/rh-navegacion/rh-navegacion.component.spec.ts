import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhNavegacionComponent } from './rh-navegacion.component';

describe('RhNavegacionComponent', () => {
  let component: RhNavegacionComponent;
  let fixture: ComponentFixture<RhNavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RhNavegacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RhNavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
