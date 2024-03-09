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
        this.handleUserOnboarding(user.status);
      }
    });
  }

  authenticateUser(email: string, password: string) {
    if (!this.validateEmail(email) || !this.validatePassword(password)) return;
    this.commonService.setContentLoader(true);
    this.profileService.authenticate(email, password).subscribe({
      next: (res: User) => {
        const token = res.token;
        this.cookies.set('token', token!);
        delete res.token;
        this.user.value = res;
        this.toastrService.success('Logged in successfully!');
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
      },
      complete: () => {
        this.commonService.setContentLoader(false);
      },
    });
  }

  validateEmail(email: string) {
    if (!email) {
      this.toastrService.error('Email is required!');
      return false;
    }
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      this.toastrService.error('Invalid email!');
      return false;
    }
    return true;
  }

  validatePassword(password: string) {
    if (!password) {
      this.toastrService.error('Password is required!');
      return false;
    }
    if (password.length < 8) {
      this.toastrService.error('Password must be at least 8 characters long!');
      return false;
    }
    if (!password.match(/[a-z]/)) {
      this.toastrService.error(
        'Password must contain at least one lowercase letter!'
      );
      return false;
    }
    if (!password.match(/[A-Z]/)) {
      this.toastrService.error(
        'Password must contain at least one uppercase letter!'
      );
      return false;
    }
    if (!password.match(/[0-9]/)) {
      this.toastrService.error('Password must contain at least one number!');
      return false;
    }
    if (!password.match(/[^a-zA-Z0-9]/)) {
      this.toastrService.error(
        'Password must contain at least one special character!'
      );
      return false;
    }

    return true;
  }

  get authToken(): string | null {
    return this.cookies.get('token');
  }

  logout() {
    this.cookies.deleteAll();
    this.user.value = undefined;
    this.router.navigateByUrl('/');
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

  handleUserOnboarding(status: UserStatus, navigate: boolean = true) {
    let route = '/onboard/';
    switch (status) {
      case UserStatus.NEW:
        route += 'get-started';
        break;
      case UserStatus.GET_STARTED:
        route += 'choose-profession';
        break;
      case UserStatus.CHOOSE_PROFESSION:
        route += 'configure-website';
        break;
      case UserStatus.CONFIGURE_WEBSITE:
        route += 'parse-source';
        break;
      case UserStatus.PARSING_SOURCE:
      case UserStatus.PARSING:
        route += 'parse-profile';
        break;
      case UserStatus.PARSING_DONE:
        route += 'choose-design';
        break;
      case UserStatus.CHOOSE_DESIGN:
        route += 'preview/' + this.user.value?.profile.siteConfig.templateId;
        break;

      default:
        route = '/';
        break;
    }
    if (navigate) {
      this.router.navigateByUrl(route);
    }
    return route;
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
