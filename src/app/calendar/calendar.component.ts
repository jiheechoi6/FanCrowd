import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DateEventDialogComponent } from './date-event-dialog/date-event-dialog.component';

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
  today = new Date();
  showdate = new Date();
  displayMonth = this.showdate.getMonth();
  selectedMonth = this.months[this.displayMonth];
  selectedYear = this.showdate.getFullYear();

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

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {}

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

  getEvents(i: number) {}

  hasEvent(i: number) {
    let result = false;
    this.authService.getCurrentLoggedInUserEvents()?.forEach((event) => {
      if (
        event.date.getFullYear() == this.selectedYear &&
        event.date.getMonth() == this.displayMonth &&
        event.date.getDate() == i
      ) {
        result = true;
      } else {
        result = false;
      }
    });
    return result;
  }

  openDateEventDialog(date: number) {
    let year = this.selectedYear;
    let month = this.displayMonth;
    const dialogRef = this.dialog.open(DateEventDialogComponent, {
      data: { year, month, date },
      autoFocus: false,
      backdropClass: 'material-dialog-backdrop',
      width: '400px',
    });
  }

  isToday(date: number) {
    if (
      this.selectedYear == this.today.getFullYear() &&
      this.displayMonth == this.today.getMonth() &&
      date == this.today.getDate()
    ) {
      return true;
    } else {
      return false;
    }
  }

  counter(i: number) {
    return new Array(i);
  }
}
