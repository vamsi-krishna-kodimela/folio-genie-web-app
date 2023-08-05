import { Component, Input } from '@angular/core';
import { Section } from '../../interfaces/section.interface';

@Component({
  selector: 'app-template-config',
  templateUrl: './template-config.component.html',
  styleUrls: ['./template-config.component.scss'],
})
export class TemplateConfigComponent {
  openedPanels: number[] = [];
  @Input() configuration: Section[] = [];
  @Input() toggle: boolean = true;
  toggleConfig() {
    this.toggle = !this.toggle;
  }
  onOpen(index: number) {
    this.openedPanels.push(index);
  }
  onClose(index: number) {
    const position = this.openedPanels.indexOf(index);
    if (position > -1) {
      this.openedPanels.splice(position, 1);
    }
  }
}
