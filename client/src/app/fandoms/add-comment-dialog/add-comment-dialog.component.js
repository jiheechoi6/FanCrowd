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
exports.AddCommentDialogComponent = void 0;
const core_1 = require("@angular/core");
const dialog_1 = require("@angular/material/dialog");
let AddCommentDialogComponent = class AddCommentDialogComponent {
    constructor(dialogRef, data, _fandomService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._fandomService = _fandomService;
        this.isEditing = false;
        if (this.data.commentBeingEdited) {
            this.comment = this.data.commentBeingEdited;
            this.isEditing = true;
        }
        else {
            this.comment = {
                content: '',
                datePosted: new Date(),
                numDislikes: 0,
                numLikes: 0,
                postedBy: this.data.userCreatingComment,
                title: '',
            };
        }
    }
    ngOnInit() { }
    onCreateComment() {
        this.comment.datePosted = new Date();
        const newComment = this._fandomService.addCommentToPost(this.data.postId, this.comment);
        this.dialogRef.close(newComment);
    }
    onEditComment() {
        this._fandomService.editPostComment(this.data.postId, this.comment.id, this.comment);
        this.dialogRef.close(this.comment);
    }
};
AddCommentDialogComponent = __decorate([
    core_1.Component({
        selector: 'app-add-comment-dialog',
        templateUrl: './add-comment-dialog.component.html',
    }),
    __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
], AddCommentDialogComponent);
exports.AddCommentDialogComponent = AddCommentDialogComponent;
