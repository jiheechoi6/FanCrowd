import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { FandomService } from 'src/app/core/services/fandom.service';
import { FandomPost } from 'src/app/shared/models/fandom-post';

interface DialogData {
  postBeingUpdated?: FandomPost;
  fandomId: string;
}

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
})
export class CreatePostDialogComponent implements OnInit {
  post: FandomPost;
  isEditing = false;
  isLoading = false;
  errorMsg: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _fandomService: FandomService
  ) {
    if (this.data.postBeingUpdated) {
      this.post = this.data.postBeingUpdated;
      this.isEditing = true;
    } else {
      this.post = {
        content: '',
        fandom: this.data.fandomId,
        title: '',
      };
    }
  }

  ngOnInit(): void {}

  onCreatePost() {
    this.isLoading = true;
    this._fandomService
      .createPost(this.post)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (post) => this.dialogRef.close(post),
        (err) => (this.errorMsg = err.error.message)
      );
  }

  onEditPost() {
    this.isLoading = true;
    this._fandomService
      .updatePost(this.post!._id, this.post)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => this.dialogRef.close(this.post),
        (err) => (this.errorMsg = err.error.message)
      );
  }
}
