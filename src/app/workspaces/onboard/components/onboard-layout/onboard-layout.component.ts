import { Component, OnInit } from '@angular/core';
import { OnboardStep } from '../../types/onboard-step.interface';
import { ONBOARD_STEPS } from '../../data/onboars-steps.data';
import { AuthService } from 'src/app/shared/services';
import { User } from 'src/app/shared/types';
import { Observable } from 'rxjs';
import { UserStatus } from 'src/app/shared/types/user/user-status.enum';
import { OnboardService } from '../../services/onboard/onboard.service';

@Component({
  selector: 'app-onboard-layout',
  templateUrl: './onboard-layout.component.html',
  styleUrls: ['./onboard-layout.component.scss'],
})
export class OnboardLayoutComponent implements OnInit {
  steps: OnboardStep[];
  activeStep$: Observable<number>;
  constructor(private onboardService: OnboardService) {
    this.steps = onboardService.onboardSteps;
    this.activeStep$ = onboardService.activeStep$;
  }
  ngOnInit(): void {}

  onProceed() {
    this.onboardService.proceed$.next();
  }
}
