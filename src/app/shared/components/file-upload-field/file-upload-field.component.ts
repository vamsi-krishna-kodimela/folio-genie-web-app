import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { DndDirective } from '../../directives/dnd.directive';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-upload-field',
  standalone: true,
  imports: [CommonModule, SharedModule, DndDirective],
  templateUrl: './file-upload-field.component.html',
  styleUrls: ['./file-upload-field.component.scss'],
  providers: [FileUploadService],
})
export class FileUploadFieldComponent {
  isUploading: boolean = false;

  @Input() label: string = '';
  @Input('fileUrl') _fileUrl?: string;
  set fileUrl(value: string | undefined) {
    this._fileUrl = value;
    this.fileUrlChange.emit(this._fileUrl);
  }

  get fileUrl(): string | undefined {
    return this._fileUrl;
  }
  @Output() fileUrlChange: EventEmitter<string | undefined> = new EventEmitter<
    string | undefined
  >();

  constructor(
    private fileUploadService: FileUploadService,
    private toastrService: ToastrService
  ) {}

  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      this.isUploading = true;
      this.fileUploadService.uploadFile(file).subscribe({
        next: (res) => {
          this.fileUrl = res.url;
        },
        error: (err) => {
          this.toastrService.error(err.error.message);
        },
        complete: () => {
          this.isUploading = false;
        },
      });
    }
  }
}
