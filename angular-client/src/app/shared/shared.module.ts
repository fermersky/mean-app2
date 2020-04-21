import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HintsListComponent } from './hints-list.component';

@NgModule({
  declarations: [HintsListComponent],
  imports: [CommonModule],
  exports: [HintsListComponent],
})
export class SharedModule {}
