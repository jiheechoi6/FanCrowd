import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import { FandomService } from 'src/app/core/services/fandom.service';
import { UserService } from 'src/app/core/services/user.service';
import Fandom from 'src/app/shared/models/fandom';
import { FandomPost } from 'src/app/shared/models/fandom-post';
import UserDTO from 'src/app/shared/models/user-dto';
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';
import Event from 'src/app/shared/models/event';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-fandom-detail',
  templateUrl: './fandom-detail.component.html',
  styleUrls: ['./fandom-detail.component.sass'],
})
export class FandomDetailComponent implements OnInit {
  eventsForFandom: Event[] = [];
  fandomCategory: string = '';
  fandomName: string = '';
  postsForFandom: FandomPost[] = [];
  loggedInUser: UserDTO | null = null;
  fandom: Fandom | null = null;
  hasUserJoinedFandom = false;

  isLoadingEvents = true;
  isLoadingPosts = true;

  constructor(
    private _authService: AuthService,
    private _eventService: EventService,
    private _activatedRoute: ActivatedRoute,
    private _fandomService: FandomService,
    private _dialog: MatDialog,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._authService.currentUser.subscribe(
      (user) => (this.loggedInUser = user)
    );

    this._activatedRoute.params.subscribe((params) => {
      this.fandomCategory = params['category'];
      this.fandomName = params['fandom'];

      this.fetchComponentInfo();

      this.hasUserJoinedFandom = this._userService.hasUserJoinedFandom(
        this.loggedInUser?.username || '',
        this.fandomName || ''
      );
    });
  }

  fetchComponentInfo() {
    this._fandomService
      .getFandomByName(this.fandomCategory, this.fandomName)
      .subscribe(
        (fandom) => (this.fandom = fandom),
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
        this.eventsForFandom = events;
      });

    this._fandomService
      .getPostsForFandom(this.fandomCategory, this.fandomName)
      .pipe(finalize(() => (this.isLoadingPosts = false)))
      .subscribe((posts) => (this.postsForFandom = posts));
  }

  joinFandom() {
    this._userService.addFandomToUser(
      this.loggedInUser?.username || '',
      this.fandom
    );

    this.hasUserJoinedFandom = true;
  }

  removeFromFandom() {
    // this._userService.removeFandomFromUser(
    //   this.loggedInUser?.username || '',
    //   this.fandom?._id
    // );

    this.hasUserJoinedFandom = false;
  }

  openCreatePostDialog() {
    const dialogRef = this._dialog.open(CreatePostDialogComponent, {
      data: {
        userCreatingEvent: {
          role: this.loggedInUser?.role,
          username: this.loggedInUser?.username,
          profileUrl: this.loggedInUser?.profileUrl,
        },
        fandomId: this.fandom?._id,
      },
      autoFocus: false,
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newPost: FandomPost) => {
      if (newPost) {
        this.postsForFandom.push(newPost);
      }
    });
  }

  updatePostLikes(post: FandomPost) {
    // post.numLikes += 1;
    // this._fandomService.updatePostForFandom(post.id, post);
  }

  updatePostDislikes(post: FandomPost) {
    // post.numDislikes += 1;
    // this._fandomService.updatePostForFandom(post.id, post);
  }
}
