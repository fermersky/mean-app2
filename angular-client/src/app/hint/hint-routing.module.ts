import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HintCreateComponent } from './hint-create.component';
import { HintUpdateComponent } from './hint-update.component';
import { OnlySigninGuard } from '../core/guards/only-signin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: HintCreateComponent,
        canActivate: [OnlySigninGuard],
      },
      {
        path: 'update',
        component: HintUpdateComponent,
        canActivate: [OnlySigninGuard],
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HintRoutingModule {
  static components = [HintCreateComponent, HintUpdateComponent];
}
