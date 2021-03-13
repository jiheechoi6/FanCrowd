"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserComponent = void 0;
const core_1 = require("@angular/core");
const delete_dialog_component_1 = require("../shared/components/delete-dialog/delete-dialog.component");
const edit_user_dialog_component_1 = require("./edit-user-dialog/edit-user-dialog.component");
let UserComponent = class UserComponent {
    constructor(_userService, _activatedRoute, _router, _dialog, _authService) {
        this._userService = _userService;
        this._activatedRoute = _activatedRoute;
        this._router = _router;
        this._dialog = _dialog;
        this._authService = _authService;
        this.user = null;
        this.loggedInUser = null;
    }
    ngOnInit() {
        this._activatedRoute.params.subscribe((params) => {
            const username = params['username'];
            this.user = this._userService.getUserByUsername(username);
            if (!this.user) {
                this._router.navigate(['../']);
            }
        });
        this.userSubscription = this._authService.currentUser.subscribe((user) => (this.loggedInUser = user));
    }
    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
    deleteUser() {
        var _a;
        this._userService.deleteUserByUsername(((_a = this.user) === null || _a === void 0 ? void 0 : _a.username) || '');
        this._authService.logOut();
        this._router.navigate(['../']);
    }
    banUser() {
        var _a;
        this._userService.banUserByUsername(((_a = this.user) === null || _a === void 0 ? void 0 : _a.username) || '');
        this._router.navigate(['../']);
    }
    openEditAccountDialog() {
        const dialogRef = this._dialog.open(edit_user_dialog_component_1.EditUserDialogComponent, {
            data: Object.assign({}, this.user),
            autoFocus: false,
            width: '450px',
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe((updatedUser) => {
            if (updatedUser) {
                this.user = updatedUser;
                this._authService.currentUser.next(updatedUser);
            }
        });
    }
    openDeleteAccountDialog() {
        this._dialog.open(delete_dialog_component_1.DeleteDialogComponent, {
            data: {
                title: 'Delete Account Confirmation',
                details: 'Are you sure you want to delete your account?',
                onConfirmCb: this.deleteUser.bind(this),
            },
            width: '360px',
            height: '180px',
            autoFocus: false,
            disableClose: true,
        });
    }
    openBanUserAccountDialog() {
        var _a;
        this._dialog.open(delete_dialog_component_1.DeleteDialogComponent, {
            data: {
                title: 'Ban UserDTO Confirmation',
                details: `Are you sure you want to ban ${(_a = this.user) === null || _a === void 0 ? void 0 : _a.username}?`,
                onConfirmCb: this.banUser.bind(this),
            },
            width: '360px',
            height: '180px',
            autoFocus: false,
        });
    }
};
UserComponent = __decorate([
    core_1.Component({
        selector: 'app-user',
        templateUrl: './user.component.html',
        styleUrls: ['./user.component.sass'],
    })
], UserComponent);
exports.UserComponent = UserComponent;
