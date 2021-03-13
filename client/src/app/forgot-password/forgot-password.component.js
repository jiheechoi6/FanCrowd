"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let ForgotPasswordComponent = class ForgotPasswordComponent {
    constructor(_formBuilder, _snackBar, _emailService, _authService) {
        this._formBuilder = _formBuilder;
        this._snackBar = _snackBar;
        this._emailService = _emailService;
        this._authService = _authService;
        this.hidePassword = true;
        this.sendingVerificationCode = false;
        this.resettingPassword = false;
        this.confirmPasswordErrorMatcher = {
            isErrorState: (control, form) => {
                var _a;
                const controlInvalid = control.touched && control.invalid;
                const formInvalid = control.touched && ((_a = this.secondStepForm.get('passwords')) === null || _a === void 0 ? void 0 : _a.invalid);
                return controlInvalid || !!formInvalid;
            },
        };
    }
    ngOnInit() {
        this.initalizeForms();
    }
    initalizeForms() {
        this.firstStepForm = this._formBuilder.group({
            username: ['', [forms_1.Validators.required, forms_1.Validators.pattern('[a-z0-9_]+')]],
            email: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
                ],
            ],
        });
        this.secondStepForm = this._formBuilder.group({
            verificationCode: ['', [forms_1.Validators.required]],
            passwords: this._formBuilder.group({
                newPassword: [
                    '',
                    [
                        forms_1.Validators.required,
                        forms_1.Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
                    ],
                ],
                confirmPassword: ['', [forms_1.Validators.required]],
            }, { validators: this.passwordMismatch }),
        });
    }
    passwordMismatch(passwordFormGroup) {
        const newPassword = passwordFormGroup.controls['newPassword'].value;
        const confirmPassword = passwordFormGroup.controls['confirmPassword'].value;
        return confirmPassword === newPassword ? null : { passwordMismatch: true };
    }
    sendVerificationCode(stepper) {
        const email = this.firstStepForm.controls['email'].value;
        this.sendingVerificationCode = true;
        this._emailService.sendVerficationCode(email);
        //Below lines will go in the subscription callback above
        this._snackBar.open(`An email has been sent to ${email} with a verification code!`, 'X', {
            panelClass: ['snackbar'],
            horizontalPosition: 'left',
            duration: 3500,
        });
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
    resetPassword(stepper) {
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
};
ForgotPasswordComponent = __decorate([
    core_1.Component({
        selector: 'app-forgot-password',
        templateUrl: './forgot-password.component.html',
        styleUrls: ['./forgot-password.component.sass'],
    })
], ForgotPasswordComponent);
exports.ForgotPasswordComponent = ForgotPasswordComponent;
