import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../types';
import { environment } from 'src/environment/environment';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../common/common.service';
import { ReactiveValue } from '../../utils/reactive-value.class';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly host: string;
  private user: ReactiveValue<User | undefined>;

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private commonService: CommonService
  ) {
    this.host = environment.host;
    this.user = new ReactiveValue<User | undefined>();
  }

  authenticateUser(email: string, password: string) {
    this.commonService.setContentLoader(true);
    this.http
      .post<User>(`${this.host}/user/login`, {
        email,
        password,
      })
      .subscribe({
        next: (res: User) => {
          const token = res.token;
          this.cookies.set('token', token!);
          delete res.token;
          this.user.value = res;
          this.commonService.setContentLoader(false);
        },
        error: (err) => {
          this.commonService.setContentLoader(false);
        },
      });
  }

  getToken(): string | null {
    return this.cookies.get('token');
  }

  logout() {
    this.cookies.delete('token');
    this.user.value = undefined;
  }
}
