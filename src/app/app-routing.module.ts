import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

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
    canActivate: [authGuard],
    loadChildren: () =>
      import('./workspaces/onboard/onboard.module').then(
        (m) => m.OnboardModule
      ),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
