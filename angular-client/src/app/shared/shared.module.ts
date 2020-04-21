import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HintsListComponent } from './hints-list.component';
import { MaterialModule } from '../material/material.module';
import { HintsFilterComponent } from './hints-filter.component';

@NgModule({
  declarations: [HintsListComponent, HintsFilterComponent],
  imports: [CommonModule, MaterialModule],
  exports: [HintsListComponent, HintsFilterComponent],
})
export class SharedModule {}
