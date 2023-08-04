import { Injectable } from '@angular/core';
import { User } from '../../types';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../common/common.service';
import { ReactiveValue } from '../../utils/reactive-value.class';
import { Router } from '@angular/router';
import { UserStatus } from '../../types/user/user-status.enum';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../profile/profile.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: ReactiveValue<User | undefined>;

  constructor(
    private cookies: CookieService,
    private commonService: CommonService,
    private router: Router,
    private toastrService: ToastrService,
    private profileService: ProfileService
  ) {
    this.user = new ReactiveValue<User | undefined>(true);
    this.userListener();
    if (this.authToken) {
      this.getUser();
    }
  }

  userListener() {
    this.user.value$.subscribe((user) => {
      if (user) {
        this.handleUserOnboarding(user.status, user.isProfileCompleted);
      }
    });
  }

  authenticateUser(email: string, password: string) {
    this.commonService.setContentLoader(true);
    this.profileService.authenticate(email, password).subscribe({
      next: (res: User) => {
        const token = res.token;
        this.cookies.set('token', token!);
        delete res.token;
        this.user.value = res;
        this.commonService.setContentLoader(false);
        this.toastrService.success('Logged in successfully');
      },
      error: (err) => {
        this.commonService.setContentLoader(false);
        this.toastrService.error(err.error.message);
      },
    });
  }

  get authToken(): string | null {
    return this.cookies.get('token');
  }

  logout() {
    this.cookies.delete('token');
    this.user.value = undefined;
  }

  getUser() {
    this.commonService.setContentLoader(true);
    this.profileService.getUser().subscribe({
      next: (res: User) => {
        this.user.value = res;
        this.commonService.setContentLoader(false);
      },
      error: (err) => {
        this.commonService.setContentLoader(false);
        this.toastrService.error(err.error.message);
      },
    });
  }
  setUser(data: User) {
    this.user.value = data;
  }

  handleUserOnboarding(status: UserStatus, isParsingDone: boolean) {
    let route = '/onboard/';
    switch (status) {
      case UserStatus.NEW:
        route += 'get-started';
        break;
      case UserStatus.GET_STARTED:
        route += 'choose-profession';
        break;
      case UserStatus.CHOOSE_PROFESSION:
        route += 'connect-social';
        break;
      case UserStatus.CONNECT_SOCIAL:
        route += 'configure-website';
        break;
      case UserStatus.CONFIGURE_WEBSITE:
        route += 'parse-profile';
        break;
      case UserStatus.PARSING:
        if (isParsingDone) {
          route += 'choose-design';
        } else {
          route += 'parse-profile';
        }
        break;
      case UserStatus.CHOOSE_DESIGN:
        route += 'preview';
        break;

      default:
        route = '/';
        break;
    }
    this.router.navigateByUrl(route);
  }

  getUserStatus$(): Observable<UserStatus> {
    return this.user.value$.pipe(
      map((user: User | undefined) => user?.status ?? UserStatus.NEW)
    );
  }

  getUserEmail$(): Observable<string> {
    return this.user.value$.pipe(map((user) => user?.email ?? ''));
  }
}
