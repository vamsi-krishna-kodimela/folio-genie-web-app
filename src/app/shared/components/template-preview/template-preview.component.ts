import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { MatButtonModule } from '@angular/material/button';
import { Section } from './interfaces/section.interface';

@Component({
  selector: 'app-template-preview',
  standalone: true,
  imports: [CommonModule, SharedModule, MatButtonModule],
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.scss'],
})
export class TemplatePreviewComponent {
  config: Section[] = [
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
          itemTitle: 'Item Name',
          itemType: 'text',
          itemValue: 'My Item',
          itemId: 'item-name',
        },
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
}
