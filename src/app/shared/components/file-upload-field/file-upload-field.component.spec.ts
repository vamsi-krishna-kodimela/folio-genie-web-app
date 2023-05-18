import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadFieldComponent } from './file-upload-field.component';

describe('FileUploadFieldComponent', () => {
  let component: FileUploadFieldComponent;
  let fixture: ComponentFixture<FileUploadFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FileUploadFieldComponent]
    });
    fixture = TestBed.createComponent(FileUploadFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
