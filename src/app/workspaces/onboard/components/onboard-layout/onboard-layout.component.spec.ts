import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardLayoutComponent } from './onboard-layout.component';

describe('OnboardLayoutComponent', () => {
  let component: OnboardLayoutComponent;
  let fixture: ComponentFixture<OnboardLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnboardLayoutComponent]
    });
    fixture = TestBed.createComponent(OnboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
