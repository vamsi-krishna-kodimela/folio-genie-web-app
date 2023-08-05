import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardLayoutComponent } from './components/onboard-layout/onboard-layout.component';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { ChooseProfessionComponent } from './pages/choose-profession/choose-profession.component';
import { ConnectSocialAccountsComponent } from './pages/connect-social-accounts/connect-social-accounts.component';
import { ConfigurePortfolioComponent } from './pages/configure-portfolio/configure-portfolio.component';
import { ChooseDesignComponent } from './pages/choose-design/choose-design.component';
import { DashboardLayoutComponent } from 'src/app/shared/components/dashboard-layout/dashboard-layout.component';
import { ParseProfileComponent } from './pages/parse-profile/parse-profile.component';
import { onboardGuard } from './guards/onboard.guard';

const routes: Routes = [
  {
    path: 'preview',
    component: DashboardLayoutComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import(
            '../../shared/components/template-preview/template-preview.component'
          ).then((m) => m.TemplatePreviewComponent),
      },
      {
        path: '**',
        redirectTo: '/dashboard',
      },
    ],
  },
  {
    path: 'parse-profile',
    component: DashboardLayoutComponent,
    children: [{ component: ParseProfileComponent, path: '' }],
  },
  {
    path: '',
    component: OnboardLayoutComponent,
    canActivate: [onboardGuard],
    children: [
      {
        path: 'get-started',
        component: GetStartedComponent,
      },
      {
        path: 'choose-profession',
        component: ChooseProfessionComponent,
      },
      {
        path: 'connect-social',
        component: ConnectSocialAccountsComponent,
      },
      {
        path: 'configure-website',
        component: ConfigurePortfolioComponent,
      },
      {
        path: 'choose-design',
        component: ChooseDesignComponent,
      },
      {
        path: '**',
        redirectTo: '/onboard/get-started',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardRoutingModule {}
