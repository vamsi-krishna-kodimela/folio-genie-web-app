import { BehaviorSubject, Observable, Subject } from 'rxjs';

class ReactiveValue<T> {
  private _value$: BehaviorSubject<T> | Subject<T>;
  private _value?: T;

  get value$(): Observable<T> {
    return this._value$.asObservable();
  }

  get value(): T | undefined {
    return this._value;
  }

  set value(value: T | undefined) {
    this._value = value;
    this._value$.next(value!);
  }

  constructor(defaultValue?: T) {
    if (defaultValue != undefined) {
      this._value = defaultValue;
      this._value$ = new BehaviorSubject<T>(defaultValue);
    } else {
      this._value$ = new Subject<T>();
    }
  }
}

export { ReactiveValue };
