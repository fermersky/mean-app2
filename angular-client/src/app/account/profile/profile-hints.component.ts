import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

import { HintStorageService } from 'src/app/core/services/hints-storage.service';
import { IHint } from 'src/app/core/interfaces';

@Component({
  selector: 'hts-profile-hints',
  template: `
    <hts-hints-list
      (onUpdate)="onUpdate($event)"
      showActions="true"
      [hints]="hintsArray"
    ></hts-hints-list>
  `,
})
export class ProfileHintsComponent implements OnInit, OnDestroy {
  hints$: Observable<IHint[]>;
  immutableHints: IHint[];
  hintsArray: IHint[];
  subs = new SubSink();

  @Input() set filterText(val: string) {
    val = val && val.toLowerCase();

    if (val && this.immutableHints) {
      this.hintsArray = this.hintsArray.filter((h) =>
        h.title.toLowerCase().includes(val)
      );
    } else {
      this.hintsArray = this.immutableHints;
    }
  }

  constructor(
    private hintsStorage: HintStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subs.sink = this.hintsStorage.hints$.subscribe((data) => {
      this.immutableHints = data;
      this.hintsArray = data;
    });
  }

  onUpdate(id: string) {
    const hint = this.immutableHints.find((h) => h._id == id);
    this.hintsStorage.hintToUpdate = hint;
    this.router.navigateByUrl('/hint/update');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
