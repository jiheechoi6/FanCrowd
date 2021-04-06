import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../create-review-dialog/create-review-dialog.component';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { EditReviewDialogComponent } from '../edit-review-dialog/edit-review-dialog.component';
import { UserService } from 'src/app/core/services/user.service';
import { EventCreateDialogComponent } from '../event-create-dialog/event-create-dialog.component';
import { BreadcrumbService } from 'xng-breadcrumb';
import UserIdentity from 'src/app/shared/models/user-identity';
import ReviewDTO from 'src/app/shared/models/review-dto';
import Event from '../../shared/models/event';
import Review from '../../shared/models/review';
import EventDTO from 'src/app/shared/models/event-dto';
import Attendee from 'src/app/shared/models/attendee';

@Component({
  selector: 'app-event',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.sass'],
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  reviews: Review[] = [];
  attendees: Attendee[] = [];
  today: Date = new Date();
  isAttending: boolean = false;
  id: string = "";
  user: UserIdentity | null = null;
  wroteReview: boolean = false;
  avgRating = 0;
  groupedReviews: { [key: number]: Review[] } = {};

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _eventService: EventService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _breadcrumbService: BreadcrumbService,
    public dialog: MatDialog,
  ) {
    this._activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.user = this._authService.getCurrentUser().value;
    if (this.user) {
      this._eventService.getAttendees(this.id).subscribe((attendees) => {
        this.isAttending = false;
        this.attendees = attendees;
        this.attendees.forEach((attendee) => {
          if (this.user?._id === attendee.user){
            this.isAttending = true;
          }
        });
      });
    }

    this._eventService.getEventById(this.id).subscribe((event) => {
      this.event = event;
      this.reviews = [];

      if (this.event) {
        this._breadcrumbService.set('@eventName', this.event.name);
        this._eventService.getReviewsByEventId(this.id).subscribe((reviews) => {
          this.reviews = reviews;
          this.alreadyWroteReview(this.reviews);
          this.calculateAvgRating();
          this.groupReviewsByRating();
        });
      }
    });
  }

  openAddReviewDialog(): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      data: {
        eventId: this.id
      },
      width: '800px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((newReview: Review) => {
      if (newReview) {
        this._eventService.getReviewsByEventId(this.id).subscribe(
          (reviews) => {
            this.reviews = reviews;
            this.alreadyWroteReview(this.reviews);
            this.calculateAvgRating();
            this.groupReviewsByRating();
          }
        );
      }
    });
  }

  openDeleteEventDialog(id: string | undefined) {
    this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Event Confirmation',
        details: 'Are you sure you want to delete the event?',
        onConfirmCb: this.deleteEvent.bind(this),
        params: [id],
      },
      width: '360px',
      height: '180px',
      autoFocus: false,
      disableClose: true,
    });
  }

  openDeleteReviewDialog(id: string | undefined) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Review Confirmation',
        details: 'Are you sure you want to delete your review?',
        onConfirmCb: this.deleteReview.bind(this),
        params: [id],
      },
      width: '360px',
      height: '180px',
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this._eventService.getReviewsByEventId(this.id).subscribe(
        (reviews) => {
          this.reviews = reviews;
          this.alreadyWroteReview(this.reviews);
          this.calculateAvgRating();
          this.groupReviewsByRating();
        }
      );
    });
  }

  openEditDialog(currentReview: Review) {
    if (currentReview) {
      let updatedReview: ReviewDTO = {
        title: currentReview.title,
        content: currentReview.content,
        rating: currentReview.rating,
        event: this.id
      };

      const dialogRef = this.dialog.open(EditReviewDialogComponent, {
        data: { reviewId: currentReview._id, review: updatedReview },
        autoFocus: false,
        width: '450px',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((updatedReview: Review) => {
        if (updatedReview) {
          this._eventService.getReviewsByEventId(this.id).subscribe(
            (reviews) => {
              this.reviews = reviews;
              this.alreadyWroteReview(this.reviews);
              this.calculateAvgRating();
              this.groupReviewsByRating();
            }
          );
        }
      });
    }
  }

  alreadyWroteReview(reviews: Review[] | null): void {
    this.wroteReview = false;

    if (reviews) {
      let reviewIndex = reviews.findIndex(
        (review) => review.postedBy.username === this.user?.username
      );
      if (reviewIndex >= 0) {
        this.wroteReview = true;
      }
    }
  }

  addEventToProfile(): void {
    this.isAttending = true;

    if (this.event && this.user) {
      let newAttendee: Attendee = {
        user: this.user?._id,
        event: this.id
      };

      this._eventService.createAttendee(this.id, newAttendee).subscribe((attendee) => {
        if (attendee){
          this.isAttending = true;
        }
      });
    }
  }

  removeEventFromProfile(eventId: string | undefined): void {
    if (this.user && this.event) {
      this.attendees.forEach((attendee: Attendee) => {
        if (attendee.user === this.user?._id && this.event?._id === eventId){
          if (attendee._id) {
            this._eventService.deleteAttendee(attendee._id).subscribe(() => {
              this.isAttending = false;
            });
          }
        }
      });
    }
  }

  deleteEvent(id: string | undefined): void {
    if (id) {
      let allEvents;
      let index;

      this._eventService.getEvents().subscribe((events) => {
        allEvents = events;
        index = allEvents.findIndex((event) => event._id === id);
        this._eventService.deleteEvent(id);
      });

      if (this.user && this.event) {
        this._userService.removeEventFromAllUsersEvents(this.event._id);
        this._authService.removeEventFromAllUsersEvents(this.event._id);
      }

      this._router.navigate(['events']);
    }
  }

  deleteReview(id: string | undefined): void {
    if (id){
      this._eventService.deleteReview(id).subscribe(() => {});
    }
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
        this._eventService.getEventById(updatedEvent._id).subscribe((updatedEvent) => {
          this.event = updatedEvent;
        });
      }
    });
  }

  calculateAvgRating() {
    const totalRatings =
      this.reviews.reduce((total, review) => total + review.rating, 0) || 0;

    this.avgRating =
      this.reviews.length === 0
        ? 0
        : Math.floor(totalRatings / this.reviews.length);
  }

  roundPercent(percent: number) {
    return Math.floor(percent);
  }

  groupReviewsByRating() {
    this.groupedReviews = this.reviews.reduce(
      (rv: { [key: number]: Review[] }, review) => {
        (rv[review['rating']] = rv[review['rating']] || []).push(review);
        return rv;
      },
      {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
      }
    );
  }
}
