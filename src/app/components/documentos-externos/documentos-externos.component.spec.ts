import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosExternosComponent } from './documentos-externos.component';

describe('DocumentosExternosComponent', () => {
  let component: DocumentosExternosComponent;
  let fixture: ComponentFixture<DocumentosExternosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosExternosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosExternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
