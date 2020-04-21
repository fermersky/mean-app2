import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hts-container',
  template: `
    <div class="app-main-container">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .app-main-container {
        min-height: 77vh;
        padding: 40px;
      }
    `,
  ],
})
export class MainContainerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
