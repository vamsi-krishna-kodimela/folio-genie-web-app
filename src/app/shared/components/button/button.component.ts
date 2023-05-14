import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() buttonText: string = 'Button';
  @Input() buttonType: 'primary' | 'accent' | 'warn' | '' = '';
  @Input() buttonWidth: string = '212px';
  @Input() buttonDisabled: boolean = false;
  @Input() isOutlined: boolean = true;
}
