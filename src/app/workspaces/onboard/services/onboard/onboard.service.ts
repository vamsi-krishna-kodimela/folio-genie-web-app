import { Injectable } from '@angular/core';
import { Observable, Subject, map, mergeMap } from 'rxjs';
import { AuthService } from 'src/app/shared/services';
import {
  BasicDetails,
  Profession,
  SiteConfig,
  SocialMediaHandle,
  User,
} from 'src/app/shared/types';
import { OnboardStep } from '../../types/onboard-step.interface';
import { ONBOARD_STEPS } from '../../data/onboars-steps.data';
import { UserStatus } from 'src/app/shared/types/user/user-status.enum';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { PROFESSIONS } from '../../data/professions.data';

@Injectable()
export class OnboardService {
  proceed$: Subject<void> = new Subject<void>();
  userStatus$: Observable<UserStatus>;
  profile$: Observable<User | undefined>;
  onboardSteps: OnboardStep[] = [];
  professions: Profession[] = [];
  activeStep$: Observable<number>;
  userEmail$: Observable<string>;
  userProfession$: Observable<string>;
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private commonService: CommonService
  ) {
    this.profile$ = authService.user.value$;
    this.userStatus$ = authService.getUserStatus$();
    this.activeStep$ = this.fetchActiveStep();
    this.userEmail$ = authService.getUserEmail$();
    this.userProfession$ = this.getProfessionData();
    this.setOnboardSteps();
    this.setProfessions();
  }

  setOnboardSteps() {
    this.onboardSteps = [...ONBOARD_STEPS];
  }

  setProfessions() {
    this.professions = [...PROFESSIONS];
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
        return {
          firstName: user?.profile?.basicDetails?.firstName ?? '',
          lastName: user?.profile?.basicDetails?.lastName ?? '',
          profilePic:
            user?.profile?.basicDetails?.profilePic ??
            'https://placehold.co/400x400/png',
        };
      })
    );
  }

  getProfessionData() {
    return this.profile$.pipe(
      map((user) => user?.profile?.basicDetails?.profession ?? '')
    );
  }

  updateBasicDetails(data: Partial<BasicDetails>) {
    const payload: BasicDetails = {
      ...this.authService.user.value!.profile!.basicDetails,
      ...data,
    };
    this.commonService.setContentLoader(true);
    this.profileService
      .updateBasicDetails(payload)
      .pipe(mergeMap((data) => this.mapUserStatus()))
      .subscribe({
        next: (res) => {
          const user = { ...res };
          this.authService.setUser(user);
          this.commonService.setContentLoader(false);
        },
        error: (err) => {
          this.commonService.setContentLoader(false);
        },
      });
  }

  fetchSocialHandles() {
    return this.profileService.fetchSocialHandles();
  }
  updateSocialHandles(data: SocialMediaHandle[]) {
    this.commonService.setContentLoader(true);
    this.profileService
      .updateSocialHandles(data)
      .pipe(mergeMap((handles) => this.mapUserStatus()))
      .subscribe({
        next: (res) => {
          const user = { ...res };
          this.authService.setUser(user);
          this.commonService.setContentLoader(false);
        },
        error: (err) => {
          this.commonService.setContentLoader(false);
        },
      });
  }

  fetchSiteConfig() {
    return this.profileService.getSiteConfig();
  }

  updateSiteConfig(data: SiteConfig) {
    this.commonService.setContentLoader(true);
    data.linkedinId =
      this.authService.user.value!.profile!.socialMediaHandles.find(
        (handle) => handle.handle == 'linkedin'
      )!.link;
    this.profileService
      .updateSiteConfig(data)
      .pipe(mergeMap((config) => this.mapUserStatus()))
      .subscribe({
        next: (res) => {
          const user = { ...res };
          this.authService.setUser(user);
          this.commonService.setContentLoader(false);
          this.parseProfile();
        },
        error: (err) => {
          this.commonService.setContentLoader(false);
        },
      });
  }

  mapUserStatus(): Observable<User> {
    return this.profileService.getUser().pipe(
      map((profile) => {
        return profile;
      })
    );
  }
  parseProfile() {
    this.profileService
      .parseProfile()
      .pipe(mergeMap((data) => this.mapUserStatus()))
      .subscribe({
        next: (res) => {
          const user = { ...res };
          this.authService.setUser(user);
        },
        error: (err) => {
          // Handle error
        },
      });
  }
}
