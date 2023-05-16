import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customfield',
  templateUrl: './customfield.component.html',
  styleUrls: ['./customfield.component.scss'],
})
export class CustomfieldComponent {
  @Input()
  label?: string;
  @Input() placeholder: string = '';
  @Input() sufixIcon?: string;
  @Input() sufixIconColor?: string;
}
