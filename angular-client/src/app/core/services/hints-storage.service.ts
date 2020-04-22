import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { IHint } from '../interfaces';
import { HintsService } from './hints.service';
import { UsersService } from './users.service';

@Injectable()
export class HintStorageService {
  private hintsStorage: IHint[] = [];
  private hintsSubject$ = new BehaviorSubject<IHint[]>(this.hintsStorage);

  hints$ = new Observable<IHint[]>();

  hintToUpdate: IHint;

  constructor(private hints: HintsService, private users: UsersService) {
    this.hints$ = this.hintsSubject$.asObservable();
    this.fethcHints();
  }

  fethcHints() {
    const username = this.users.getUserFromLocalStorage().name;

    this.hints.getByAuthor(username).subscribe((data) => {
      this.loadUp(data);
    });
  }

  loadUp(hints: IHint[]) {
    this.hintsSubject$.next(hints);
  }

  add(title: string, tags: string[], author: string, user_id: string) {
    this.hints.postHint(title, tags, author, user_id).subscribe((_) => {
      this.fethcHints();
    });
  }

  update(hint: IHint) {
    this.hints.putHint(hint).subscribe((_) => {
      this.fethcHints();
    });
  }

  delete(id: string) {
    this.hints.deleteHint(id).subscribe((_) => {
      this.fethcHints();
    });
  }
}
