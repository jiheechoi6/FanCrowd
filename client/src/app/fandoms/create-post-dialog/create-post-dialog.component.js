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
exports.CreatePostDialogComponent = void 0;
const core_1 = require("@angular/core");
const dialog_1 = require("@angular/material/dialog");
let CreatePostDialogComponent = class CreatePostDialogComponent {
    constructor(dialogRef, data, _fandomService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._fandomService = _fandomService;
        this.isEditing = false;
        if (this.data.postBeingUpdated) {
            this.post = this.data.postBeingUpdated;
            this.isEditing = true;
        }
        else {
            this.post = {
                comments: [],
                content: '',
                datePosted: new Date(),
                fandomId: this.data.fandomId,
                numDislikes: 0,
                numLikes: 0,
                postedBy: this.data.userCreatingEvent,
                title: '',
            };
        }
    }
    ngOnInit() { }
    onCreatePost() {
        this.post.datePosted = new Date();
        const newPost = this._fandomService.createPostForFandom(this.post);
        this.dialogRef.close(newPost);
    }
    onEditPost() {
        this._fandomService.updatePostForFandom(this.post.id, this.post);
        this.dialogRef.close(this.post);
    }
};
CreatePostDialogComponent = __decorate([
    core_1.Component({
        selector: 'app-create-post-dialog',
        templateUrl: './create-post-dialog.component.html',
    }),
    __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
], CreatePostDialogComponent);
exports.CreatePostDialogComponent = CreatePostDialogComponent;
