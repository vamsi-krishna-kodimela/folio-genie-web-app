import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../../models';
import { environment } from 'src/environment/environment';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly host: string;

  private _user?: User;
  private _user$ = new Subject<User | undefined>();
  get user(): User | undefined {
    return this._user;
  }

  get user$(): Observable<User | undefined> {
    return this._user$.asObservable();
  }
  set user(value: User | undefined) {
    this._user = value;
    this._user$.next(value);
  }

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private commonService: CommonService
  ) {
    this.host = environment.host;
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
          this.user = res;
          this.commonService.setContentLoader(false);
        },
        error: (err) => {
          // ToDo: Handle error
          this.commonService.setContentLoader(false);
        },
      });
  }

  getToken(): string | null {
    return this.cookies.get('token');
  }

  logout() {
    this.cookies.delete('token');
    this.user = undefined;
  }
}
