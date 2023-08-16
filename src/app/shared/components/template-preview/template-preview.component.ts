import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { MatButtonModule } from '@angular/material/button';
import { Section } from './interfaces/section.interface';
import { TemplateEditorComponent } from 'src/app/template-editor/template-editor.component';

@Component({
  selector: 'app-template-preview',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    TemplateEditorComponent,
  ],
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.scss'],
})
export class TemplatePreviewComponent {

}
