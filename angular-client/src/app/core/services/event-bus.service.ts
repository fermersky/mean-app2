import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Injectable()
export class EventBusService {
  private subject = new Subject<EventType>();
  bus$: Observable<EventType>;

  constructor() {
    this.bus$ = this.subject.asObservable();
  }

  emit(event: EventType): void {
    this.subject.next(event);
  }
}

export enum EventType {
  httpRequest,
  httpResponse,
}
