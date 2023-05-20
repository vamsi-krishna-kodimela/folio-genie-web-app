import { Component, Input } from '@angular/core';
import { Section } from '../../interfaces/section.interface';

@Component({
  selector: 'app-template-config',
  templateUrl: './template-config.component.html',
  styleUrls: ['./template-config.component.scss'],
})
export class TemplateConfigComponent {
  @Input() configuration: Section[] = [];
  @Input() toggle: boolean = false;
  toggleConfig() {
    this.toggle = !this.toggle;
  }
}
