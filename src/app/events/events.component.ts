import { Component, OnInit } from '@angular/core';
import { EventService } from '../core/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { EventCreateDialogComponent } from './event-create-dialog/event-create-dialog.component';
import { DeleteDialogComponent } from '../shared/components/delete-dialog/delete-dialog.component';
import { AuthService } from '../core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import Event from '../shared/models/event';
import UserDTO from '../shared/models/user-dto';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass'],
})
export class EventsComponent implements OnInit {
  events: Array<Event> = [];
  allEvents: Array<Event> = [];
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize: number = this.pageSizeOptions[1];
  pageIndex: number = 0;
  today: Date = new Date();
  user: UserDTO | null = null;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _eventService: EventService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this._authService.getCurrentUser().value;
    this.allEvents = this._eventService.getEvents();
    this.events = this.allEvents.slice(0, this.pageSize);
  }

  selectPage(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    let startIndex = event.pageSize * event.pageIndex;
    let endIndex = startIndex + event.pageSize;
    this.events = this.allEvents.slice(startIndex, endIndex);
  }

  openCreateEventDialog(): void {
    const dialogRef = this.dialog.open(EventCreateDialogComponent, {
      data: { username: this.user?.username },
      width: '800px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((newEvent: Event) => {
      if (newEvent) {
        this.events = this._eventService.getEvents();
      }
    });
  }

  openDeleteEventDialog(id: number | undefined) {
    this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Event Confirmation',
        details: 'Are you sure you want to delete this event?',
        onConfirmCb: this.deleteEvent.bind(this),
        params: id,
      },
      width: '360px',
      height: '180px',
      autoFocus: false,
    });
  }

  deleteEvent(id: number | undefined): void {
    if (id) {
      let index = this.events.findIndex((event) => event.id === id);
      this._eventService.deleteEvent(index);

      if (this.user) {
        this._userService.removeEventFromAllUsersEvents(id);
        this._authService.removeEventFromAllUsersEvents(id);
      }

      this.events = this._eventService.getEvents();
    }
  }
}
