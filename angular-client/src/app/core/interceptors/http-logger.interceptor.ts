import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HintStorageService } from '../services/hints-storage.service';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class HttpLoggerInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req);
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        console.log(event);
        return event;
      })
    );
  }
}
