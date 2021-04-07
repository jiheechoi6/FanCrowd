import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import { FandomService } from 'src/app/core/services/fandom.service';
import Fandom from 'src/app/shared/models/fandom';
import {
  FandomPost,
  IUserLikeOnlyUser,
} from 'src/app/shared/models/fandom-post';
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';
import Event from 'src/app/shared/models/event';
import { finalize } from 'rxjs/operators';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from 'src/app/shared/components/add-dialog/add-dialog.component';
import { Subscription } from 'rxjs';
import { UserIdentity } from 'src/app/shared/models/user-identity-token';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-fandom-detail',
  templateUrl: './fandom-detail.component.html',
  styleUrls: ['./fandom-detail.component.sass'],
})
export class FandomDetailComponent implements OnInit {
  events: Event[] = [];
  fandomCategory: string = '';
  fandomName: string = '';
  posts: FandomPost[] = [];
  loggedInUser: UserIdentity | null = null;
  fandom: Fandom | null = null;
  hasUserJoinedFandom = false;

  userSubscription!: Subscription;

  isLoadingEvents = true;
  isLoadingPosts = true;

  constructor(
    private _authService: AuthService,
    private _eventService: EventService,
    private _activatedRoute: ActivatedRoute,
    private _fandomService: FandomService,
    private _dialog: MatDialog,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _globalService: GlobalService
  ) {}

  ngOnInit() {
    this.userSubscription = this._authService.currentUser.subscribe(
      (user) => (this.loggedInUser = user)
    );

    this._activatedRoute.params.subscribe((params) => {
      this.fandomCategory = params['category'];
      this.fandomName = params['fandom'];
      this.fetchComponentInfo();
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  fetchComponentInfo() {
    this._fandomService
      .getFandomByName(this.fandomCategory, this.fandomName)
      .subscribe(
        (fandom) => {
          this.fandom = fandom;
          this._fandomService
            .isUserInFandom(this.fandom!._id)
            .subscribe(
              (hasJoinedFandom) => (this.hasUserJoinedFandom = hasJoinedFandom)
            );
        },
        (err) => {
          if (err.status === 404) {
            this._router.navigate(['/fandoms', this.fandomCategory]);
          }
        }
      );

    this._eventService
      .getEventsByCategoryAndFandom(this.fandomCategory, this.fandomName)
      .pipe(finalize(() => (this.isLoadingEvents = false)))
      .subscribe((events) => {
        this.events = events;
      });

    this._fandomService
      .getPostsForFandom(this.fandomCategory, this.fandomName)
      .pipe(finalize(() => (this.isLoadingPosts = false)))
      .subscribe((posts) => (this.posts = posts));
  }

  toggleFandomJoin() {
    this.hasUserJoinedFandom = !this.hasUserJoinedFandom;
    if (this.hasUserJoinedFandom) {
      this._fandomService.joinFandom(this.fandom!._id).subscribe(() => {
        this._snackBar.open(
          `Joined ${this._globalService.toTitleCase(this.fandom!.name)} fandom`,
          'X',
          {
            panelClass: ['snackbar'],
            horizontalPosition: 'left',
            duration: 1000,
          }
        );
      });
    } else {
      this._fandomService.leaveFandom(this.fandom!._id).subscribe(() => {
        this._snackBar.open(
          `Left ${this._globalService.toTitleCase(this.fandom!.name)} fandom`,
          'X',
          {
            panelClass: ['snackbar'],
            horizontalPosition: 'left',
            duration: 1000,
          }
        );
      });
    }
  }

  openCreatePostDialog() {
    const dialogRef = this._dialog.open(CreatePostDialogComponent, {
      data: {
        fandomId: this.fandom!._id,
      },
      autoFocus: false,
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newPost: FandomPost) => {
      if (newPost) {
        this.posts.push(newPost);
        this._snackBar.open(`Post has been created!`, 'X', {
          panelClass: ['snackbar'],
          horizontalPosition: 'left',
          duration: 2500,
        });
      }
    });
  }

  deleteFandom() {
    this._fandomService.deleteFandomById(this.fandom!._id).subscribe(() => {
      this._snackBar.open(
        `${this._globalService.toTitleCase(
          this.fandom!.name
        )} has been deleted`,
        'X',
        {
          panelClass: ['snackbar'],
          horizontalPosition: 'left',
          duration: 2500,
        }
      );
      this._router.navigate(['/fandoms', this.fandomCategory]);
    });
  }

  openDeleteFandomDialog() {
    this._dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Fandom Confirmation',
        details:
          'Are you sure you want to delete this fandom? All associated posts and comments will be removed as well',
        onConfirmCb: this.deleteFandom.bind(this),
      },
      autoFocus: false,
      width: '450px',
      disableClose: true,
    });
  }

  openEditFandomDialog() {
    const dialogRef = this._dialog.open(AddDialogComponent, {
      data: {
        title: 'Fandom',
        isEditing: true,
        fandom: this.fandom,
      },
      width: '360px',
      height: '300px',
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((updatedFandom: Fandom) => {
      if (updatedFandom) {
        this._snackBar.open(`Fandom details have been updated`, 'X', {
          panelClass: ['snackbar'],
          horizontalPosition: 'left',
          duration: 2500,
        });
        this._router.navigate([
          '/fandoms',
          this.fandomCategory,
          updatedFandom.name.split(' ').join('-'),
        ]);
      }
    });
  }

  isUserInLikes(likes: IUserLikeOnlyUser[]) {
    return !!likes!.find((like) => like.user === this.loggedInUser!._id);
  }

  updatePostLikes(post: FandomPost) {
    this._fandomService.toggleLikesOrDislikes(
      post.dislikes!,
      false,
      this.loggedInUser!._id!
    );

    this._fandomService.toggleLikesOrDislikes(
      post.likes!,
      true,
      this.loggedInUser!._id!
    );

    this._fandomService
      .updateLikes({ isLike: true, fandomPost: post!._id })
      .subscribe();
  }

  updatePostDislikes(post: FandomPost) {
    this._fandomService.toggleLikesOrDislikes(
      post.likes!,
      false,
      this.loggedInUser!._id!
    );
    this._fandomService.toggleLikesOrDislikes(
      post.dislikes!,
      true,
      this.loggedInUser!._id!
    );
    this._fandomService
      .updateLikes({ isLike: false, fandomPost: post!._id })
      .subscribe();
  }
}
