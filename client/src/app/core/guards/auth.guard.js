"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
let AuthGuard = class AuthGuard {
    constructor(_authService, _router) {
        this._authService = _authService;
        this._router = _router;
    }
    canActivate(route, state) {
        return this._authService.currentUser.pipe(operators_1.take(1), operators_1.map((user) => {
            return user ? true : this._router.createUrlTree(['/login']);
        }));
    }
};
AuthGuard = __decorate([
    core_1.Injectable({ providedIn: 'root' })
], AuthGuard);
exports.AuthGuard = AuthGuard;
