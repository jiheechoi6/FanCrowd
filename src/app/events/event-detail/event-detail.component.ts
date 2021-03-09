import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { EditReviewDialogComponent } from '../edit-review-dialog/edit-review-dialog.component';
import { UserService } from 'src/app/core/services/user.service';
import { Location } from '@angular/common';
import Event from '../../shared/models/event';
import Review from '../../shared/models/review';
import EventDTO from 'src/app/shared/models/event-dto';
import UserDTO from 'src/app/shared/models/user-dto';

@Component({
  selector: 'app-event',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.sass'],
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  reviews: Review[] | null = [];
  today: Date = new Date();
  isAdmin: boolean = false;
  isAttending: boolean = false;
  id: number = NaN;
  user: UserDTO | null = null;
  wroteReview: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    // TODO: We get user from the AUTH service but when attending we're adding to the USER service
    this.user = this.authService.getCurrentUser().value;
    if (this.user) {
      if (this.user.role === 'admin') {
        this.isAdmin = true;
      }

      this.isAttending = false;
      let index = this.user.attendingEvents.findIndex(
        (event) => event.id === this.id
      );

      if (index >= 0) {
        this.isAttending = true;
      }
    }

    this.event = this.eventService.getEventsById(this.id);
    if (this.event) {
      this.reviews = this.event.reviews;
      this.alreadyWroteReview(this.reviews);
    } else {
      this.reviews = [];
    }
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
    });

    dialogRef.afterClosed().subscribe((newReview: Review) => {
      if (newReview) {
        this.reviews = this.eventService.getReviewsByEventId(this.id);
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
    });

    dialogRef.afterClosed().subscribe(() => {
      this.reviews = this.eventService.getReviewsByEventId(this.id);
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
          this.reviews = this.eventService.getReviewsByEventId(this.id);
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

  goBack(): void {
    this.location.back();
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
        this.userService.updateUserEventsByUsername(
          this.user.username,
          eventDTO
        );
        this.authService.updateUserEventsByUsername(
          this.user.username,
          eventDTO
        );
        this.eventService.updateEventAttendance(
          this.event.id,
          this.isAttending
        );
        this.event = this.eventService.getEventsById(this.id);
      }
    }
  }

  removeEventFromProfile(eventId: number | undefined): void {
    this.isAttending = false;
    if (this.user && this.event) {
      this.userService.removeEventFromUserEvents(
        this.user.username,
        this.event.id
      );
      this.authService.removeEventFromUserEvents(
        this.user.username,
        this.event.id
      );
      this.eventService.updateEventAttendance(this.event.id, this.isAttending);
      this.event = this.eventService.getEventsById(this.id);
    }
  }

  deleteEvent(id: number | undefined): void {
    if (id) {
      let allEvents = this.eventService.getEvents();
      let index = allEvents.findIndex((event) => event.id === id);

      this.eventService.deleteEvent(index);

      if (this.user && this.event) {
        this.userService.removeEventFromAllUsersEvents(this.event.id);
        this.authService.removeEventFromAllUsersEvents(this.event.id);
      }

      this.router.navigate(['events']);
    }
  }

  deleteReview(id: number | undefined): void {
    let allEvents = this.eventService.getEvents();
    let eventIindex = allEvents.findIndex((event) => event.id === this.id);

    if (eventIindex >= 0) {
      let event = allEvents[eventIindex];
      let reviewIndex = event.reviews.findIndex((review) => review.id === id);
      this.eventService.deleteReview(eventIindex, reviewIndex);
    }
  }

  counter(i: number) {
    return new Array(i);
  }
}
