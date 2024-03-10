import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomfieldComponent } from './components/customfield/customfield.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FeatherModule } from 'angular-feather';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  Camera,
  Heart,
  Github,
  Linkedin,
  Dribbble,
  Circle,
  CheckCircle,
  Loader,
  Check,
  X,
  Eye,
  EyeOff,
  Upload,
  Smartphone,
  Monitor,
  Tablet,
  Settings,
  ChevronDown,
  ChevronUp,
  FileText,
} from 'angular-feather/icons';
import { TemplateConfigComponent } from './components/template-preview/components/template-config/template-config.component';
import { FormsModule } from '@angular/forms';
import { GlobalLoaderComponent } from './components/global-loader/global-loader.component';

const icons = {
  Camera,
  Heart,
  Github,
  Linkedin,
  Dribbble,
  Circle,
  CheckCircle,
  Loader,
  Check,
  X,
  Eye,
  Upload,
  Smartphone,
  Monitor,
  Tablet,
  Settings,
  ChevronDown,
  ChevronUp,
  EyeOff,
  FileText,
};

@NgModule({
  declarations: [
    CustomfieldComponent,
    NavbarComponent,
    TemplateConfigComponent,
    GlobalLoaderComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    FeatherModule.pick(icons),
    MatExpansionModule,
    FormsModule,
    MatDialogModule,
  ],
  exports: [
    CustomfieldComponent,
    NavbarComponent,
    FeatherModule,
    TemplateConfigComponent,
  ],
})
export class SharedModule {}
