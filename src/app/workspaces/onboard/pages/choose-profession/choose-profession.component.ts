import { Component } from '@angular/core';

@Component({
  selector: 'app-choose-profession',
  templateUrl: './choose-profession.component.html',
  styleUrls: ['./choose-profession.component.scss'],
})
export class ChooseProfessionComponent {
  selectedProfession: string = '';
  professions: Profession[] = [
    {
      id: 'developer',
      title: 'Developer',
      image: 'developer.svg',
    },
    {
      id: 'designer',
      title: 'Designer',
      image: 'designer.svg',
    },
    {
      id: 'other',
      title: 'Other',
      image: 'other.svg',
    },
  ];
  getProfessionImage(profession: Profession): string {
    return `url(/assets/images/professions/${profession.image})`;
  }
  selectProfession(profession: Profession): void {
    this.selectedProfession = profession.id;
  }
}

interface Profession {
  title: string;
  id: string;
  image: string;
}
