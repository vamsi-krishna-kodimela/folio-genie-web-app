import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookies: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.authToken}` },
      });
    }

    return next.handle(request);
  }
  get authToken(): string | null {
    return this.cookies.get('token');
  }
}
