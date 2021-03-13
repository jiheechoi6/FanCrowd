"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupComponent = void 0;
const core_1 = require("@angular/core");
let SignupComponent = class SignupComponent {
    constructor(_authService, _router) {
        this._authService = _authService;
        this._router = _router;
        this.isSigningUp = false;
        this.hidePassword = true;
        this.email = '';
        this.fullName = '';
        this.username = '';
        this.password = '';
        this.passwordConfirm = '';
        this.signUpError = '';
    }
    ngOnInit() { }
    onSignUp() {
        this.isSigningUp = true;
        const newUser = {
            email: this.email,
            fullName: this.fullName,
            password: this.password,
            username: this.username,
        };
        const user = this._authService.createNewUser(newUser);
        this.isSigningUp = false;
        if (user) {
            this._router.navigate(['/users', user.username]);
        }
        else {
            this.signUpError = 'Username is already taken';
        }
    }
};
SignupComponent = __decorate([
    core_1.Component({
        selector: 'app-signup',
        templateUrl: './signup.component.html',
        styleUrls: ['./signup.component.sass'],
    })
], SignupComponent);
exports.SignupComponent = SignupComponent;
