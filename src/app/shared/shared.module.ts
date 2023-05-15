import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomfieldComponent } from './components/customfield/customfield.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FeatherModule } from 'angular-feather';
import {
  Camera,
  Heart,
  Github,
  Linkedin,
  Dribbble,
  Circle,
  CheckCircle,
} from 'angular-feather/icons';

const icons = {
  Camera,
  Heart,
  Github,
  Linkedin,
  Dribbble,
  Circle,
  CheckCircle,
};

@NgModule({
  declarations: [CustomfieldComponent, NavbarComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    FeatherModule.pick(icons),
  ],
  exports: [CustomfieldComponent, NavbarComponent, FeatherModule],
})
export class SharedModule {}
