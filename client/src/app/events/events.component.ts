import { Component, OnInit } from '@angular/core';
import { EventService } from '../core/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { EventCreateDialogComponent } from './event-create-dialog/event-create-dialog.component';
import { AuthService } from '../core/services/auth.service';
import Event from '../shared/models/event';
import UserDTO from '../shared/models/user-dto';
import UserIdentity from '../shared/models/user-identity';

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
  user: UserDTO | UserIdentity |null = null;

  constructor(
    private _authService: AuthService,
    private _eventService: EventService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this._authService.getCurrentUser().value;
    this._eventService.getEvents().subscribe((events) => {
      console.log("Events", events);
      this.allEvents = events;
      this.events = this.allEvents.slice(0, this.pageSize);
    });
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
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newEvent: Event) => {
      if (newEvent) {
        this._eventService.getEvents().subscribe((events) => {
          this.events = events;
        });
      }
    });
  }
}
