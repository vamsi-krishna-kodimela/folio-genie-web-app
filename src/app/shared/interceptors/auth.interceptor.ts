import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
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

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          this.cookies.deleteAll();
          location.href = '/';
          return of(error.message);
        }
        return throwError(() => error);
      })
    );
  }
  get authToken(): string | null {
    return this.cookies.get('token');
  }
}
