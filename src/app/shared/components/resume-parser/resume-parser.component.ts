import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DndDirective } from '../../directives/dnd.directive';
import { SharedModule } from '../../shared.module';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-resume-parser',
  standalone: true,
  imports: [CommonModule, DndDirective, SharedModule],
  templateUrl: './resume-parser.component.html',
  styleUrl: './resume-parser.component.scss',
})
export class ResumeParserComponent {
  constructor(private dialogRef: DialogRef<ResumeParserComponent>) {}
  closeDialog() {
    this.dialogRef.close();
  }
}
