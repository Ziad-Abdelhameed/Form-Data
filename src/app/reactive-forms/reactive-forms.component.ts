import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { forbiddenUserName } from '../custom.validators.ts/userNameValidator';
import { confirmPasswordValidator } from '../custom.validators.ts/confirmPassword.validator';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss'],
})
export class ReactiveFormsComponent {
  constructor(public fb: FormBuilder) {}

  regisiterForm = this.fb.group(
    {
      username: [
        '',
        [Validators.required, Validators.minLength(5), forbiddenUserName],
      ],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      email: [''],
      alterEmails: this.fb.array([]),
      isRequired: [false],
      address: this.fb.group({
        country: [''],
        city: [''],
      }),
    },
    { validator: [confirmPasswordValidator] }
  );

  public get username() {
    return this.regisiterForm.get('username');
  }
  public get password() {
    return this.regisiterForm.get('password');
  }
  public get confirmPassword() {
    return this.regisiterForm.get('confirmPassword');
  }
  public get email() {
    return this.regisiterForm.get('email');
  }

  public get alterEmails() {
    return this.regisiterForm.get('alterEmails') as FormArray;
  }

  addEmailValidator(): void {
    this.regisiterForm
      .get('isRequired')
      ?.valueChanges.subscribe((checkedValue) => {
        if (checkedValue) {
          this.email?.addValidators(Validators.required);
        } else {
          this.email?.removeValidators(Validators.required);
        }
        this.email?.updateValueAndValidity();
      });
    console.log(this.regisiterForm.get('isRequired')?.value);
  }
  //

  sendData() {
    console.log(this.regisiterForm.value);
    this.regisiterForm.reset();
  }
  addAnotherEmail() {
    this.alterEmails.push(this.fb.control(''));
    this.alterEmails.controls[this.alterEmails.length - 1].addValidators(
      Validators.required
    );
  }
}
