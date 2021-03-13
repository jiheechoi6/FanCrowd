import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from '../core/services/auth.service';
import { EmailService } from '../core/services/email.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass'],
})
export class ForgotPasswordComponent implements OnInit {
  firstStepForm!: FormGroup;
  secondStepForm!: FormGroup;
  hidePassword = true;
  sendingVerificationCode = false;
  resettingPassword = false;

  confirmPasswordErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid =
        control.touched && this.secondStepForm.get('passwords')?.invalid;
      return controlInvalid || !!formInvalid;
    },
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _emailService: EmailService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.initalizeForms();
  }

  initalizeForms() {
    this.firstStepForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-z0-9_]+')]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
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

  sendVerificationCode(stepper: MatStepper) {
    const email = this.firstStepForm.controls['email'].value;
    this.sendingVerificationCode = true;
    this._emailService.sendVerficationCode(email);

    //Below lines will go in the subscription callback above
    this._snackBar.open(
      `An email has been sent to ${email} with a verification code!`,
      'X',
      {
        panelClass: ['snackbar'],
        horizontalPosition: 'left',
        duration: 3500,
      }
    );
    stepper.next();

    //Below lines if email cannot be sent for some reason
    // this._snackBar.open(
    //   `An error occured when sending a verification code to ${email}! Please try a different email`,
    //   'X',
    //   {
    //     panelClass: ['snackbar'],
    //     horizontalPosition: 'left',
    //     duration: 3500,
    //   }
    // );
    this.sendingVerificationCode = false;
  }

  resetPassword(stepper: MatStepper) {
    const verificationCode = +this.secondStepForm.value['verificationCode'];
    const newPassword = this.secondStepForm.value['newPassword'];
    const email = this.firstStepForm.controls['email'].value;

    this.resettingPassword = true;
    this._authService.resetPassword(email, newPassword, verificationCode);
    //Below lines will go in the subscription callback above
    this._snackBar.open(`Your password has been successfully reset`, 'X', {
      panelClass: ['snackbar'],
      horizontalPosition: 'left',
      duration: 3500,
    });
    stepper.next();

    //Below lines if password reset failed
    // this._snackBar.open(
    //   `There was a problem resetting your password! Please ensure verification code is correct and try again`,
    //   'X',
    //   {
    //     panelClass: ['snackbar'],
    //     horizontalPosition: 'left',
    //     duration: 3500,
    //   }
    // );

    this.resettingPassword = false;
  }
}
