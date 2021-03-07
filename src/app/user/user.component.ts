import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { DeleteDialogComponent } from '../shared/components/delete-dialog/delete-dialog.component';
import UserDTO from '../shared/models/user-dto';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent implements OnInit {
  userSubscription!: Subscription;
  user: UserDTO | null = null;
  loggedInUser: UserDTO | null = null;

  constructor(
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      const username = params['username'];
      this.user = this._userService.getUserByUsername(username);
      this._authService.currentUser.subscribe(
        (user) => (this.loggedInUser = user)
      );
      if (!this.user) {
        this._router.navigate(['../']);
      }
    });
  }

  deleteUser() {
    this._userService.deleteUserByUsername(this.user?.username || '');
    this._authService.logOut();
    this._router.navigate(['../']);
  }

  banUser() {
    this._userService.banUserByUsername(this.user?.username || '');
    this._router.navigate(['../']);
  }

  openEditAccountDialog() {
    const dialogRef = this._dialog.open(EditUserDialogComponent, {
      data: { ...this.user },
      autoFocus: false,
      width: '450px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((updatedUser: UserDTO) => {
      if (updatedUser) {
        this.user = updatedUser;
        this._authService.currentUser.next(updatedUser);
      }
    });
  }

  openDeleteAccountDialog() {
    this._dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Account Confirmation',
        details: 'Are you sure you want to delete your account?',
        onConfirmCb: this.deleteUser.bind(this),
      },
      width: '360px',
      height: '180px',
      autoFocus: false,
    });
  }

  openBanUserAccountDialog() {
    this._dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Ban UserDTO Confirmation',
        details: `Are you sure you want to ban ${this.user?.username}?`,
        onConfirmCb: this.banUser.bind(this),
      },
      width: '360px',
      height: '180px',
      autoFocus: false,
    });
  }
}
