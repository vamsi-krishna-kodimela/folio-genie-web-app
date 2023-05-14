import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardRoutingModule } from './onboard-routing.module';
import { OnboardLayoutComponent } from './components/onboard-layout/onboard-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [OnboardLayoutComponent, GetStartedComponent],
  imports: [CommonModule, OnboardRoutingModule, SharedModule, MatButtonModule],
})
export class OnboardModule {}
