import { TestBed } from '@angular/core/testing';

import { TemplatePreviewService } from './template-preview.service';

describe('TemplatePreviewService', () => {
  let service: TemplatePreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplatePreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
