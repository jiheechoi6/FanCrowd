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
exports.AddDialogComponent = void 0;
const core_1 = require("@angular/core");
const dialog_1 = require("@angular/material/dialog");
let AddDialogComponent = class AddDialogComponent {
    constructor(fandomService, dialogRef, data) {
        this.fandomService = fandomService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.newCategory = {
            id: 1000,
            name: '',
            backgroundUrl: ''
        };
        this.newFandom = {
            id: 1000,
            name: '',
            category: '',
            backgroundUrl: ''
        };
    }
    ngOnInit() {
        this.object = {
            id: 1000,
            name: '',
            category: this.data.categoryName,
            backgroundUrl: ''
        };
    }
    onConfirm() {
        if (this.data.isCategory) {
            // Add a Category
            this.newCategory.name = this.object.name;
            this.newCategory.backgroundUrl = this.object.backgroundUrl || 'https://cdn.hipwallpaper.com/i/96/43/B7R52d.jpg';
            this.addCategory(this.newCategory);
        }
        else {
            // Add a Fandom
            this.newFandom.name = this.object.name;
            this.newFandom.category = this.object.category;
            this.newFandom.backgroundUrl = this.object.backgroundUrl || 'https://cdn.hipwallpaper.com/i/96/43/B7R52d.jpg';
            this.addFandom(this.newFandom);
        }
        this.dialogRef.close();
    }
    addCategory(newCategory) {
        // Call fandomService and add caategory
        this.fandomService.addCategory(newCategory);
    }
    addFandom(newFandom) {
        // Call fandomService and add caategory
        this.fandomService.addFandom(newFandom);
    }
};
AddDialogComponent = __decorate([
    core_1.Component({
        selector: 'app-add-dialog',
        templateUrl: './add-dialog.component.html',
    }),
    __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
], AddDialogComponent);
exports.AddDialogComponent = AddDialogComponent;
