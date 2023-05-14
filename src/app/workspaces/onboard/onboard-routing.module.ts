import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardLayoutComponent } from './components/onboard-layout/onboard-layout.component';
import { GetStartedComponent } from './pages/get-started/get-started.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardLayoutComponent,
    children: [
      {
        path: 'get-started',
        component: GetStartedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardRoutingModule {}
