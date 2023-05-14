import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectSocialAccountsComponent } from './connect-social-accounts.component';

describe('ConnectSocialAccountsComponent', () => {
  let component: ConnectSocialAccountsComponent;
  let fixture: ComponentFixture<ConnectSocialAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectSocialAccountsComponent]
    });
    fixture = TestBed.createComponent(ConnectSocialAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
