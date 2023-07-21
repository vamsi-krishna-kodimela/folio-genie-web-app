import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../../models';

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

  constructor(private http: HttpClient) {
    this.host = 'https://api.foliogenie.live';
  }

  authenticateUser(email: string, password: string) {
    this.http
      .post<User>(`${this.host}/user/login`, {
        email,
        password,
      })
      .subscribe((res: User) => {
        const token = res.token;
        localStorage.setItem('token', token!);
        delete res.token;
        this.user = res;
      });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.user = undefined;
  }
}
