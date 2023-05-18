import { Directive, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appDnd]',
  standalone: true,
})
export class DndDirective {
  fileEmitter: EventEmitter<File[]> = new EventEmitter<File[]>();
  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Drop listener
  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files) {
      this.fileEmitter.emit(Array.from(files));
    }
  }
}
