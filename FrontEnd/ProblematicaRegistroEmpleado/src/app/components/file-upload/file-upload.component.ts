import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="file-upload-container">
      <!-- Área para arrastrar y soltar archivos -->
      <div
        class="drag-drop-area p-6 border-2 border-dashed rounded-lg text-center cursor-pointer"
        [class.border-blue-300]="!isDragging"
        [class.border-blue-500]="isDragging"
        [class.bg-blue-50]="isDragging"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
        (click)="fileInput.click()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p class="mt-2">Arrastra archivos aquí o <span class="text-blue-500">selecciona un archivo</span></p>
        <p class="text-xs text-gray-500 mt-1">{{ allowedFileTypes }}</p>
      </div>

      <!-- Input de archivo oculto -->
      <input
        #fileInput
        type="file"
        class="hidden"
        [accept]="accept"
        (change)="onFileSelected($event)"
      >

      <!-- Mostrar archivo seleccionado -->
      <div *ngIf="selectedFile && !uploading" class="mt-3 p-3 bg-gray-50 rounded flex items-center justify-between">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span class="text-sm truncate max-w-xs">{{ selectedFile.name }}</span>
        </div>
        <button
          (click)="removeFile()"
          class="text-sm text-red-500 hover:text-red-700 focus:outline-none"
        >
          Eliminar
        </button>
      </div>

      <!-- Barra de progreso -->
      <div *ngIf="uploading" class="mt-3">
        <div class="h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            class="h-full bg-blue-500 transition-all duration-300"
            [style.width.%]="progress"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span>Subiendo...</span>
          <span>{{ progress }}%</span>
        </div>
      </div>

      <!-- Botón de subida -->
      <div *ngIf="selectedFile && !uploading" class="mt-3">
        <button
          (click)="uploadFile()"
          class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Subir archivo
        </button>
      </div>

      <!-- Mensaje de error -->
      <div *ngIf="errorMessage" class="mt-3 text-sm text-red-500">
        {{ errorMessage }}
      </div>

      <!-- Mensaje de éxito -->
      <div *ngIf="uploadSuccessful" class="mt-3 text-sm text-green-500">
        El archivo se ha subido correctamente.
      </div>
    </div>
  `,
  styles: [`
    .drag-drop-area {
      transition: all 0.3s ease;
    }
  `]
})
export class FileUploadComponent {
  @Input() accept: string = '.pdf,.doc,.docx,.jpg,.jpeg,.png'; // Tipos de archivo aceptados
  @Input() allowedFileTypes: string = 'Archivos permitidos: PDF, Word, e imágenes';
  @Input() tipoDocumento: string = 'documentos'; // Tipo de documento para la ruta de almacenamiento

  @Output() fileUploaded = new EventEmitter<{url: string, filename: string}>();

  selectedFile: File | null = null;
  uploading: boolean = false;
  progress: number = 0;
  errorMessage: string = '';
  uploadSuccessful: boolean = false;
  isDragging: boolean = false;

  constructor(private fileUploadService: FileUploadService) {}

  // Método para manejar el arrastre sobre el área
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  // Método para manejar cuando el arrastre sale del área
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  // Método para manejar la soltura de archivos arrastrados
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;

    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  // Método para procesar el archivo seleccionado
  private handleFile(file: File): void {
    // Validar el tipo de archivo basado en el input accept
    const acceptedTypes = this.accept.split(',');
    const fileType = `.${file.name.split('.').pop()}`;
    const isAccepted = acceptedTypes.some(type =>
      type === fileType ||
      type === file.type ||
      (type.includes('*') && file.type.startsWith(type.replace('*', '')))
    );

    if (!isAccepted) {
      this.errorMessage = 'Tipo de archivo no permitido';
      this.selectedFile = null;
      return;
    }

    // Validar el tamaño del archivo (5MB como máximo)
    if (file.size > 5 * 1024 * 1024) {
      this.errorMessage = 'El archivo es demasiado grande. El tamaño máximo permitido es 5MB.';
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
    this.errorMessage = '';
    this.uploadSuccessful = false;
  }

  // Método para eliminar el archivo seleccionado
  removeFile(): void {
    this.selectedFile = null;
    this.errorMessage = '';
    this.uploadSuccessful = false;
  }

  // Método para subir el archivo
  uploadFile(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Por favor, selecciona un archivo primero';
      return;
    }

    this.uploading = true;
    this.progress = 0;
    this.errorMessage = '';
    this.uploadSuccessful = false;

    this.fileUploadService.uploadFile(this.selectedFile, this.tipoDocumento)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.uploading = false;
            this.uploadSuccessful = true;
            if (event.body) {
              this.fileUploaded.emit({
                url: event.body.file.url,
                filename: event.body.file.name
              });
            }
          }
        },
        error: (error) => {
          this.uploading = false;
          this.errorMessage = 'Error al subir el archivo: ' + (error.message || 'Inténtalo de nuevo');
          console.error('Error al subir archivo:', error);
        }
      });
  }
}
