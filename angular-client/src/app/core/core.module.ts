// angular stuff
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// components
import { HeaderComponent } from './header/header.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { FooterComponent } from './footer/footer.component';
import { OverlayComponent } from './overlay/overlay.component';

// services
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { HintsService } from './services/hints.service';
import { HintStorageService } from './services/hints-storage.service';

// modules
import { MaterialModule } from '../material/material.module';

// guards
import { EnsureModuleLoadedOnceGuard } from './guards/ensure-module-loaded-once.guard';
import { OnlySigninGuard } from './guards/only-signin.guard';

// interceptors
import { HttpLoggerInterceptor } from './interceptors/http-logger.interceptor';
import { OverlayInterceptor } from './interceptors/overlay.interceptor';
import { EventBusService } from './services/event-bus.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainContainerComponent,
    OverlayComponent,
  ],
  imports: [CommonModule, RouterModule, HttpClientModule, MaterialModule],
  exports: [
    HeaderComponent,
    RouterModule,
    FooterComponent,
    MainContainerComponent,
    OverlayComponent,
  ],
  providers: [
    AuthService,
    UsersService,
    HintsService,
    HintStorageService,
    OnlySigninGuard,
    EventBusService,
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpLoggerInterceptor,
        multi: true,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: OverlayInterceptor,
        multi: true,
      },
    ],
  ],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
