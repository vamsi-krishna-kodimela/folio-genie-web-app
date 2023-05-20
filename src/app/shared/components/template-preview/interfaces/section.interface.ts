import { SectionItem } from './section-item.interface';

export interface Section {
  sectionTitle: string;
  sectionItems: SectionItem[];
  sectionId: string;
}
