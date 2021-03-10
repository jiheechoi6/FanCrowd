import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FandomService } from 'src/app/core/services/fandom.service';
import FandomPost from 'src/app/shared/models/fandom-post';
import PartialUserDTO from 'src/app/shared/models/partial-user-dto';

interface DialogData {
  postBeingUpdated?: FandomPost;
  userCreatingEvent: PartialUserDTO;
  fandomId: number;
}

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.sass'],
})
export class CreatePostDialogComponent implements OnInit {
  post: FandomPost;
  isEditing = false;

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
        comments: [],
        content: '',
        datePosted: new Date(),
        fandomId: this.data.fandomId,
        numDislikes: 0,
        numLikes: 0,
        postedBy: this.data.userCreatingEvent,
        title: '',
      };
    }
  }

  ngOnInit(): void {}

  onCreatePost() {
    this.post.datePosted = new Date();
    const newPost = this._fandomService.createPostForFandom(this.post);
    this.dialogRef.close(newPost);
  }

  onEditPost() {
    this._fandomService.updatePostForFandom(this.post.id, this.post);
    this.dialogRef.close(this.post);
  }
}
