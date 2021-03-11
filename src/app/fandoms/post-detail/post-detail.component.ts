import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FandomService } from 'src/app/core/services/fandom.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import FandomPost from 'src/app/shared/models/fandom-post';
import FandomPostComment from 'src/app/shared/models/fandom-post-comment';
import UserDTO from 'src/app/shared/models/user-dto';
import { AddCommentDialogComponent } from '../add-comment-dialog/add-comment-dialog.component';
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.sass'],
})
export class PostDetailComponent implements OnInit {
  postId: number | null = null;
  post: FandomPost | null = null;
  loggedInUser: UserDTO | null = null;
  fandomCategory: string = '';
  fandomName: string = '';

  constructor(
    private _fandomService: FandomService,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.postId = +params['postId'];
      this.fandomCategory = params['category'];
      this.fandomName = params['fandom'];
      this.post = this._fandomService.getFandomPostById(this.postId);

      if (!this.post) {
        this._router.navigate(['../']);
      }
    });

    this._authService.currentUser.subscribe(
      (user) => (this.loggedInUser = user)
    );
  }

  updatePostLikes() {
    if (this.post) {
      this.post.numLikes += 1;
      this.post.numDislikes -= this.post.numDislikes === 0 ? 0 : 1;
      this._fandomService.updatePostForFandom(this.post.id, this.post);
    }
  }

  updatePostDislikes() {
    if (this.post) {
      this.post.numDislikes += 1;
      this.post.numLikes -= this.post.numLikes === 0 ? 0 : 1;
      this._fandomService.updatePostForFandom(this.post.id, this.post);
    }
  }

  deletePost() {
    this._fandomService.deletePostFromFandom(this.post?.id);
    this._router.navigate(['/fandoms', this.fandomCategory, this.fandomName]);
  }

  openDeletePostDialog() {
    this._dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Post Confirmation',
        details: 'Are you sure you want to delete this post?',
        onConfirmCb: this.deletePost.bind(this),
      },
      autoFocus: false,
      width: '450px',
      disableClose: true,
    });
  }

  openEditPostDialog() {
    const dialogRef = this._dialog.open(CreatePostDialogComponent, {
      data: {
        postBeingUpdated: { ...this.post },
      },
      autoFocus: false,
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((updatedPost: FandomPost) => {
      if (updatedPost) {
        this.post = updatedPost;
      }
    });
  }

  openCreateCommentDialog() {
    const dialogRef = this._dialog.open(AddCommentDialogComponent, {
      data: {
        userCreatingComment: {
          role: this.loggedInUser?.role,
          username: this.loggedInUser?.username,
          profileUrl: this.loggedInUser?.profileUrl,
        },
        postId: this.post?.id,
      },
      autoFocus: false,
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newComment: FandomPostComment) => {
      if (newComment && this.postId) {
        this.post = this._fandomService.getFandomPostById(this.postId);
      }
    });
  }

  deleteComment(commentId: number) {
    this.post = this._fandomService.removeCommentFromPost(
      this.post?.id,
      commentId
    );
  }

  openDeleteCommentDialog(commentId: number) {
    this._dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Comment Confirmation',
        details: 'Are you sure you want to delete your comment?',
        onConfirmCb: this.deleteComment.bind(this),
        params: commentId,
      },
      autoFocus: false,
      width: '450px',
      disableClose: true,
    });
  }

  openEditCommentDialog(comment: FandomPostComment) {
    const dialogRef = this._dialog.open(AddCommentDialogComponent, {
      data: {
        commentBeingEdited: {
          ...comment,
        },
        postId: this.post?.id,
      },
      autoFocus: false,
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((updatedComment: FandomPostComment) => {
      if (updatedComment && this.postId) {
        this.post = this._fandomService.getFandomPostById(this.postId);
      }
    });
  }
}
