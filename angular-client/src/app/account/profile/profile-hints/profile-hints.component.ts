import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

import { HintsService } from 'src/app/core/services/hints.service';
import { UsersService } from 'src/app/core/services/users.service';
import { IHint } from 'src/app/core/interfaces';

@Component({
  selector: 'hts-profile-hints',
  templateUrl: './profile-hints.component.html',
  styleUrls: ['./profile-hints.component.css'],
})
export class ProfileHintsComponent implements OnInit, OnDestroy {
  hints$: Observable<IHint[]>;
  hintsArray: IHint[];
  subs = new SubSink();

  constructor(private hints: HintsService, private users: UsersService) {}

  ngOnInit() {
    const username = this.users.getUserFromLocalStorage().name;
    this.subs.sink = this.hints
      .getByAuthor(username)
      .subscribe((hints: IHint[]) => (this.hintsArray = hints));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
