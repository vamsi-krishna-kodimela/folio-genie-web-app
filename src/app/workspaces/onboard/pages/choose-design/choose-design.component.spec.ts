import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDesignComponent } from './choose-design.component';

describe('ChooseDesignComponent', () => {
  let component: ChooseDesignComponent;
  let fixture: ComponentFixture<ChooseDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseDesignComponent]
    });
    fixture = TestBed.createComponent(ChooseDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
