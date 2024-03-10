import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { BasicDetails, SiteConfig, SocialMediaHandle, User } from '../../types';
import { map } from 'rxjs';

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

  fetchSocialHandles() {
    const endpoint = this.endpoint + '/social-handles';
    return this.http.get<SocialMediaHandle[]>(endpoint);
  }
  updateSocialHandles(data: SocialMediaHandle[]) {
    const endpoint = this.endpoint + '/social-handles';
    return this.http.post<SocialMediaHandle[]>(endpoint, data);
  }
  getUserStatus() {
    return this.getUser().pipe(map((data) => data.status));
  }

  getSiteConfig() {
    const endpoint = this.endpoint + '/site-config';
    return this.http.get<SiteConfig>(endpoint);
  }
  updateSiteConfig(data: SiteConfig) {
    const endpoint = this.endpoint + '/site-config';
    return this.http.post<SiteConfig>(endpoint, data);
  }
  validateHandle(handle: string) {
    const endpoint = this.endpoint + '/site-config/validate-handle';
    return this.http.post<{ isValid: boolean }>(endpoint, { handle });
  }

  verifyEmail(token: string) {
    const endpoint = this.endpoint + `/verify-email/${token}`;
    return this.http.get(endpoint);
  }

  resendVerificationEmail() {
    const endpoint = this.endpoint+ '/resend-email-verification';
    return this.http.get(endpoint);
  }
}
