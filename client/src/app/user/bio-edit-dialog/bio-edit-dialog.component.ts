import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import UserDTO from 'src/app/shared/models/user-dto';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-bio-edit-dialog',
  templateUrl: './bio-edit-dialog.component.html',
  styleUrls: ['./bio-edit-dialog.component.sass']
})
export class BioEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BioEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserDTO,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onUpdateUser() {
    this.userService.updateUserByUsername(this.user, this.user.username);
    this.dialogRef.close(this.user);
  }

}
