import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../create-review-dialog/create-review-dialog.component';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { EditReviewDialogComponent } from '../edit-review-dialog/edit-review-dialog.component';
import { EventCreateDialogComponent } from '../event-create-dialog/event-create-dialog.component';
import { BreadcrumbService } from 'xng-breadcrumb';
import { UserIdentity } from 'src/app/shared/models/user-identity-token';
import ReviewDTO from 'src/app/shared/models/review-dto';
import Event from '../../shared/models/event';
import Review, { IEventReviewSummary } from '../../shared/models/review';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-event',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.sass'],
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  reviews: Review[] = [];
  today: Date = new Date();
  isAttending: boolean = false;
  id: string = '';
  user: UserIdentity | null = null;
  wroteReview: boolean = false;
  reviewSummary: IEventReviewSummary | null = null;

  isLoadingEvent = true;
  isLoadingReviews = true;

  constructor(
    private _authService: AuthService,
    private _eventService: EventService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _breadcrumbService: BreadcrumbService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._authService.currentUser.subscribe((user) => {
      this.user = user;
    });

    this._activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.fetchComponentInfo();
    });
  }

  fetchComponentInfo() {
    this._eventService
      .isUserAttendingEvent(this.id)
      .subscribe((isAttending) => (this.isAttending = isAttending));

    this._eventService
      .getEventById(this.id)
      .pipe(finalize(() => (this.isLoadingEvent = false)))
      .subscribe(
        (event) => {
          this.event = event;
          this._breadcrumbService.set('@eventName', this.event.name);

          this._eventService
            .getReviewsByEventId(this.event!._id!)
            .pipe(finalize(() => (this.isLoadingReviews = false)))
            .subscribe((reviewsAndSummary) => {
              this.reviews = reviewsAndSummary.reviews;
              this.reviewSummary = reviewsAndSummary.summary;
              this.hasWrittenReview();
            });
        },
        (err) => {
          if (err.status === 404) {
            this._router.navigate(['/events']);
          }
        }
      );
  }

  openAddReviewDialog() {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      data: {
        eventId: this.id,
      },
      width: '800px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .subscribe(
        (reviewAndSummary: {
          review: Review;
          reviewSummary: IEventReviewSummary;
        }) => {
          if (reviewAndSummary) {
            this.reviewSummary = reviewAndSummary.reviewSummary;
            this.reviews.push(reviewAndSummary.review);
            this.wroteReview = true;
            this._snackBar.open(`Review has been created!`, 'X', {
              panelClass: ['snackbar'],
              horizontalPosition: 'left',
              duration: 2500,
            });
          }
        }
      );
  }

  openDeleteEventDialog() {
    this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Event Confirmation',
        details:
          'Are you sure you want to delete the event? All associated reviews will also be deleted',
        onConfirmCb: this.deleteEvent.bind(this),
        params: [this.event!._id],
      },
      width: '360px',
      height: '180px',
      autoFocus: false,
      disableClose: true,
    });
  }

  openDeleteReviewDialog(id: string, index: number) {
    this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Review Confirmation',
        details: 'Are you sure you want to delete your review?',
        onConfirmCb: this.deleteReview.bind(this),
        params: [id, index],
      },
      width: '360px',
      height: '180px',
      autoFocus: false,
      disableClose: true,
    });
  }

  openEditReviewDialog(currentReview: Review, index: number) {
    let updatedReview: ReviewDTO = {
      title: currentReview.title,
      content: currentReview.content,
      rating: currentReview.rating,
      event: this.id,
    };

    const dialogRef = this.dialog.open(EditReviewDialogComponent, {
      data: { reviewId: currentReview._id, review: updatedReview },
      autoFocus: false,
      width: '450px',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .subscribe(
        (updatedReviewAndSummary: {
          updatedReview: Review;
          updatedSummary: IEventReviewSummary;
        }) => {
          if (updatedReviewAndSummary) {
            this.reviews[index] = updatedReviewAndSummary.updatedReview;
            this.reviewSummary = updatedReviewAndSummary.updatedSummary;
            this._snackBar.open(`Review has been updated!`, 'X', {
              panelClass: ['snackbar'],
              horizontalPosition: 'left',
              duration: 2500,
            });
          }
        }
      );
  }

  hasWrittenReview() {
    this.wroteReview = !!this.reviews.find(
      (review) => review.postedBy.username === this.user!.username
    );
  }

  attendEvent() {
    this._eventService.createAttendee(this.event!._id).subscribe(() => {
      this.isAttending = true;
      this.event!.totalAttendance += 1;
      this._snackBar.open(`Event has been added to your calendar!`, 'X', {
        panelClass: ['snackbar'],
        horizontalPosition: 'left',
        duration: 2500,
      });
    });
  }

  unattendEvent() {
    this._eventService.deleteAttendee(this.event!._id!).subscribe(() => {
      this.isAttending = false;
      this.event!.totalAttendance -= 1;
      this._snackBar.open(`Event has been removed from your calendar!`, 'X', {
        panelClass: ['snackbar'],
        horizontalPosition: 'left',
        duration: 2500,
      });
    });
  }

  deleteEvent(id: string) {
    this._eventService.deleteReviews(id).subscribe(() => {
      this._eventService.deleteAttendees(id).subscribe(() => {
        this._eventService.deleteEvent(id).subscribe(() => {
          this._snackBar.open(`Event has been deleted!`, 'X', {
            panelClass: ['snackbar'],
            horizontalPosition: 'left',
            duration: 2500,
          });
          this._router.navigate(['/events']);
        });
      });
    });
  }

  deleteReview(id: string, index: number) {
    this._eventService
      .deleteReview(id)
      .subscribe((updatedReviewSummary: IEventReviewSummary) => {
        this.reviews.splice(index, 1);
        this.reviewSummary = updatedReviewSummary;
        this.wroteReview = false;
        this._snackBar.open(`Review has been deleted!`, 'X', {
          panelClass: ['snackbar'],
          horizontalPosition: 'left',
          duration: 2500,
        });
      });
  }

  openEditEventDialog() {
    const dialogRef = this.dialog.open(EventCreateDialogComponent, {
      data: { eventBeingUpdated: { ...this.event } },
      width: '800px',
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((updatedEvent: Event) => {
      if (updatedEvent) {
        this.event = updatedEvent;
        this._breadcrumbService.set('@eventName', this.event.name);
        this._snackBar.open(`Event details has been updated!`, 'X', {
          panelClass: ['snackbar'],
          horizontalPosition: 'left',
          duration: 2500,
        });
      }
    });
  }

  roundPercent(percent: number) {
    return Math.floor(percent);
  }
}
