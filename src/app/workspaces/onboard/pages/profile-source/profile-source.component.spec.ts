import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSourceComponent } from './profile-source.component';

describe('ProfileSourceComponent', () => {
  let component: ProfileSourceComponent;
  let fixture: ComponentFixture<ProfileSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
