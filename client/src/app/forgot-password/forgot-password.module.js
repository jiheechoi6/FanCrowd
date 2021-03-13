"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forgot_password_component_1 = require("./forgot-password.component");
const core_module_1 = require("../core/core.module");
const shared_module_1 = require("../shared/shared.module");
const router_1 = require("@angular/router");
const routes = [{ path: '', component: forgot_password_component_1.ForgotPasswordComponent }];
let ForgotPasswordModule = class ForgotPasswordModule {
};
ForgotPasswordModule = __decorate([
    core_1.NgModule({
        declarations: [forgot_password_component_1.ForgotPasswordComponent],
        imports: [
            common_1.CommonModule,
            core_module_1.CoreModule,
            shared_module_1.SharedModule,
            router_1.RouterModule.forChild(routes),
        ],
        exports: [router_1.RouterModule],
    })
], ForgotPasswordModule);
exports.ForgotPasswordModule = ForgotPasswordModule;
