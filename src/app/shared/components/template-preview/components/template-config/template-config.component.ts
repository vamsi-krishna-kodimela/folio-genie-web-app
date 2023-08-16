import { Component, Input } from '@angular/core';
import { Section } from '../../interfaces/section.interface';

@Component({
  selector: 'app-template-config',
  templateUrl: './template-config.component.html',
  styleUrls: ['./template-config.component.scss'],
})
export class TemplateConfigComponent {
  openedPanels: number[] = [];
  configurations: Section[] = [
    {
      sectionTitle: 'Portfolio',
      sectionItems: [
        {
          itemTitle: 'Portfolio Name',
          itemType: 'text',
          itemValue: 'My Portfolio',
          itemId: 'portfolio-name',
        },
        {
          itemTitle: 'Portfolio Description',
          itemType: 'text',
          itemValue: 'My Portfolio Description',
          itemId: 'portfolio-description',
        },
      ],
      sectionId: 'portfolio',
    },
    {
      sectionTitle: 'Portfolio Items',
      sectionItems: [
        {
          itemTitle: 'Item Description',
          itemType: 'text',
          itemValue: 'My Item Description',
          itemId: 'item-description',
        },
      ],
      sectionId: 'portfolio-items',
    },
  ];

  toggle: boolean = true;

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
