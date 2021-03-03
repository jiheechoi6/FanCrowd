import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass'],
})
export class ForgotPasswordComponent implements OnInit {
  firstStepForm!: FormGroup;
  secondStepForm!: FormGroup;
  hidePassword = true;

  confirmPasswordErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid =
        control.touched && this.secondStepForm.get('passwords')?.invalid;
      return controlInvalid || !!formInvalid;
    },
  };

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initalizeForms();
  }

  initalizeForms() {
    this.firstStepForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-z0-9_]+')]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.secondStepForm = this._formBuilder.group({
      verificationCode: ['', [Validators.required]],
      passwords: this._formBuilder.group(
        {
          newPassword: [
            '',
            [
              Validators.required,
              Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
            ],
          ],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: this.passwordMismatch }
      ),
    });
  }

  passwordMismatch(passwordFormGroup: FormGroup): ValidationErrors | null {
    const newPassword = passwordFormGroup.controls['newPassword'].value;
    const confirmPassword = passwordFormGroup.controls['confirmPassword'].value;
    return confirmPassword === newPassword ? null : { passwordMismatch: true };
  }
}
