import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParseProfileComponent } from './parse-profile.component';

describe('ParseProfileComponent', () => {
  let component: ParseProfileComponent;
  let fixture: ComponentFixture<ParseProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParseProfileComponent]
    });
    fixture = TestBed.createComponent(ParseProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
