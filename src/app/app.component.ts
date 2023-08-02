import { Component } from '@angular/core';
import { AuthService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'folio-genie-web-app';
  constructor(private authService: AuthService) {}
}
