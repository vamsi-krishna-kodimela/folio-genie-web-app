import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input('value') _value: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  get value(): string {
    return this._value;
  }

  set value(v: string) {
    this._value = v;
    this.valueChange.emit(this._value);
  }
}
