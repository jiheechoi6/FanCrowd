import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../core/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { EventCreateDialogComponent } from './event-create/event-create.component';
import { DeleteDialogComponent } from '../shared/components/delete-dialog/delete-dialog.component';
import { AuthService } from '../core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import Event from '../shared/models/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass'],
})
export class EventsComponent implements OnInit {
  events: Array<Event> = [];
  allEvents: Array<Event> = [];
  pageSizeOptions: number[] = [5, 10, 20, 50];
  pageSize: number = this.pageSizeOptions[1];
  pageIndex: number = 0;
  today: Date = new Date();
  isAdmin: boolean = false;
  isFromBrowser: boolean = false;
  id: number = NaN;
  categoryName: string = '';
  fandomName: string = '';
  user: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.categoryName = this.activatedRoute.snapshot.params['category'];
    this.fandomName = this.activatedRoute.snapshot.params['fandom'];
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser().value;
    if (this.user && this.user.role === 'admin') {
      this.isAdmin = true;
    }

    this.isFromBrowser = false;
    if (this.categoryName && this.fandomName) {
      if (this.categoryName.length >= 0 && this.fandomName.length >= 0) {
        this.isFromBrowser = true;
      }
    }

    if (!this.isFromBrowser) {
      this.allEvents = this.eventService.getEvents();
    } else {
      this.allEvents = this.eventService.getEventsByCategoryAndFandom(
        this.categoryName,
        this.fandomName
      );
    }

    this.events = this.allEvents.slice(0, this.pageSize);
  }

  selectPage(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    let startIndex = event.pageSize * event.pageIndex;
    let endIndex = startIndex + event.pageSize;
    this.events = this.allEvents.slice(startIndex, endIndex);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EventCreateDialogComponent, {
      data: { username: this.user.username },
      width: '800px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((newEvent: Event) => {
      if (newEvent) {
        this.events = this.eventService.getEvents();
      }
    });
  }

  openDeleteDialog(id: number | undefined) {
    this.dialog.open(DeleteDialogComponent, {
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

  goToEvent(eventId: number | undefined): void {
    this.router.navigate(['events', eventId]);
  }

  setDateFromToday(offset: number): string {
    let day = this.today.getDate() + offset;
    let month = this.today.getMonth() + 1;
    let year = this.today.getFullYear();

    return day + '/' + month + '/' + year;
  }

  deleteEvent(id: number | undefined): void {
    if (id) {
      let index = this.events.findIndex((event) => event.id === id);
      this.eventService.deleteEvent(index);

      if (this.user) {
        this.userService.removeEventFromAllUsersEvents(id);
        this.authService.removeEventFromAllUsersEvents(id);
      }

      this.events = this.eventService.getEvents();
    }
  }
}
