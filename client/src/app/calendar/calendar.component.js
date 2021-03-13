"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarComponent = void 0;
const core_1 = require("@angular/core");
const date_event_dialog_component_1 = require("./date-event-dialog/date-event-dialog.component");
let CalendarComponent = class CalendarComponent {
    constructor(_authService, _dialog, _userService) {
        this._authService = _authService;
        this._dialog = _dialog;
        this._userService = _userService;
        this.months = [
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
        this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        this.shownDate = new Date();
        this.shownMonth = this.shownDate.getMonth();
        this.shownMonthAsText = this.months[this.shownMonth];
        this.shownYear = this.shownDate.getFullYear();
        this.firstDayOfShownMonth = new Date(this.shownYear, this.shownMonth, 1).getDay();
        this.lastDateOfShownMonth = new Date(this.shownYear, this.shownMonth + 1, 0).getDate();
        this.prevMonthLastDay = new Date(this.shownYear, this.shownMonth, 0).getDate();
        this.userEvents = [];
        this._eventDialogRef = null;
    }
    ngOnInit() {
        this._authService.currentUser.subscribe((user) => {
            this.userEvents = this._userService.getUserEventsByUsername((user === null || user === void 0 ? void 0 : user.username) || '');
        });
    }
    ngOnDestroy() {
        if (this._eventDialogRef) {
            this._eventDialogRef.close();
        }
    }
    changeShownCalendarDates() {
        this.shownMonth = this.shownDate.getMonth();
        this.shownMonthAsText = this.months[this.shownMonth];
        this.shownYear = this.shownDate.getFullYear();
        this.firstDayOfShownMonth = new Date(this.shownYear, this.shownMonth, 1).getDay();
        this.lastDateOfShownMonth = new Date(this.shownYear, this.shownMonth + 1, 0).getDate();
        this.prevMonthLastDay = new Date(this.shownYear, this.shownMonth, 0).getDate();
    }
    prevMonth() {
        this.shownDate.setMonth(this.shownDate.getMonth() - 1);
        this.changeShownCalendarDates();
    }
    nextMonth() {
        this.shownDate.setMonth(this.shownDate.getMonth() + 1);
        this.changeShownCalendarDates();
    }
    getEventsForDate(month, date) {
        const selectedDate = this.getDateFromshownYearMonthDate(month, date).toDateString();
        const eventsForDate = this.userEvents.filter((event) => event.date.toDateString() === selectedDate);
        return eventsForDate;
    }
    openDateEventDialog(date) {
        const selectedDate = this.getDateFromshownYearMonthDate(this.shownMonth, date);
        const eventsForDate = this.getEventsForDate(this.shownMonth, date);
        this._eventDialogRef = this._dialog.open(date_event_dialog_component_1.DateEventDialogComponent, {
            data: {
                events: eventsForDate,
                selectedDate,
            },
            autoFocus: false,
            width: '450px',
        });
    }
    isCurrentDate(date) {
        const todayDate = new Date().toDateString();
        const selectedDate = this.getDateFromshownYearMonthDate(this.shownMonth, date).toDateString();
        return todayDate === selectedDate;
    }
    counter(i) {
        return new Array(i);
    }
    getDateFromshownYearMonthDate(month, date) {
        return new Date(this.shownYear, month, date);
    }
};
CalendarComponent = __decorate([
    core_1.Component({
        selector: 'app-calendar',
        templateUrl: './calendar.component.html',
        styleUrls: ['./calendar.component.sass'],
    })
], CalendarComponent);
exports.CalendarComponent = CalendarComponent;
