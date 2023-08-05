import { Component, OnDestroy, OnInit } from '@angular/core';
import { SOCIAL_ACCOUNTS } from '../../data/social-accounts.data';
import { OnboardService } from '../../services/onboard/onboard.service';
import { SocialMediaHandle } from 'src/app/shared/types';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-connect-social-accounts',
  templateUrl: './connect-social-accounts.component.html',
  styleUrls: ['./connect-social-accounts.component.scss'],
})
export class ConnectSocialAccountsComponent implements OnInit, OnDestroy {
  handles: SocialMediaHandle[] = [];
  subscriptions: Subscription[] = [];
  constructor(
    private onboardService: OnboardService,
    private toastr: ToastrService
  ) {
    this.handles = [...SOCIAL_ACCOUNTS];
  }
  ngOnInit(): void {
    this.subscriptions.push(this.fetchHandles());
    this.subscriptions.push(this.listenProceed());
  }

  fetchHandles() {
    return this.onboardService.fetchSocialHandles().subscribe((res) => {
      this.handles.forEach((handle) => {
        handle.link =
          res.find((item) => handle.handle == item.handle)?.link ?? '';
      });
    });
  }

  listenProceed() {
    return this.onboardService.proceed$.subscribe(this.saveHandles.bind(this));
  }

  saveHandles() {
    const isValid = this.validateData();
    if (!isValid) {
      this.toastr.error('Please provide all the required information');
      return;
    }
    const payload = this.sanitizePayload();
    this.onboardService.updateSocialHandles(payload);
  }
  sanitizePayload() {
    return this.handles.filter((handle) => handle.link != '');
  }
  validateData() {
    return !this.handles.some(
      (handle) => handle.isChecked && handle.link == ''
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
