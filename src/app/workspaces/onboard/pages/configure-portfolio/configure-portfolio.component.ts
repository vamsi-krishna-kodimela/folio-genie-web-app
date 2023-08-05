import { Component, OnDestroy, OnInit } from '@angular/core';
import { OnboardService } from '../../services/onboard/onboard.service';
import { SiteConfig } from 'src/app/shared/types';
import { AuthService } from 'src/app/shared/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-configure-portfolio',
  templateUrl: './configure-portfolio.component.html',
  styleUrls: ['./configure-portfolio.component.scss'],
})
export class ConfigurePortfolioComponent implements OnInit, OnDestroy {
  config: SiteConfig = {
    userId: '',
    favicon: '',
    portfolioHandle: '',
    templateId: '',
    siteTitle: '',
    linkedinId: '',
  };
  subscriptions: Subscription[] = [];
  constructor(
    private authService: AuthService,
    private onboardService: OnboardService
  ) {}
  ngOnInit(): void {
    this.subscriptions.push(this.listenUserChanges());
    this.subscriptions.push(this.listenProceed());
  }

  listenUserChanges() {
    return this.authService.user.value$.subscribe((user) => {
      if (user) {
        this.config.userId = user?._id;
        if (user.profile?.siteConfig) {
          this.config = { ...user.profile.siteConfig };
        }
      }
    });
  }

  listenProceed() {
    return this.onboardService.proceed$.subscribe({
      next: () => this.onboardService.updateSiteConfig(this.config),
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
