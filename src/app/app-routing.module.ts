import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./workspaces/common/auth/auth.component').then(
        (m) => m.AuthComponent
      ),
  },
  {
    path: 'onboard',
    loadChildren: () =>
      import('./workspaces/onboard/onboard.module').then(
        (m) => m.OnboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
