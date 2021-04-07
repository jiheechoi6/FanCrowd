import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { FandomService } from 'src/app/core/services/fandom.service';
import FandomPostComment from 'src/app/shared/models/fandom-post-comment';

interface DialogData {
  commentBeingEdited?: FandomPostComment;
  postId: string;
}

@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
})
export class AddCommentDialogComponent implements OnInit {
  comment: FandomPostComment;
  isEditing = false;
  isLoading = false;
  errorMsg: string | null = null;

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
        fandomPost: this.data.postId,
      };
    }
  }

  ngOnInit() {}

  onCreateComment() {
    this.isLoading = true;
    this._fandomService
      .createComment(this.comment)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (comment) => this.dialogRef.close(comment),
        (err) => (this.errorMsg = err.error.message)
      );
  }

  onEditComment() {
    this.isLoading = true;
    this._fandomService
      .updateComment(this.comment._id, this.comment)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => this.dialogRef.close(this.comment),
        (err) => (this.errorMsg = err.error.message)
      );
  }
}
