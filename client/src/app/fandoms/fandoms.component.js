"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FandomsComponent = void 0;
const core_1 = require("@angular/core");
const add_dialog_component_1 = require("../shared/components/add-dialog/add-dialog.component");
let FandomsComponent = class FandomsComponent {
    constructor(_fandomService, _authService, dialog) {
        this._fandomService = _fandomService;
        this._authService = _authService;
        this.dialog = dialog;
        this.categories = [];
        this.isAdmin = false;
    }
    ngOnInit() {
        this.categories = this._fandomService.getCategories();
        this._authService.currentUser.subscribe((user) => (this.isAdmin = (user === null || user === void 0 ? void 0 : user.role) === 'admin'));
    }
    openCreateCategoryDialog() {
        const dialogRef = this.dialog.open(add_dialog_component_1.AddDialogComponent, {
            data: {
                title: 'Category',
                categoryName: '',
                isCategory: true,
            },
            width: '360px',
            height: '300px',
            autoFocus: false,
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe(() => {
            this.categories = this._fandomService.getCategories();
        });
    }
};
FandomsComponent = __decorate([
    core_1.Component({
        selector: 'app-fandoms',
        templateUrl: './fandoms.component.html',
        styleUrls: ['./fandoms.component.sass'],
    })
], FandomsComponent);
exports.FandomsComponent = FandomsComponent;
