import { Component } from '@angular/core';
import { OnboardService } from '../../services/onboard/onboard.service';
import { SiteConfig } from 'src/app/shared/types';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-configure-portfolio',
  templateUrl: './configure-portfolio.component.html',
  styleUrls: ['./configure-portfolio.component.scss'],
})
export class ConfigurePortfolioComponent {
  config: SiteConfig = {
    userId: '',
    favicon: '',
    portfolioHandle: '',
    templateId: '',
    siteTitle: '',
    linkedinId: '',
  };
  constructor(
    private authService: AuthService,
    private onboardService: OnboardService
  ) {}
  ngOnInit(): void {
    this.authService.user.value$.subscribe((user) => {
      if (user) {
        this.config.userId = user?._id;
        if (user.profile?.siteConfig) {
          this.config = { ...user.profile.siteConfig };
        }
      }
    });
    this.onboardService.proceed$.subscribe(() => {
      this.onboardService.updateSiteConfig(this.config);
    });
  }
}
