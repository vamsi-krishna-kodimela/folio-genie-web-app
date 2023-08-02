import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { BasicDetails, User } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = environment.host + '/user';
  }
  getUser() {
    return this.http.get<User>(this.endpoint);
  }

  authenticate(email: string, password: string) {
    const endpoint = this.endpoint + '/login';
    return this.http.post<User>(endpoint, {
      email,
      password,
    });
  }

  updateBasicDetails(data: BasicDetails) {
    const endpoint = this.endpoint + '/basic-details';
    return this.http.put<BasicDetails>(endpoint, data);
  }
}
