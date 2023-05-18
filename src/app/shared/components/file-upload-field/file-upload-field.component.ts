import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { DndDirective } from '../../directives/dnd.directive';

@Component({
  selector: 'app-file-upload-field',
  standalone: true,
  imports: [CommonModule, SharedModule, DndDirective],
  templateUrl: './file-upload-field.component.html',
  styleUrls: ['./file-upload-field.component.scss'],
})
export class FileUploadFieldComponent {
  @Input() label: string = '';
}
