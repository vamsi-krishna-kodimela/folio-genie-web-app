import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable()
export class FileUploadService {
  readonly endpoint: string;
  constructor(private http: HttpClient) {
    this.endpoint = `${environment.host}/files`;
  }

  uploadFile(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(this.endpoint, formData);
  }
}
