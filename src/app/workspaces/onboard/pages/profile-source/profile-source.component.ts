import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FileUploadFieldComponent } from 'src/app/shared/components/file-upload-field/file-upload-field.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-profile-source',
  standalone: true,
  imports: [SharedModule, CommonModule, FileUploadFieldComponent],
  templateUrl: './profile-source.component.html',
  styleUrl: './profile-source.component.scss',
})
export class ProfileSourceComponent {
  profileSources: { icon: string; displayValue: string; sourceCode: string }[] =
    [
      { icon: 'linkedin', displayValue: 'Linkedin', sourceCode: 'LINKEDIN' },
      // { icon: 'github', displayValue: 'Github', sourceCode: 'GITHUB' },
      { icon: 'file-text', displayValue: 'Resume', sourceCode: 'RESUME' },
    ];
  selectedProfileSource?: string;

  selectSource(sourceCode: string): void {
    this.selectedProfileSource = sourceCode;
  }
}
