import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HintCreateComponent } from './hint-create.component';

const routes: Routes = [{ path: 'create', component: HintCreateComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HintRoutingModule {
  static components = [HintCreateComponent];
}
