import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormArray, FormGroup } from '@angular/forms';

import { HintStorageService } from '../core/services/hints-storage.service';
import { IHint } from '../core/interfaces';

@Component({
  selector: 'app-hint-update',
  templateUrl: './hint-update.component.html',
  styleUrls: ['./hint-update.component.css'],
})
export class HintUpdateComponent implements OnInit {
  public form: FormGroup;
  public title: FormControl;
  public tags: FormArray;

  hint: IHint;

  constructor(
    private router: Router,
    private hintsStorage: HintStorageService
  ) {}

  ngOnInit() {
    this.hint = this.hintsStorage.hintToUpdate;

    if (this.hint) {
      this.createFormControls();
      this.createForm();
    }
  }

  update() {
    if (this.form.valid) {
      console.log(this.hint);
      console.log(this.form.value);

      const title = this.form.value.title;
      const tags = this.form.value.tags;

      const hint = {
        ...this.hint,
        title,
        tags,
      };

      this.hintsStorage.update(hint);
      this.router.navigate(['/account/profile']);
    }
  }

  createForm() {
    this.form = new FormGroup({
      title: this.title,
      tags: this.tags,
    });
  }

  createFormControls() {
    this.title = new FormControl(this.hintsStorage.hintToUpdate.title, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(255),
    ]);

    this.tags = new FormArray([]);

    this.hint.tags.forEach((t) => {
      this.createTagControl(t);
    });
  }

  createTagControl(formState: string = '') {
    this.tags.push(
      new FormControl(formState, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ])
    );
  }

  removeTagControl(index) {
    this.tags.removeAt(index);
  }

  get tagsArray() {
    return this.tags.controls;
  }
}
