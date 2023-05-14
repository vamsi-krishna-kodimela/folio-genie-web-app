import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurePortfolioComponent } from './configure-portfolio.component';

describe('ConfigurePortfolioComponent', () => {
  let component: ConfigurePortfolioComponent;
  let fixture: ComponentFixture<ConfigurePortfolioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurePortfolioComponent]
    });
    fixture = TestBed.createComponent(ConfigurePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
