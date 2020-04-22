import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../core/services/users.service';
import { HintStorageService } from '../core/services/hints-storage.service';

@Component({
  selector: 'app-hint-create',
  templateUrl: './hint-create.component.html',
  styleUrls: ['./hint-create.component.css'],
})
export class HintCreateComponent implements OnInit {
  public form: FormGroup;
  public title: FormControl;
  public tags: FormArray;

  constructor(
    private hintsStorage: HintStorageService,
    private user: UsersService,
    private router: Router
  ) {}

  createForm() {
    this.form = new FormGroup({
      title: this.title,
      tags: this.tags,
    });
  }

  createFormControls() {
    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(255),
    ]);

    this.tags = new FormArray([]);
  }

  createTagControl() {
    this.tags.push(
      new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ])
    );
  }

  removeTagControl(index) {
    this.tags.removeAt(index);
  }

  async postHint() {
    const uinfo = this.user.getUserFromLocalStorage();
    if (this.form.valid && uinfo) {
      const title = this.form.get('title').value;
      const tags = this.form.get('tags').value;
      const author = uinfo.name;
      const user_id = uinfo._id;

      try {
        this.hintsStorage.add(title, tags, author, user_id);

        this.router.navigate(['/account/profile']);
      } catch (ex) {
        console.log(ex);
      }
    }
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  get tagsArray() {
    return this.tags.controls;
  }
}
