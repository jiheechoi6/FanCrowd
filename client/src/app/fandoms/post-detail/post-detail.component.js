"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDetailComponent = void 0;
const core_1 = require("@angular/core");
const delete_dialog_component_1 = require("src/app/shared/components/delete-dialog/delete-dialog.component");
const add_comment_dialog_component_1 = require("../add-comment-dialog/add-comment-dialog.component");
const create_post_dialog_component_1 = require("../create-post-dialog/create-post-dialog.component");
let PostDetailComponent = class PostDetailComponent {
    constructor(_fandomService, _activatedRoute, _authService, _router, _dialog, _breadcrumbService) {
        this._fandomService = _fandomService;
        this._activatedRoute = _activatedRoute;
        this._authService = _authService;
        this._router = _router;
        this._dialog = _dialog;
        this._breadcrumbService = _breadcrumbService;
        this.postId = null;
        this.post = null;
        this.loggedInUser = null;
        this.fandomCategory = '';
        this.fandomName = '';
    }
    ngOnInit() {
        this._activatedRoute.params.subscribe((params) => {
            var _a;
            this.postId = +params['postId'];
            this.fandomCategory = params['category'];
            this.fandomName = params['fandom'];
            this.post = this._fandomService.getFandomPostById(this.postId);
            if (!this.post) {
                this._router.navigate([
                    'fandoms',
                    this.fandomCategory,
                    this.fandomName,
                ]);
            }
            this._breadcrumbService.set('@postName', ((_a = this.post) === null || _a === void 0 ? void 0 : _a.title) || '');
        });
        this._authService.currentUser.subscribe((user) => (this.loggedInUser = user));
    }
    updatePostLikes() {
        if (this.post) {
            this.post.numLikes += 1;
            this._fandomService.updatePostForFandom(this.post.id, this.post);
        }
    }
    updatePostDislikes() {
        if (this.post) {
            this.post.numDislikes += 1;
            this._fandomService.updatePostForFandom(this.post.id, this.post);
        }
    }
    updateCommentLikes(comment) {
        if (this.post) {
            comment.numLikes += 1;
            this.post = this._fandomService.editPostComment(this.post.id, comment.id, comment);
        }
    }
    updateCommentDislikes(comment) {
        if (this.post) {
            comment.numDislikes += 1;
            this.post = this._fandomService.editPostComment(this.post.id, comment.id, comment);
        }
    }
    deletePost() {
        var _a;
        this._fandomService.deletePostFromFandom((_a = this.post) === null || _a === void 0 ? void 0 : _a.id);
        this._router.navigate(['/fandoms', this.fandomCategory, this.fandomName]);
    }
    openDeletePostDialog() {
        this._dialog.open(delete_dialog_component_1.DeleteDialogComponent, {
            data: {
                title: 'Delete Post Confirmation',
                details: 'Are you sure you want to delete this post?',
                onConfirmCb: this.deletePost.bind(this),
            },
            autoFocus: false,
            width: '450px',
            disableClose: true,
        });
    }
    openEditPostDialog() {
        const dialogRef = this._dialog.open(create_post_dialog_component_1.CreatePostDialogComponent, {
            data: {
                postBeingUpdated: Object.assign({}, this.post),
            },
            autoFocus: false,
            width: '450px',
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe((updatedPost) => {
            if (updatedPost) {
                this.post = updatedPost;
            }
        });
    }
    openCreateCommentDialog() {
        var _a, _b, _c, _d;
        const dialogRef = this._dialog.open(add_comment_dialog_component_1.AddCommentDialogComponent, {
            data: {
                userCreatingComment: {
                    role: (_a = this.loggedInUser) === null || _a === void 0 ? void 0 : _a.role,
                    username: (_b = this.loggedInUser) === null || _b === void 0 ? void 0 : _b.username,
                    profileUrl: (_c = this.loggedInUser) === null || _c === void 0 ? void 0 : _c.profileUrl,
                },
                postId: (_d = this.post) === null || _d === void 0 ? void 0 : _d.id,
            },
            autoFocus: false,
            width: '450px',
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe((newComment) => {
            if (newComment && this.postId) {
                this.post = this._fandomService.getFandomPostById(this.postId);
            }
        });
    }
    deleteComment(commentId) {
        var _a;
        this.post = this._fandomService.removeCommentFromPost((_a = this.post) === null || _a === void 0 ? void 0 : _a.id, commentId);
    }
    openDeleteCommentDialog(commentId) {
        this._dialog.open(delete_dialog_component_1.DeleteDialogComponent, {
            data: {
                title: 'Delete Comment Confirmation',
                details: 'Are you sure you want to delete your comment?',
                onConfirmCb: this.deleteComment.bind(this),
                params: [commentId],
            },
            autoFocus: false,
            width: '450px',
            disableClose: true,
        });
    }
    openEditCommentDialog(comment) {
        var _a;
        const dialogRef = this._dialog.open(add_comment_dialog_component_1.AddCommentDialogComponent, {
            data: {
                commentBeingEdited: Object.assign({}, comment),
                postId: (_a = this.post) === null || _a === void 0 ? void 0 : _a.id,
            },
            autoFocus: false,
            width: '450px',
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe((updatedComment) => {
            if (updatedComment && this.postId) {
                this.post = this._fandomService.getFandomPostById(this.postId);
            }
        });
    }
};
PostDetailComponent = __decorate([
    core_1.Component({
        selector: 'app-post-detail',
        templateUrl: './post-detail.component.html',
        styleUrls: ['./post-detail.component.sass'],
    })
], PostDetailComponent);
exports.PostDetailComponent = PostDetailComponent;
