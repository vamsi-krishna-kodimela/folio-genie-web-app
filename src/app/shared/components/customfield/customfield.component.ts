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
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() type: 'text' | 'email' | 'number' | 'password' = 'text';
  @Input('value') _value: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() sufixIconClick: EventEmitter<void> = new EventEmitter<void>();

  get value(): string {
    return this._value;
  }

  set value(v: string) {
    this._value = v;
    this.valueChange.emit(this._value);
  }

  onSufixIconClick() {
    this.sufixIconClick.emit();
  }
}
