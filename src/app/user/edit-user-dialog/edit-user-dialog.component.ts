import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import User from 'src/app/shared/models/user';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.sass'],
})
export class EditUserDialogComponent implements OnInit {
  usernameBeforeUpdate: string;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService
  ) {
    this.usernameBeforeUpdate = user.username;
  }

  ngOnInit(): void {}

  onUpdateUser() {
    this.userService.updateUserByUsername(this.user, this.usernameBeforeUpdate);
    this.dialogRef.close(this.user);
  }
}
