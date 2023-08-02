import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { AuthService } from 'src/app/shared/services';
import { BasicDetails, User } from 'src/app/shared/types';
import { OnboardStep } from '../../types/onboard-step.interface';
import { ONBOARD_STEPS } from '../../data/onboars-steps.data';
import { UserStatus } from 'src/app/shared/types/user/user-status.enum';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Injectable()
export class OnboardService {
  proceed$: Subject<void> = new Subject<void>();
  userStatus$: Observable<UserStatus>;
  profile$: Observable<User | undefined>;
  onboardSteps: OnboardStep[] = [];
  activeStep$: Observable<number>;
  userEmail$: Observable<string>;
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private commonService: CommonService
  ) {
    this.profile$ = authService.user.value$;
    this.userStatus$ = authService.getUserStatus$();
    this.activeStep$ = this.fetchActiveStep();
    this.userEmail$ = authService.getUserEmail$();
    this.setOnboardSteps();
  }

  setOnboardSteps() {
    this.onboardSteps = [...ONBOARD_STEPS];
  }
  fetchActiveStep() {
    return this.userStatus$.pipe(
      map((status: UserStatus) => {
        const activeStep = this.onboardSteps.findIndex((step) =>
          step.group.includes(status)
        );
        return activeStep;
      })
    );
  }

  getStartedData() {
    return this.profile$.pipe(
      map((user) => {
        if (user) {
          return {
            firstName: user.profile.basicDetails.firstName ?? '',
            lastName: user.profile.basicDetails.lastName ?? '',
            profilePic:
              user.profile.basicDetails.profilePic ??
              '"https://foliogenie.live/assets/images/landing-page/header-section.svg',
          };
        }
        return {
          firstName: '',
          lastName: '',
          profilePic: '',
        };
      })
    );
  }

  updateBasicDetails(data: Partial<BasicDetails>) {
    const payload: BasicDetails = {
      ...this.authService.user.value!.profile!.basicDetails,
      ...data,
    };
    this.commonService.setContentLoader(true);
    this.profileService.updateBasicDetails(payload).subscribe({
      next: (res) => {
        const user = this.authService.user.value!;
        user.profile!.basicDetails = res;
        this.authService.setUser(user);
        this.commonService.setContentLoader(false);
      },
      error: (err) => {
        this.commonService.setContentLoader(false);
      },
    });
  }
}
