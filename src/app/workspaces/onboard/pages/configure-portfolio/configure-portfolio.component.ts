import { Component, OnDestroy, OnInit } from '@angular/core';
import { OnboardService } from '../../services/onboard/onboard.service';
import { SiteConfig } from 'src/app/shared/types';
import { AuthService } from 'src/app/shared/services';
import { Subject, Subscription, debounceTime, map } from 'rxjs';

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

  portfolioHandleListener$: Subject<string> = new Subject<string>();

  isHandleValid: boolean = true;
  handleValidationProgress: boolean = false;

  constructor(
    private authService: AuthService,
    private onboardService: OnboardService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.listenUserChanges());
    this.subscriptions.push(this.listenProceed());
    this.subscriptions.push(this.listenHandleChange());
  }

  validateHandle(handle: string) {
    this.onboardService
      .validatePortfolioHandle(handle)
      .pipe(map((res) => res.isValid))
      .subscribe({
        next: (isValid: boolean) => {
          this.isHandleValid = isValid;
        },
        error: (_) => {
          this.isHandleValid = false;
          this.handleValidationProgress = false;
        },
        complete: () => {
          this.handleValidationProgress = false;
        },
      });
  }

  listenUserChanges() {
    return this.authService.user.value$.subscribe((user) => {
      if (user) {
        this.config.userId = user?._id;
        this.config.siteTitle =
          (user?.profile?.basicDetails?.firstName ?? '') +
          ' ' +
          (user?.profile?.basicDetails?.lastName ?? '');
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

  listenHandleChange() {
    return this.portfolioHandleListener$
      .pipe(debounceTime(600))
      .subscribe(this.validateHandle.bind(this));
  }

  onHandleChange(handle: string) {
    this.isHandleValid = false;
    this.handleValidationProgress = true;
    this.portfolioHandleListener$.next(handle);
  }

  get handleStateIndicator() {
    return this.isHandleValid ? 'check' : 'x';
  }

  get handleStateColor() {
    return this.isHandleValid ? 'green' : 'red';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
