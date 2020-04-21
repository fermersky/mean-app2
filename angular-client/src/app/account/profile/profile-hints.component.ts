import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

import { HintsService } from 'src/app/core/services/hints.service';
import { UsersService } from 'src/app/core/services/users.service';
import { IHint } from 'src/app/core/interfaces';

@Component({
  selector: 'hts-profile-hints',
  template: `
    <hts-hints-list [hints]="hintsArray"></hts-hints-list>
    <p *ngIf="loading">loading...</p>
  `,
})
export class ProfileHintsComponent implements OnInit, OnDestroy {
  hints$: Observable<IHint[]>;
  immutableHints: IHint[];
  hintsArray: IHint[];
  subs = new SubSink();

  loading: boolean = false;

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

  constructor(private hints: HintsService, private users: UsersService) {}

  ngOnInit() {
    this.loading = true;

    const username = this.users.getUserFromLocalStorage().name;
    this.subs.sink = this.hints
      .getByAuthor(username)
      .subscribe((hints: IHint[]) => {
        this.immutableHints = hints;
        this.hintsArray = hints;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
