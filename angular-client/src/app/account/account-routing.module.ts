import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { OnlySigninGuard } from '../core/guards/only-signin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [OnlySigninGuard],
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {
  static components = [RegisterComponent, ProfileComponent, LoginComponent];
}
