import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DateEventDialogComponent } from './date-event-dialog/date-event-dialog.component';
import EventDTO from '../shared/models/event-dto';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  months = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  shownDate = new Date();
  shownMonth = this.shownDate.getMonth();
  shownMonthAsText = this.months[this.shownMonth];
  shownYear = this.shownDate.getFullYear();
  firstDayOfShownMonth = new Date(this.shownYear, this.shownMonth, 1).getDay();
  lastDateOfShownMonth = new Date(
    this.shownYear,
    this.shownMonth + 1,
    0
  ).getDate();
  prevMonthLastDay = new Date(this.shownYear, this.shownMonth, 0).getDate();
  userEvents: EventDTO[] = [];
  private _eventDialogRef: MatDialogRef<DateEventDialogComponent> | null = null;

  constructor(
    private _authService: AuthService,
    private _dialog: MatDialog,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._authService.currentUser.subscribe((user) => {
      this.userEvents = this._userService.getUserEventsByUsername(
        user?.username || ''
      );
    });
  }

  ngOnDestroy(): void {
    if (this._eventDialogRef) {
      this._eventDialogRef.close();
    }
  }

  changeShownCalendarDates() {
    this.shownMonth = this.shownDate.getMonth();
    this.shownMonthAsText = this.months[this.shownMonth];
    this.shownYear = this.shownDate.getFullYear();

    this.firstDayOfShownMonth = new Date(
      this.shownYear,
      this.shownMonth,
      1
    ).getDay();
    this.lastDateOfShownMonth = new Date(
      this.shownYear,
      this.shownMonth + 1,
      0
    ).getDate();
    this.prevMonthLastDay = new Date(
      this.shownYear,
      this.shownMonth,
      0
    ).getDate();
  }

  prevMonth() {
    this.shownDate.setMonth(this.shownDate.getMonth() - 1);
    this.changeShownCalendarDates();
  }

  nextMonth() {
    this.shownDate.setMonth(this.shownDate.getMonth() + 1);
    this.changeShownCalendarDates();
  }

  getEventsForDate(month: number, date: number) {
    const selectedDate = this.getDateFromshownYearMonthDate(
      month,
      date
    ).toDateString();
    const eventsForDate = this.userEvents.filter(
      (event) => event.date.toDateString() === selectedDate
    );
    return eventsForDate;
  }

  openDateEventDialog(date: number) {
    const selectedDate = this.getDateFromshownYearMonthDate(
      this.shownMonth,
      date
    );
    const eventsForDate = this.getEventsForDate(this.shownMonth, date);
    this._eventDialogRef = this._dialog.open(DateEventDialogComponent, {
      data: {
        events: eventsForDate,
        selectedDate,
      },
      autoFocus: false,
      backdropClass: 'material-dialog-backdrop',
      width: '450px',
    });
  }

  isCurrentDate(date: number) {
    const todayDate = new Date().toDateString();
    const selectedDate = this.getDateFromshownYearMonthDate(
      this.shownMonth,
      date
    ).toDateString();
    return todayDate === selectedDate;
  }

  counter(i: number) {
    return new Array(i);
  }

  private getDateFromshownYearMonthDate(month: number, date: number) {
    return new Date(this.shownYear, month, date);
  }
}
