import { OnInit, Component } from '@angular/core';
import { EventBusService, EventType } from '../services/event-bus.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'hts-overlay',
  template: ` <div *ngIf="display" class="overlay-block">
    <mat-spinner></mat-spinner>
  </div>`,
  styleUrls: ['overlay.component.css'],
})
export class OverlayComponent implements OnInit {
  display = false;

  constructor(private eventBus: EventBusService) {}

  ngOnInit(): void {
    this.eventBus.bus$.subscribe((event: EventType) => {
      if (event === EventType.httpRequest) {
        this.display = true;
      } else if (event === EventType.httpResponse) {
        this.display = false;
      }
    });
  }
}
