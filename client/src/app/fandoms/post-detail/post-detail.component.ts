import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { FandomService } from 'src/app/core/services/fandom.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import {
  FandomPost,
  IUserLikeOnlyUser,
} from 'src/app/shared/models/fandom-post';
import FandomPostComment from 'src/app/shared/models/fandom-post-comment';
import UserDTO from 'src/app/shared/models/user-dto';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AddCommentDialogComponent } from '../add-comment-dialog/add-comment-dialog.component';
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.sass'],
})
export class PostDetailComponent implements OnInit {
  postId: string = '';
  post: FandomPost | null = null;
  loggedInUser: UserDTO | null = null;
  fandomCategory: string = '';
  fandomName: string = '';
  comments: FandomPostComment[] = [];

  isLoadingComments = true;
  isLoadingPost = true;

  constructor(
    private _fandomService: FandomService,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router,
    private _dialog: MatDialog,
    private _breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.postId = params['postId'] || '';
      this.fandomCategory = params['category'];
      this.fandomName = params['fandom'];

      this._breadcrumbService.set('@postName', '...');
      this.fetchComponentInfo();
    });

    // this._authService.currentUserInfo.subscribe(
    //   (user) => (this.loggedInUser = user)
    // );
  }

  fetchComponentInfo() {
    this._fandomService
      .getFandomPostById(this.postId)
      .pipe(finalize(() => (this.isLoadingPost = false)))
      .subscribe(
        (post) => {
          this.post = post;
          this._breadcrumbService.set('@postName', this.post.title);
        },
        (err) => {
          if (err.status === 404) {
            this._router.navigate([
              'fandoms',
              this.fandomCategory,
              this.fandomName,
            ]);
          }
        }
      );

    this._fandomService
      .getCommentsForPost(this.postId)
      .pipe(finalize(() => (this.isLoadingComments = false)))
      .subscribe((comments) => (this.comments = comments));
  }

  isUserInLikes(likes: IUserLikeOnlyUser[]) {
    return !!likes!.find((like) => like.user === this.loggedInUser!._id);
  }

  updatePostLikes() {
    this._fandomService.toggleLikesOrDislikes(
      this.post!.dislikes!,
      false,
      this.loggedInUser!._id!
    );
    this._fandomService.toggleLikesOrDislikes(
      this.post!.likes!,
      true,
      this.loggedInUser!._id!
    );
    this._fandomService
      .updateLikes({ isLike: true, fandomPost: this.post!._id })
      .subscribe();
  }

  updatePostDislikes() {
    this._fandomService.toggleLikesOrDislikes(
      this.post!.likes!,
      false,
      this.loggedInUser!._id!
    );
    this._fandomService.toggleLikesOrDislikes(
      this.post!.dislikes!,
      true,
      this.loggedInUser!._id!
    );
    this._fandomService
      .updateLikes({ isLike: false, fandomPost: this.post!._id })
      .subscribe();
  }

  updateCommentLikes(comment: FandomPostComment) {
    this._fandomService.toggleLikesOrDislikes(
      comment.dislikes!,
      false,
      this.loggedInUser!._id!
    );
    this._fandomService.toggleLikesOrDislikes(
      comment.likes!,
      true,
      this.loggedInUser!._id!
    );
    this._fandomService
      .updateLikes({ isLike: true, fandomComment: comment!._id })
      .subscribe();
  }

  updateCommentDislikes(comment: FandomPostComment) {
    this._fandomService.toggleLikesOrDislikes(
      comment.likes!,
      false,
      this.loggedInUser!._id!
    );
    this._fandomService.toggleLikesOrDislikes(
      comment.dislikes!,
      true,
      this.loggedInUser!._id!
    );
    this._fandomService
      .updateLikes({ isLike: false, fandomComment: comment!._id })
      .subscribe();
  }

  deletePost() {
    this._fandomService
      .deletePost(this.post!._id)
      .subscribe(() =>
        this._router.navigate([
          '/fandoms',
          this.fandomCategory,
          this.fandomName,
        ])
      );
  }

  openDeletePostDialog() {
    this._dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Post Confirmation',
        details:
          'Are you sure you want to delete this post? All associated comments will be removed as well',
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
        postId: this.post!._id,
      },
      autoFocus: false,
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newComment: FandomPostComment) => {
      if (newComment && this.postId) {
        this.comments.push(newComment);
      }
    });
  }

  deleteComment(commentId: string, index: number) {
    this._fandomService.deleteCommentById(commentId).subscribe(() => {
      this.comments.splice(index, 1);
    });
  }

  openDeleteCommentDialog(commentId: string | undefined, index: number) {
    this._dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Comment Confirmation',
        details: 'Are you sure you want to delete your comment?',
        onConfirmCb: this.deleteComment.bind(this),
        params: [commentId, index],
      },
      autoFocus: false,
      width: '450px',
      disableClose: true,
    });
  }

  openEditCommentDialog(comment: FandomPostComment, index: number) {
    const dialogRef = this._dialog.open(AddCommentDialogComponent, {
      data: {
        commentBeingEdited: {
          ...comment,
        },
      },
      autoFocus: false,
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((updatedComment: FandomPostComment) => {
      if (updatedComment) {
        this.comments[index] = updatedComment;
      }
    });
  }
}
