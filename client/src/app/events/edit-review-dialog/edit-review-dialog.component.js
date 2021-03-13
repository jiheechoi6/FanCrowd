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
exports.EditReviewDialogComponent = void 0;
const core_1 = require("@angular/core");
const dialog_1 = require("@angular/material/dialog");
let EditReviewDialogComponent = class EditReviewDialogComponent {
    constructor(dialogRef, data, eventService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.eventService = eventService;
        this.ratings = [1, 2, 3, 4, 5];
    }
    ngOnInit() { }
    onUpdateReview() {
        if (this.data.review) {
            this.eventService.updateReviewById(this.data.eventId, this.data.review);
            this.dialogRef.close(this.data.review);
        }
    }
};
EditReviewDialogComponent = __decorate([
    core_1.Component({
        selector: 'app-edit-review-dialog',
        templateUrl: './edit-review-dialog.component.html',
        styleUrls: ['./edit-review-dialog.component.sass'],
    }),
    __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
], EditReviewDialogComponent);
exports.EditReviewDialogComponent = EditReviewDialogComponent;
