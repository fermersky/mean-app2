import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'hts-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

  public registerForm: FormGroup;

  public name: FormControl;
  public email: FormControl;
  public password: FormControl;
  public repeatPassword: FormControl;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.createFormControls();
    this.createForm();
    this.bindCustomValidators();
  }

  ngOnInit() {}

  createFormControls() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.min(4),
      Validators.max(20),
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailRegex),
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]);
    this.repeatPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]);
  }

  createForm() {
    this.registerForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword,
    });
  }

  bindCustomValidators() {
    this.registerForm.setValidators(this.compare());
  }

  compare(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const pwd = group.controls['password'];
      const repwd = group.controls['repeatPassword'];

      if (pwd.value !== repwd.value) {
        repwd.setErrors({ notEquivalent: true });
      } else {
        repwd.setErrors(null);
      }

      return;
    };
  }

  openSnackBar(msg) {
    this.snackBar.open(msg, 'Got it!', {
      duration: 2000,
    });
  }

  async register() {
    if (this.registerForm.valid) {
      const uinfo = this.registerForm.value;

      try {
        const response = await this.auth
          .httpRegister(uinfo.name, uinfo.email, uinfo.password)
          .toPromise();

        if (response) {
          this.auth.signIn(response);
          this.router.navigate(['profile']);
        }
      } catch (ex) {
        console.log(ex);
      }
    } else {
      this.openSnackBar('Validation error(s) detected!');
    }
  }
}
