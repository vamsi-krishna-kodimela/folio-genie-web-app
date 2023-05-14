import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomfieldComponent } from './components/customfield/customfield.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [CustomfieldComponent, NavbarComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
  ],
  exports: [CustomfieldComponent, NavbarComponent],
})
export class SharedModule {}
