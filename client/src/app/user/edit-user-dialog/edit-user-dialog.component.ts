import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import UserDTO from 'src/app/shared/models/user-dto';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.sass'],
})
export class EditUserDialogComponent implements OnInit {
  usernameBeforeUpdate: string;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserDTO,
    private userService: UserService
  ) {
    this.usernameBeforeUpdate = user.username;
  }

  ngOnInit() {}

  onUpdateUser() {
    this.userService.updateUserByUsername(this.user, this.usernameBeforeUpdate);
    this.dialogRef.close(this.user);
  }
}
