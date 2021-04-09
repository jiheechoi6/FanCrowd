import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../core/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { EventCreateDialogComponent } from './event-create-dialog/event-create-dialog.component';
import { AuthService } from '../core/services/auth.service';
import Event from '../shared/models/event';
import { UserIdentity } from 'src/app/shared/models/user-identity-token';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from '../core/services/global.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass'],
})
export class EventsComponent implements OnInit, OnDestroy {
  events: Array<Event> = [];
  allEvents: Array<Event> = [];
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize: number = this.pageSizeOptions[1];
  pageIndex: number = 0;
  today: Date = new Date();
  user: UserIdentity | null = null;

  isLoadingEvents = true;
  userSubscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private _eventService: EventService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _globalService: GlobalService
  ) {}

  ngOnInit() {
    this.userSubscription = this._authService.currentUser.subscribe(
      (user) => (this.user = user)
    );
    this._eventService
      .getEvents()
      .pipe(finalize(() => (this.isLoadingEvents = false)))
      .subscribe((events) => {
        this.allEvents = events;
        this.events = this.allEvents.slice(0, this.pageSize);
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  selectPage(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    let startIndex = event.pageSize * event.pageIndex;
    let endIndex = startIndex + event.pageSize;
    this.events = this.allEvents.slice(startIndex, endIndex);
  }

  openCreateEventDialog() {
    const dialogRef = this.dialog.open(EventCreateDialogComponent, {
      data: {
        user: {
          username: this.user?.username,
          profileURL: this.user?.profileURL,
          role: this.user?.role,
        },
      },
      width: '800px',
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newEvent: Event) => {
      if (newEvent) {
        this.allEvents.push(newEvent);
        this.events = this.allEvents.slice(0, this.pageSize);
        this._snackBar.open(
          `${this._globalService.toTitleCase(newEvent.name)} has been created!`,
          'X',
          {
            panelClass: ['snackbar'],
            horizontalPosition: 'left',
            duration: 2500,
          }
        );
      }
    });
  }
}
