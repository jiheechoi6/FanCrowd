"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCreateDialogComponent = void 0;
const core_1 = require("@angular/core");
const dialog_1 = require("@angular/material/dialog");
let EventCreateDialogComponent = class EventCreateDialogComponent {
    constructor(dialogRef, data, _eventService, _fandomService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._eventService = _eventService;
        this._fandomService = _fandomService;
        this.categories = [];
        this.fandomForCategory = [];
        this.isEditingEvent = false;
        this.dateRangeErrorMatcher = {
            isErrorState: (control, form) => {
                var _a;
                if (control.value) {
                    const startDate = control.value[0];
                    const endDate = control.value[1];
                    const dateRangeInvalid = !startDate ||
                        !endDate ||
                        ((_a = control.errors) === null || _a === void 0 ? void 0 : _a.owlDateTimeParse) ||
                        endDate < startDate;
                    return dateRangeInvalid && control.touched;
                }
                return false;
            },
        };
        this.minDate = new Date();
        if (this.data.eventBeingUpdated) {
            this.isEditingEvent = true;
            this.event = this.data.eventBeingUpdated;
            this.eventDateRange = [this.event.startDate, this.event.endDate];
            this.fandomForCategory = this._fandomService.getFandomsByCategories(this.event.fandomType.category);
        }
        else {
            const defaultStartDate = new Date();
            defaultStartDate.setHours(new Date().getHours() + 1);
            const defaultEndDate = new Date();
            defaultEndDate.setDate(defaultStartDate.getDate() + 1);
            this.eventDateRange = [defaultStartDate, defaultEndDate];
            this.event = {
                id: 1000,
                name: '',
                fandomType: {
                    category: '',
                    name: '',
                },
                description: '',
                startDate: this.eventDateRange[0],
                endDate: this.eventDateRange[1],
                location: '',
                postedBy: this.data.username,
                totalAttendance: 0,
                reviews: [],
            };
        }
    }
    ngOnInit() {
        this.categories = this._fandomService.getCategories();
    }
    categoryChange(event) {
        this.fandomForCategory = this._fandomService.getFandomsByCategories(event.value);
    }
    setStartDateAndEndDate() {
        this.event.startDate = this.eventDateRange[0];
        this.event.endDate = this.eventDateRange[1];
    }
    createEvent() {
        this.setStartDateAndEndDate();
        this._eventService.createEvent(this.event);
        this.dialogRef.close(this.event);
    }
    updateEvent() {
        this.setStartDateAndEndDate();
        this._eventService.updateEventById(this.event.id, this.event);
        this.dialogRef.close(this.event);
    }
};
EventCreateDialogComponent = __decorate([
    core_1.Component({
        selector: 'event-create-dialog',
        templateUrl: './event-create-dialog.component.html',
        styleUrls: ['./event-create-dialog.component.sass'],
    }),
    __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
], EventCreateDialogComponent);
exports.EventCreateDialogComponent = EventCreateDialogComponent;
