import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HintRoutingModule } from './hint-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HintUpdateComponent } from './hint-update.component';

@NgModule({
  declarations: [HintRoutingModule.components],
  imports: [CommonModule, SharedModule, HintRoutingModule],
})
export class HintModule {}
