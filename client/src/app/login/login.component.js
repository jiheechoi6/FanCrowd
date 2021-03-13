"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginComponent = void 0;
const core_1 = require("@angular/core");
let LoginComponent = class LoginComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.username = '';
        this.password = '';
        this.hidePassword = true;
        this.loginError = '';
        this.isLoggingIn = false;
    }
    ngOnInit() { }
    onLogIn() {
        this.isLoggingIn = true;
        const user = this.authService.loginUser(this.username, this.password);
        this.isLoggingIn = false;
        if (user) {
            this.router.navigate(['/users', user.username]);
        }
        else {
            this.loginError = 'Username or password is wrong';
        }
    }
};
LoginComponent = __decorate([
    core_1.Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.sass'],
    })
], LoginComponent);
exports.LoginComponent = LoginComponent;
