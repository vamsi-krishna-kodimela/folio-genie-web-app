import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { User } from 'src/app/shared/types';
import { OnboardService } from '../../onboard/services/onboard/onboard.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, SharedModule],
  providers: [OnboardService],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent implements OnInit {

  verificationToken?: string;
  userEmail$: Observable<string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    onboardService: OnboardService,
    private authService: AuthService
  ) {
    this.userEmail$ = onboardService.userEmail$;
  }
  ngOnInit() {
    this.verificationToken = this.activatedRoute.snapshot.params['token'];
    if (this.verificationToken) {
      this.validateEmail();
    }
  }

  validateEmail() {
    this.authService.verifyEmail(this.verificationToken!);
  }

  resendVerificationEmail() {
    this.authService.resendVerificationEmail();
  }
}
