import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FandomService } from 'src/app/core/services/fandom.service';
import FandomPostComment from 'src/app/shared/models/fandom-post-comment';
import PartialUserDTO from 'src/app/shared/models/partial-user-dto';

interface DialogData {
  commentBeingEdited?: FandomPostComment;
  userCreatingComment: PartialUserDTO;
  postId: number;
}

@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
})
export class AddCommentDialogComponent implements OnInit {
  comment: FandomPostComment;
  isEditing = false;

  constructor(
    public dialogRef: MatDialogRef<AddCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _fandomService: FandomService
  ) {
    if (this.data.commentBeingEdited) {
      this.comment = this.data.commentBeingEdited;
      this.isEditing = true;
    } else {
      this.comment = {
        content: '',
        title: '',
        fandomPost: '',
      };
    }
  }

  ngOnInit(): void {}

  onCreateComment() {
    // const newComment = this._fandomService.addCommentToPost(
    //   this.data.postId,
    //   this.comment
    // );
    this.dialogRef.close();
  }

  onEditComment() {
    // this._fandomService.editPostComment(
    //   this.data.postId,
    //   this.comment.id,
    //   this.comment
    // );
    this.dialogRef.close(this.comment);
  }
}
