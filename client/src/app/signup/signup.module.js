"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const signup_component_1 = require("./signup.component");
const router_1 = require("@angular/router");
const core_module_1 = require("../core/core.module");
const routes = [
    {
        path: '',
        component: signup_component_1.SignupComponent,
    },
];
let SignupModule = class SignupModule {
};
SignupModule = __decorate([
    core_1.NgModule({
        declarations: [signup_component_1.SignupComponent],
        imports: [common_1.CommonModule, core_module_1.CoreModule, router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule],
    })
], SignupModule);
exports.SignupModule = SignupModule;
