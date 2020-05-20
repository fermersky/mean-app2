import { Component } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-client';

  update = false;

  constructor(updates: SwUpdate) {
    updates.available.subscribe((event) => {
      // this.update = true;

      updates.activateUpdate().then(() => document.location.reload());
    });
  }
}
