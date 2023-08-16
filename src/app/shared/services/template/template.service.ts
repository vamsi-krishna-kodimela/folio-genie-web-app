import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  readonly endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = environment.host + '/templates';
  }

  getTemplates() {
    return this.http.get(this.endPoint);
  }

  getTemplateById(id: string) {
    return this.http.get(this.endPoint + '/' + id);
  }

  createTemplate(template: any) {
    return this.http.post(this.endPoint, template);
  }

  updateTemplate(template: any) {
    return this.http.put(this.endPoint + '/' + template.id, template);
  }

  deleteTemplate(id: string) {
    return this.http.delete(this.endPoint + '/' + id);
  }
}
