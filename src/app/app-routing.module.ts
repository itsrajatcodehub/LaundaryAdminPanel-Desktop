import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home/dashboard',
    loadChildren: () =>
      import('./home/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'home/notification',
    loadChildren: () =>
      import('./home/notification/notification.module').then(
        (m) => m.NotificationModule
      ),
  },
  {
    path: 'home/orders',
    loadChildren: () =>
      import('./home/orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'home/users',
    loadChildren: () =>
      import('./home/users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
