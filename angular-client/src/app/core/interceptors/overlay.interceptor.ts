import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { EventBusService, EventType } from '../services/event-bus.service';

@Injectable()
export class OverlayInterceptor implements HttpInterceptor {
  constructor(private bus: EventBusService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.bus.emit(EventType.httpRequest);

    return next.handle(req).pipe(
      delay(1000), // delete this when application is in the production
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.bus.emit(EventType.httpResponse);
        }
      })
    );
  }
}
