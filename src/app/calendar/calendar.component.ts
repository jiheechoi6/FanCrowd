import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DateEventDialogComponent } from './date-event-dialog/date-event-dialog.component';
import EventDTO from '../shared/models/event-dto';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
})
export class CalendarComponent implements OnInit {
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
  showdate = new Date();
  displayMonth = this.showdate.getMonth();
  selectedMonth = this.months[this.displayMonth];
  selectedYear = this.showdate.getFullYear();
  userEvents: EventDTO[] = [];

  firstDayOfMonth = new Date(this.selectedYear, this.displayMonth, 1).getDay();
  lastDateOfMonth = new Date(
    this.selectedYear,
    this.displayMonth + 1,
    0
  ).getDate();
  displayLastDay = new Date(
    this.selectedYear,
    this.displayMonth,
    this.lastDateOfMonth
  );
  prevMonthLastDay = new Date(
    this.selectedYear,
    this.displayMonth,
    0
  ).getDate();

  fullDate = this.showdate.toDateString();

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

  updateDateValues() {
    this.displayMonth = this.showdate.getMonth();
    this.selectedMonth = this.months[this.displayMonth];
    this.selectedYear = this.showdate.getFullYear();

    this.firstDayOfMonth = new Date(
      this.selectedYear,
      this.displayMonth,
      1
    ).getDay();
    this.lastDateOfMonth = new Date(
      this.selectedYear,
      this.displayMonth + 1,
      0
    ).getDate();
    this.displayLastDay = new Date(
      this.selectedYear,
      this.displayMonth,
      this.lastDateOfMonth
    );
    this.prevMonthLastDay = new Date(
      this.selectedYear,
      this.displayMonth,
      0
    ).getDate();
    this.fullDate = this.showdate.toDateString();
  }

  prevMonth() {
    this.showdate.setMonth(this.showdate.getMonth() - 1);
    this.updateDateValues();
  }

  nextMonth() {
    this.showdate.setMonth(this.showdate.getMonth() + 1);
    this.updateDateValues();
  }

  getEventsForDate(month: number, date: number) {
    const selectedDate = this.getDateFromSelectedYearMonthDate(
      month,
      date
    ).toDateString();
    const eventsForDate = this.userEvents.filter(
      (event) => event.date.toDateString() === selectedDate
    );
    return eventsForDate;
  }

  openDateEventDialog(date: number) {
    const selectedDate = this.getDateFromSelectedYearMonthDate(
      this.displayMonth,
      date
    );
    const eventsForDate = this.getEventsForDate(this.displayMonth, date);
    this._dialog.open(DateEventDialogComponent, {
      data: {
        events: eventsForDate,
        selectedDate,
      },
      autoFocus: false,
      backdropClass: 'material-dialog-backdrop',
      width: '450px',
      closeOnNavigation: true,
    });
  }

  isCurrentDate(date: number) {
    const todayDate = new Date().toDateString();
    const selectedDate = this.getDateFromSelectedYearMonthDate(
      this.displayMonth,
      date
    ).toDateString();
    return todayDate === selectedDate;
  }

  counter(i: number) {
    return new Array(i);
  }

  private getDateFromSelectedYearMonthDate(month: number, date: number) {
    return new Date(this.selectedYear, month, date);
  }
}
