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
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    const username = this.activatedRoute.snapshot.params['username'];
    this.user = this.userService.getUserByUsername(username);
    this._authService.currentUser.subscribe(
      (user) => (this.loggedInUser = user)
    );
    if (!this.user) {
      this.router.navigate(['../']);
    }
  }

  deleteUser() {
    this.userService.deleteUserByUsername(this.user?.username || '');
    this._authService.logOut();
    this.router.navigate(['../']);
  }

  banUser() {
    this.userService.banUserByUsername(this.user?.username || '');
    this.router.navigate(['../']);
  }

  openEditAccountDialog() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { ...this.user },
      autoFocus: false,
      backdropClass: 'material-dialog-backdrop',
      width: '400px',
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
    this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Account Confirmation',
        details: 'Are you sure you want to delete your account?',
        onConfirmCb: this.deleteUser.bind(this),
      },
      width: '360px',
      height: '180px',
      autoFocus: false,
      backdropClass: 'material-dialog-backdrop',
    });
  }

  openBanUserAccountDialog() {
    this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Ban UserDTO Confirmation',
        details: `Are you sure you want to ban ${this.user?.username}?`,
        onConfirmCb: this.banUser.bind(this),
      },
      width: '360px',
      height: '180px',
      autoFocus: false,
      backdropClass: 'material-dialog-backdrop',
    });
  }
}
