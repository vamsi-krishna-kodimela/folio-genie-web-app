import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, SharedModule, MatButtonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService) {}

  authenticateUser(event: Event) {
    this.authService.authenticateUser(this.email, this.password);
    event.preventDefault();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
