import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardRoutingModule } from './onboard-routing.module';
import { OnboardLayoutComponent } from './components/onboard-layout/onboard-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { MatButtonModule } from '@angular/material/button';
import { ChooseProfessionComponent } from './pages/choose-profession/choose-profession.component';
import { ConnectSocialAccountsComponent } from './pages/connect-social-accounts/connect-social-accounts.component';
import { ConfigurePortfolioComponent } from './pages/configure-portfolio/configure-portfolio.component';
import { ChooseDesignComponent } from './pages/choose-design/choose-design.component';
import { FileUploadFieldComponent } from 'src/app/shared/components/file-upload-field/file-upload-field.component';
import { OnboardService } from './services/onboard/onboard.service';
import { ParseProfileComponent } from './pages/parse-profile/parse-profile.component';

@NgModule({
  declarations: [
    OnboardLayoutComponent,
    GetStartedComponent,
    ChooseProfessionComponent,
    ConnectSocialAccountsComponent,
    ConfigurePortfolioComponent,
    ChooseDesignComponent,
    ParseProfileComponent,
  ],
  imports: [
    CommonModule,
    OnboardRoutingModule,
    SharedModule,
    MatButtonModule,
    FileUploadFieldComponent,
  ],

  providers: [OnboardService],
})
export class OnboardModule {}
