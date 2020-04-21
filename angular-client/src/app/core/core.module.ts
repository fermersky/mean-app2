import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { FooterComponent } from './footer/footer.component';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { HintsService } from './services/hints.service';

import { MaterialModule } from '../material/material.module';
import { EnsureModuleLoadedOnceGuard } from './guards/ensure-module-loaded-once.guard';
import { OnlySigninGuard } from './guards/only-signin.guard';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MainContainerComponent],
  imports: [CommonModule, RouterModule, HttpClientModule, MaterialModule],
  exports: [
    HeaderComponent,
    RouterModule,
    FooterComponent,
    MainContainerComponent,
  ],
  providers: [AuthService, UsersService, HintsService, OnlySigninGuard],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}