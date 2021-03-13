"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FandomDetailComponent = void 0;
const core_1 = require("@angular/core");
const create_post_dialog_component_1 = require("../create-post-dialog/create-post-dialog.component");
let FandomDetailComponent = class FandomDetailComponent {
    constructor(_authService, _eventService, _activatedRoute, _fandomService, _dialog, _userService) {
        this._authService = _authService;
        this._eventService = _eventService;
        this._activatedRoute = _activatedRoute;
        this._fandomService = _fandomService;
        this._dialog = _dialog;
        this._userService = _userService;
        this.eventsForFandom = [];
        this.fandomCategory = '';
        this.fandomName = '';
        this.postsForFandom = [];
        this.loggedInUser = null;
        this.fandom = null;
        this.hasUserJoinedFandom = false;
    }
    ngOnInit() {
        this._authService.currentUser.subscribe((user) => (this.loggedInUser = user));
        this._activatedRoute.params.subscribe((params) => {
            var _a;
            this.fandomCategory = params['category'];
            this.fandomName = params['fandom'];
            this.fandom = this._fandomService.getFandomByName(this.fandomName);
            const events = this._eventService.getEventsByCategoryAndFandom(this.fandomCategory, this.fandomName);
            this.eventsForFandom = this._eventService.convertEventsToEventDTOs(events);
            this.postsForFandom = this._fandomService.getPostsForFandom(this.fandomName);
            this.hasUserJoinedFandom = this._userService.hasUserJoinedFandom(((_a = this.loggedInUser) === null || _a === void 0 ? void 0 : _a.username) || '', this.fandomName || '');
        });
    }
    joinFandom() {
        var _a;
        this._userService.addFandomToUser(((_a = this.loggedInUser) === null || _a === void 0 ? void 0 : _a.username) || '', this.fandom);
        this.hasUserJoinedFandom = true;
    }
    removeFromFandom() {
        var _a, _b;
        this._userService.removeFandomFromUser(((_a = this.loggedInUser) === null || _a === void 0 ? void 0 : _a.username) || '', (_b = this.fandom) === null || _b === void 0 ? void 0 : _b.id);
        this.hasUserJoinedFandom = false;
    }
    openCreatePostDialog() {
        var _a, _b, _c, _d;
        const dialogRef = this._dialog.open(create_post_dialog_component_1.CreatePostDialogComponent, {
            data: {
                userCreatingEvent: {
                    role: (_a = this.loggedInUser) === null || _a === void 0 ? void 0 : _a.role,
                    username: (_b = this.loggedInUser) === null || _b === void 0 ? void 0 : _b.username,
                    profileUrl: (_c = this.loggedInUser) === null || _c === void 0 ? void 0 : _c.profileUrl,
                },
                fandomId: (_d = this.fandom) === null || _d === void 0 ? void 0 : _d.id,
            },
            autoFocus: false,
            width: '450px',
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe((newPost) => {
            if (newPost) {
                this.postsForFandom = this._fandomService.getPostsForFandom(this.fandomName);
            }
        });
    }
    updatePostLikes(post) {
        post.numLikes += 1;
        this._fandomService.updatePostForFandom(post.id, post);
    }
    updatePostDislikes(post) {
        post.numDislikes += 1;
        this._fandomService.updatePostForFandom(post.id, post);
    }
};
FandomDetailComponent = __decorate([
    core_1.Component({
        selector: 'app-fandom-detail',
        templateUrl: './fandom-detail.component.html',
        styleUrls: ['./fandom-detail.component.sass'],
    })
], FandomDetailComponent);
exports.FandomDetailComponent = FandomDetailComponent;
