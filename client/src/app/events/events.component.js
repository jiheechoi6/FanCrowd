"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsComponent = void 0;
const core_1 = require("@angular/core");
const event_create_dialog_component_1 = require("./event-create-dialog/event-create-dialog.component");
let EventsComponent = class EventsComponent {
    constructor(_authService, _eventService, dialog) {
        this._authService = _authService;
        this._eventService = _eventService;
        this.dialog = dialog;
        this.events = [];
        this.allEvents = [];
        this.pageSizeOptions = [5, 10, 20];
        this.pageSize = this.pageSizeOptions[1];
        this.pageIndex = 0;
        this.today = new Date();
        this.user = null;
    }
    ngOnInit() {
        this.user = this._authService.getCurrentUser().value;
        this.allEvents = this._eventService.getEvents();
        this.events = this.allEvents.slice(0, this.pageSize);
    }
    selectPage(event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        let startIndex = event.pageSize * event.pageIndex;
        let endIndex = startIndex + event.pageSize;
        this.events = this.allEvents.slice(startIndex, endIndex);
    }
    openCreateEventDialog() {
        var _a;
        const dialogRef = this.dialog.open(event_create_dialog_component_1.EventCreateDialogComponent, {
            data: { username: (_a = this.user) === null || _a === void 0 ? void 0 : _a.username },
            width: '800px',
            autoFocus: false,
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe((newEvent) => {
            if (newEvent) {
                this.events = this._eventService.getEvents();
            }
        });
    }
};
EventsComponent = __decorate([
    core_1.Component({
        selector: 'app-events',
        templateUrl: './events.component.html',
        styleUrls: ['./events.component.sass'],
    })
], EventsComponent);
exports.EventsComponent = EventsComponent;
