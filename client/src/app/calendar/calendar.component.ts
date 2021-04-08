import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DateEventDialogComponent } from './date-event-dialog/date-event-dialog.component';
import { UserService } from '../core/services/user.service';
import { IEventSummary } from '../shared/models/event-summar';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
  userEvents: IEventSummary[] = [];
  isLoadingEvents = true;

  userSubscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private _dialog: MatDialog,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.userSubscription = this._authService.currentUser.subscribe((user) => {
      this._userService
        .getUserEventsByUsername(user?.username || '')
        .pipe(finalize(() => (this.isLoadingEvents = false)))
        .subscribe((events) => {
          this.userEvents = events;
        });
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
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

  getEventsForDate(year: number, month: number, date: number) {
    const eventsForDate = this.userEvents.filter((event) => {
      let eventDate = new Date(event.startDate);
      let selectedDate = new Date(year, month, date);
      return (
        eventDate.getFullYear() == selectedDate.getFullYear() &&
        eventDate.getMonth() == selectedDate.getMonth() &&
        eventDate.getDate() == selectedDate.getDate()
      );
    });
    return eventsForDate;
  }

  openDateEventDialog(date: number) {
    const selectedDate = new Date(this.shownYear, this.shownMonth, date);
    const eventsForDate = this.getEventsForDate(
      this.shownYear,
      this.shownMonth,
      date
    );
    this._dialog.open(DateEventDialogComponent, {
      data: {
        events: eventsForDate,
        selectedDate,
      },
      autoFocus: false,
      width: '450px',
    });
  }

  isCurrentDate(date: number) {
    const todayDate = new Date().toDateString();
    const selectedDate = this.getDateFromShownYearMonthDate(
      this.shownMonth,
      date
    ).toDateString();
    return todayDate === selectedDate;
  }

  counter(i: number) {
    return new Array(i);
  }

  private getDateFromShownYearMonthDate(month: number, date: number) {
    return new Date(this.shownYear, month, date);
  }
}
