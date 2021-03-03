import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';
import Event from '../../shared/models/event';
import Review from '../../shared/models/review';
import { AuthService } from 'src/app/core/services/auth.service';
import PartialUserDTO from 'src/app/shared/models/partialUserDTO';
import UserDTO from 'src/app/shared/models/user-dto';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.sass'],
})
export class EventComponent implements OnInit {
  event: Event | null = null;
  reviews: Review[] = [];
  today: Date = new Date();
  isAdmin: boolean = false;
  id: number = NaN;
  user: UserDTO | null = null;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser().value;
    if (this.user && this.user.role === 'admin') {
      this.isAdmin = true;
    }

    this.user

    this.event = this.eventService.getEventsById(this.id);
    if (this.event){
        this.reviews = this.event.reviews;
    } else {
        this.reviews = [];
    }
  }

  openAddDialog(): void{
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
        data: {
            id: this.id,
            user: {
              username: this.user?.username,
              profileUrl: this.user?.profileUrl,
              role: this.user?.role
            }
        },
        width: '800px',
        maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((newReview: Event) => {
      if (newReview) {
        this.eventService.getReviewsByEventId(this.id);
      }
    });
  }

  openDeleteEventDialog(id: number | undefined) {
    this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Event Confirmation',
        details: 'Are you sure you want to delete the event?',
        onConfirmCb: this.deleteEvent.bind(this),
        params: id
      },
      width: '360px',
      height: '180px',
      autoFocus: false,
      backdropClass: 'material-dialog-backdrop',
    });
  }

  openDeleteReviewDialog(id: number | undefined) {
    this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Review Confirmation',
        details: 'Are you sure you want to delete your review?',
        onConfirmCb: this.deleteReview.bind(this),
        params: id
      },
      width: '360px',
      height: '180px',
      autoFocus: false,
      backdropClass: 'material-dialog-backdrop',
    });
  }

  openEditDialog(id: number | undefined){
    // Implement
  }

  goToAllEvents(): void{
    this.router.navigate(['events'])
  }

  setDateFromToday(offset: number): string {
    let day = this.today.getDate() + offset;
    let month = this.today.getMonth() + 1;
    let year = this.today.getFullYear();

    return day + '/' + month + '/' + year;
  }

  deleteEvent(id: number | undefined): void {
    if (id) {
        let allEvents = this.eventService.getEvents();
        let index = allEvents.findIndex((event) => event.id === id);
        this.eventService.deleteEvent(index);
        this.router.navigate(['events']);
    }
  }

  deleteReview(id: number | undefined): void {
    let allEvents = this.eventService.getEvents();
    let eventIindex = allEvents.findIndex((event) => event.id === this.id);

    if (eventIindex >= 0){
      let event = allEvents[eventIindex];
      let reviewIndex = event.reviews.findIndex((review) => review.id === id);
      this.eventService.deleteReview(eventIindex, reviewIndex);
    }
  }
}
