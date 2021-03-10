import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../create-review-dialog/create-review-dialog.component';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { EditReviewDialogComponent } from '../edit-review-dialog/edit-review-dialog.component';
import { UserService } from 'src/app/core/services/user.service';
import Event from '../../shared/models/event';
import Review from '../../shared/models/review';
import EventDTO from 'src/app/shared/models/event-dto';
import UserDTO from 'src/app/shared/models/user-dto';
import { EventCreateDialogComponent } from '../event-create-dialog/event-create-dialog.component';

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
  id: number = NaN;
  user: UserDTO | null = null;
  wroteReview: boolean = false;
  avgRating = 0;
  groupedReviews: { [key: number]: Review[] } = {};

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _eventService: EventService,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private _router: Router
  ) {
    this.id = parseInt(this._activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.user = this._authService.getCurrentUser().value;
    if (this.user) {
      this.isAttending = false;
      let index = this.user.attendingEvents.findIndex(
        (event) => event.id === this.id
      );

      if (index >= 0) {
        this.isAttending = true;
      }
    }

    this.event = this._eventService.getEventsById(this.id);
    if (this.event) {
      this.reviews = this.event.reviews;
      this.alreadyWroteReview(this.reviews);
    } else {
      this.reviews = [];
    }

    this.calculateAvgRating();
    this.groupReviewsByRating();
  }

  openAddReviewDialog(): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      data: {
        id: this.id,
        user: {
          username: this.user?.username,
          profileUrl: this.user?.profileUrl,
          role: this.user?.role,
        },
      },
      width: '800px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((newReview: Review) => {
      if (newReview) {
        this.reviews = this._eventService.getReviewsByEventId(this.id);
        this.alreadyWroteReview(this.reviews);
      }
    });
  }

  openDeleteEventDialog(id: number | undefined) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Event Confirmation',
        details: 'Are you sure you want to delete the event?',
        onConfirmCb: this.deleteEvent.bind(this),
        params: id,
      },
      width: '360px',
      height: '180px',
      autoFocus: false,
      disableClose: true,
    });
  }

  openDeleteReviewDialog(id: number | undefined) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Review Confirmation',
        details: 'Are you sure you want to delete your review?',
        onConfirmCb: this.deleteReview.bind(this),
        params: id,
      },
      width: '360px',
      height: '180px',
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.reviews = this._eventService.getReviewsByEventId(this.id);
      this.alreadyWroteReview(this.reviews);
    });
  }

  openEditDialog(id: number | undefined) {
    if (this.reviews) {
      let index = this.reviews?.findIndex((review) => review.id === id);
      let review = { ...this.reviews[index] };

      const dialogRef = this.dialog.open(EditReviewDialogComponent, {
        data: { eventId: this.id, review: review },
        autoFocus: false,
        width: '450px',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((updatedReview: Review) => {
        if (updatedReview) {
          this.reviews = this._eventService.getReviewsByEventId(this.id);
          this.alreadyWroteReview(this.reviews);
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
    let eventDTO: EventDTO;

    if (this.event) {
      eventDTO = {
        name: this.event?.name,
        date: this.event.startDate,
        totalAttending: this.event.totalAttendance + 1,
        id: this.event.id,
      };

      if (this.user) {
        this._userService.updateUserEventsByUsername(
          this.user.username,
          eventDTO
        );
        this._authService.updateUserEventsByUsername(
          this.user.username,
          eventDTO
        );
        this._eventService.updateEventAttendance(
          this.event.id,
          this.isAttending
        );
        this.event = this._eventService.getEventsById(this.id);
      }
    }
  }

  removeEventFromProfile(eventId: number | undefined): void {
    this.isAttending = false;
    if (this.user && this.event) {
      this._userService.removeEventFromUserEvents(
        this.user.username,
        this.event.id
      );
      this._authService.removeEventFromUserEvents(
        this.user.username,
        this.event.id
      );
      this._eventService.updateEventAttendance(this.event.id, this.isAttending);
      this.event = this._eventService.getEventsById(this.id);
    }
  }

  deleteEvent(id: number | undefined): void {
    if (id) {
      let allEvents = this._eventService.getEvents();
      let index = allEvents.findIndex((event) => event.id === id);

      this._eventService.deleteEvent(index);

      if (this.user && this.event) {
        this._userService.removeEventFromAllUsersEvents(this.event.id);
        this._authService.removeEventFromAllUsersEvents(this.event.id);
      }

      this._router.navigate(['events']);
    }
  }

  deleteReview(id: number | undefined): void {
    let allEvents = this._eventService.getEvents();
    let eventIindex = allEvents.findIndex((event) => event.id === this.id);

    if (eventIindex >= 0) {
      let event = allEvents[eventIindex];
      let reviewIndex = event.reviews.findIndex((review) => review.id === id);
      this._eventService.deleteReview(eventIindex, reviewIndex);
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
        console.log('here in dialog close', updatedEvent);
        this._eventService.updateEventById(updatedEvent.id, updatedEvent);
        this.event = updatedEvent;
      }
    });
  }

  calculateAvgRating() {
    const totalRatings =
      this.reviews?.reduce((total, review) => total + review.rating, 0) || 0;

    this.avgRating = Math.round(totalRatings / this.reviews.length);
  }

  groupReviewsByRating() {
    this.groupedReviews = this.reviews.reduce(
      (rv: { [key: number]: Review[] }, review) => {
        (rv[review['rating']] = rv[review['rating']] || []).push(review);
        return rv;
      },
      {}
    );

    for (let i = 1; i <= 5; i++) {
      if (!this.groupedReviews[i]) {
        this.groupedReviews[i] = [];
      }
    }
  }
}
