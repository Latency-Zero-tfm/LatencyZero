import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'image-input',
  imports: [],
  templateUrl: './image-input-component.html',
  styleUrl: './image-input-component.css',
})
export class ImageInputComponent {

  // Outputs para comunicar al padre
  imageSelected = output<File>();
  analyzeTriggered = output<File>();
  imageRemoved = output<void>();

  // Signals para el estado
  previewUrl = signal<string | null>(null);
  selectedFile = signal<File | null>(null);
  isDragging = signal<boolean>(false);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  // Manejo de Drag & Drop (opcional pero recomendado UX)
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  private processFile(file: File): void {
    // Validar tipo de imagen si es necesario
    if (!file.type.match(/image\/*/)) return;

    this.selectedFile.set(file);
    this.imageSelected.emit(file);

    // Generar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl.set(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.previewUrl.set(null);
    this.selectedFile.set(null);
    this.imageRemoved.emit();
  }

  onAnalyze(): void {
    const file = this.selectedFile();
    if (file) {
      this.analyzeTriggered.emit(file);
    }
  }

}
