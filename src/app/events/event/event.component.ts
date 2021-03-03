import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';
import Event from '../../shared/models/event';
import Review from '../../shared/models/review';

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
  username: string = "";

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.event = this.eventService.getEventsById(this.id);
    if (this.event){
        this.reviews = this.event.reviews;
    } else {
        this.reviews = [];
    }

    this.username = this.activatedRoute.snapshot.params['username'];
    if (this.username && this.username.toLowerCase().includes('admin')) {
      this.isAdmin = true;
    }
  }

  openAddDialog(): void{
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
        data: {
            id: this.id
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

  openDeleteDialog(id: number | undefined) {
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
    // TODO: Implement this
  }
}
