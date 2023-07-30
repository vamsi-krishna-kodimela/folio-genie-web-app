import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

export class HttpModel<T> {
  host: string;
  constructor(route: string, private http: HttpClient) {
    this.host = environment.host + route;
  }
  get(): Observable<T> {
    return this.http.get<T>(this.host);
  }
  create(data: T): Observable<T> {
    return this.http.post<T>(this.host, data);
  }
  update(data: T): Observable<T> {
    return this.http.put<T>(this.host, data);
  }
  delete(): Observable<T> {
    return this.http.delete<T>(this.host);
  }
}
