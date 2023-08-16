import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  editorChange: BehaviorSubject<string> = new BehaviorSubject<string>(
    '<h1>Folio Genie</h1>'
  );

  constructor() {}
}
