import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { MaterialModule } from '../material/material.module';
import { ProfileHintsComponent } from './profile/profile-hints.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AccountRoutingModule.components, ProfileHintsComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class AccountModule {}
