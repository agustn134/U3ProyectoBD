// import { CommonModule } from '@angular/common';
// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-document-viewer',
//   imports: [CommonModule],
//   templateUrl: './document-viewer.component.html',
//   styleUrl: './document-viewer.component.css'
// })
// export class DocumentViewerComponent {
//   @Input() documentUrl: string = ''; // Añade este decorador @Input
// }






















// import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// @Component({
//   selector: 'app-document-viewer',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div *ngIf="documentUrl">
//       <iframe [src]="safeDocumentUrl" class="w-full h-96" frameborder="0"></iframe>
//     </div>
//     <div *ngIf="!documentUrl" class="text-gray-500 text-center">
//       No hay documento disponible
//     </div>
//   `
// })
// export class DocumentViewerComponent {
//   @Input() documentUrl: string = '';
//   safeDocumentUrl: SafeResourceUrl;

//   constructor(private sanitizer: DomSanitizer) {
//     // Inicializar con una URL vacía segura
//     this.safeDocumentUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
//   }

//   ngOnChanges() {
//     if (this.documentUrl) {
//       const fullUrl = `http://localhost:5000${this.documentUrl}`;
//       this.safeDocumentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
//     }
//   }
// }










import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="documentUrl">
      <iframe [src]="safeDocumentUrl" class="w-full h-96" frameborder="0"></iframe>
    </div>
    <div *ngIf="!documentUrl" class="text-gray-500 text-center">
      No hay documento disponible
    </div>
  `
})
export class DocumentViewerComponent implements OnChanges {
  @Input() documentUrl: string = '';
  safeDocumentUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    if (this.documentUrl) {
      // Construye la URL completa
      const fullUrl = `/uploads/cursos/${this.documentUrl}`;
      this.safeDocumentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
    }
  }
}
