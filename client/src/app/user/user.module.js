"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const user_component_1 = require("./user.component");
const user_routing_module_1 = require("./user-routing.module");
const core_module_1 = require("../core/core.module");
const shared_module_1 = require("../shared/shared.module");
const edit_user_dialog_component_1 = require("./edit-user-dialog/edit-user-dialog.component");
let UserModule = class UserModule {
};
UserModule = __decorate([
    core_1.NgModule({
        declarations: [user_component_1.UserComponent, edit_user_dialog_component_1.EditUserDialogComponent],
        imports: [common_1.CommonModule, user_routing_module_1.UserRoutingModule, core_module_1.CoreModule, shared_module_1.SharedModule],
    })
], UserModule);
exports.UserModule = UserModule;
