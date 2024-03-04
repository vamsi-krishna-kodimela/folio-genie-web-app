import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  private readonly endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.host}/user/parser`;
  }

  parseProfile() {
    const endpoint = this.endpoint + '/linkedin';
    return this.http.get(endpoint);
  }

  getParserStatus() {
    const endpoint = this.endpoint + '/status';
    return this.http.get<{
      _id: string;
      isJobDone: boolean;
      userId: string;
      handle: string;
      handleType: string;
      status: string;
    }>(endpoint);
  }
}
