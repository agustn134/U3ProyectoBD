import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesRhComponent } from './actividades-rh.component';

describe('ActividadesRhComponent', () => {
  let component: ActividadesRhComponent;
  let fixture: ComponentFixture<ActividadesRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesRhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
