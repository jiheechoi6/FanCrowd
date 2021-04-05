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
import { BreadcrumbService } from 'xng-breadcrumb';

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
    private _router: Router,
    private _breadcrumbService: BreadcrumbService
  ) {
    this._activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
    });
  }

  ngOnInit(): void {
    // this.user = this._authService.getCurrentUser().value;
    if (this.user) {
      this.isAttending = false;
      let index = this.user.attendingEvents.findIndex(
        (event) => event.id === this.id
      );

      if (index >= 0) {
        this.isAttending = true;
      }
    }

    this._eventService.getEventById(this.id.toString()).subscribe((event) => {
      this.event = event;
    });
    if (this.event) {
      this._breadcrumbService.set('@eventName', this.event.name);
      // this.reviews = this.event.reviews;
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
        this._eventService.getReviewsByEventId(this.id.toString()).subscribe(
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

  openDeleteEventDialog(id: number | undefined) {
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
      this._eventService.getReviewsByEventId(this.id.toString()).subscribe(
        (reviews) => {
          this.reviews = reviews;
          this.alreadyWroteReview(this.reviews);
          this.calculateAvgRating();
          this.groupReviewsByRating();
        }
      );
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
          this._eventService.getReviewsByEventId(this.id.toString()).subscribe(
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
    let eventDTO: EventDTO;

    if (this.event) {
      eventDTO = {
        name: this.event?.name,
        date: this.event.startDate,
        totalAttending: this.event.totalAttendance + 1,
        id: this.event._id!,
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
          this.event._id,
          this.isAttending
        );
        this._eventService.getEventById(this.id.toString()).subscribe((event) => {
          this.event = event;
        });
      }
    }
  }

  removeEventFromProfile(eventId: number | undefined): void {
    this.isAttending = false;
    if (this.user && this.event) {
      this._userService.removeEventFromUserEvents(
        this.user.username,
        this.event._id
      );
      this._authService.removeEventFromUserEvents(
        this.user.username,
        this.event._id
      );
      this._eventService.updateEventAttendance(
        this.event._id,
        this.isAttending
      );
      this._eventService.getEventById(this.id.toString()).subscribe((event) => {
        this.event = event;
      });
    }
  }

  deleteEvent(id: number | undefined): void {
    if (id) {
      let allEvents;
      let index;

      this._eventService.getEvents().subscribe((events) => {
        allEvents = events;
        index = allEvents.findIndex((event) => event._id === id);
        this._eventService.deleteEvent(index);
      });

      if (this.user && this.event) {
        this._userService.removeEventFromAllUsersEvents(this.event._id);
        this._authService.removeEventFromAllUsersEvents(this.event._id);
      }

      this._router.navigate(['events']);
    }
  }

  deleteReview(id: number | undefined): void {
    let allEvents;
    let eventIndex;
    this._eventService.getEvents().subscribe((events) => {
      allEvents = events;
      eventIndex = allEvents.findIndex((event) => event._id === this.id);

      if (eventIndex >= 0) {
        let event = allEvents[eventIndex];
        // let reviewIndex = event.reviews.findIndex((review) => review.id === id);
        // this._eventService.deleteReview(eventIindex, reviewIndex);
      }
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
        this._eventService.updateEventById(updatedEvent._id, updatedEvent);
        this.event = updatedEvent;
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
