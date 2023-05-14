import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseProfessionComponent } from './choose-profession.component';

describe('ChooseProfessionComponent', () => {
  let component: ChooseProfessionComponent;
  let fixture: ComponentFixture<ChooseProfessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseProfessionComponent]
    });
    fixture = TestBed.createComponent(ChooseProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
