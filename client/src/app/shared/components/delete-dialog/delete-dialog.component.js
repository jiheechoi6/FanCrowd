"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDialogComponent = void 0;
const core_1 = require("@angular/core");
const dialog_1 = require("@angular/material/dialog");
let DeleteDialogComponent = class DeleteDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() { }
    onConfirm() {
        var _a;
        if ((_a = this.data.params) === null || _a === void 0 ? void 0 : _a.length) {
            this.data.onConfirmCb(...this.data.params);
        }
        else {
            this.data.onConfirmCb();
        }
        this.dialogRef.close();
    }
};
DeleteDialogComponent = __decorate([
    core_1.Component({
        selector: 'app-delete-dialog',
        templateUrl: './delete-dialog.component.html',
    }),
    __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
], DeleteDialogComponent);
exports.DeleteDialogComponent = DeleteDialogComponent;
