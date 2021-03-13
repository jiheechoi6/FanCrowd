"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDetailComponent = void 0;
const core_1 = require("@angular/core");
const create_review_dialog_component_1 = require("../create-review-dialog/create-review-dialog.component");
const delete_dialog_component_1 = require("../../shared/components/delete-dialog/delete-dialog.component");
const edit_review_dialog_component_1 = require("../edit-review-dialog/edit-review-dialog.component");
const event_create_dialog_component_1 = require("../event-create-dialog/event-create-dialog.component");
let EventDetailComponent = class EventDetailComponent {
    constructor(_authService, _userService, _eventService, _activatedRoute, dialog, _router, _breadcrumbService) {
        this._authService = _authService;
        this._userService = _userService;
        this._eventService = _eventService;
        this._activatedRoute = _activatedRoute;
        this.dialog = dialog;
        this._router = _router;
        this._breadcrumbService = _breadcrumbService;
        this.event = null;
        this.reviews = [];
        this.today = new Date();
        this.isAttending = false;
        this.id = NaN;
        this.user = null;
        this.wroteReview = false;
        this.avgRating = 0;
        this.groupedReviews = {};
        this._activatedRoute.params.subscribe((params) => {
            this.id = +params['id'];
        });
    }
    ngOnInit() {
        this.user = this._authService.getCurrentUser().value;
        if (this.user) {
            this.isAttending = false;
            let index = this.user.attendingEvents.findIndex((event) => event.id === this.id);
            if (index >= 0) {
                this.isAttending = true;
            }
        }
        this.event = this._eventService.getEventById(this.id);
        if (this.event) {
            this._breadcrumbService.set('@eventName', this.event.name);
            this.reviews = this.event.reviews;
            this.alreadyWroteReview(this.reviews);
        }
        else {
            this.reviews = [];
        }
        this.calculateAvgRating();
        this.groupReviewsByRating();
    }
    openAddReviewDialog() {
        var _a, _b, _c;
        const dialogRef = this.dialog.open(create_review_dialog_component_1.ReviewDialogComponent, {
            data: {
                id: this.id,
                user: {
                    username: (_a = this.user) === null || _a === void 0 ? void 0 : _a.username,
                    profileUrl: (_b = this.user) === null || _b === void 0 ? void 0 : _b.profileUrl,
                    role: (_c = this.user) === null || _c === void 0 ? void 0 : _c.role,
                },
            },
            width: '800px',
            maxHeight: '90vh',
            disableClose: true,
            autoFocus: false,
        });
        dialogRef.afterClosed().subscribe((newReview) => {
            if (newReview) {
                this.reviews = this._eventService.getReviewsByEventId(this.id);
                this.alreadyWroteReview(this.reviews);
                this.calculateAvgRating();
                this.groupReviewsByRating();
            }
        });
    }
    openDeleteEventDialog(id) {
        this.dialog.open(delete_dialog_component_1.DeleteDialogComponent, {
            data: {
                title: 'Delete Event Confirmation',
                details: 'Are you sure you want to delete the event?',
                onConfirmCb: this.deleteEvent.bind(this),
                params: [id],
            },
            width: '360px',
            height: '180px',
            autoFocus: false,
            disableClose: true,
        });
    }
    openDeleteReviewDialog(id) {
        const dialogRef = this.dialog.open(delete_dialog_component_1.DeleteDialogComponent, {
            data: {
                title: 'Delete Review Confirmation',
                details: 'Are you sure you want to delete your review?',
                onConfirmCb: this.deleteReview.bind(this),
                params: id,
            },
            width: '360px',
            height: '180px',
            autoFocus: false,
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe(() => {
            this.reviews = this._eventService.getReviewsByEventId(this.id);
            this.alreadyWroteReview(this.reviews);
            this.calculateAvgRating();
            this.groupReviewsByRating();
        });
    }
    openEditDialog(id) {
        var _a;
        if (this.reviews) {
            let index = (_a = this.reviews) === null || _a === void 0 ? void 0 : _a.findIndex((review) => review.id === id);
            let review = Object.assign({}, this.reviews[index]);
            const dialogRef = this.dialog.open(edit_review_dialog_component_1.EditReviewDialogComponent, {
                data: { eventId: this.id, review: review },
                autoFocus: false,
                width: '450px',
                disableClose: true,
            });
            dialogRef.afterClosed().subscribe((updatedReview) => {
                if (updatedReview) {
                    this.reviews = this._eventService.getReviewsByEventId(this.id);
                    this.alreadyWroteReview(this.reviews);
                    this.calculateAvgRating();
                    this.groupReviewsByRating();
                }
            });
        }
    }
    alreadyWroteReview(reviews) {
        this.wroteReview = false;
        if (reviews) {
            let reviewIndex = reviews.findIndex((review) => { var _a; return review.postedBy.username === ((_a = this.user) === null || _a === void 0 ? void 0 : _a.username); });
            if (reviewIndex >= 0) {
                this.wroteReview = true;
            }
        }
    }
    addEventToProfile() {
        var _a;
        this.isAttending = true;
        let eventDTO;
        if (this.event) {
            eventDTO = {
                name: (_a = this.event) === null || _a === void 0 ? void 0 : _a.name,
                date: this.event.startDate,
                totalAttending: this.event.totalAttendance + 1,
                id: this.event.id,
            };
            if (this.user) {
                this._userService.updateUserEventsByUsername(this.user.username, eventDTO);
                this._authService.updateUserEventsByUsername(this.user.username, eventDTO);
                this._eventService.updateEventAttendance(this.event.id, this.isAttending);
                this.event = this._eventService.getEventById(this.id);
            }
        }
    }
    removeEventFromProfile(eventId) {
        this.isAttending = false;
        if (this.user && this.event) {
            this._userService.removeEventFromUserEvents(this.user.username, this.event.id);
            this._authService.removeEventFromUserEvents(this.user.username, this.event.id);
            this._eventService.updateEventAttendance(this.event.id, this.isAttending);
            this.event = this._eventService.getEventById(this.id);
        }
    }
    deleteEvent(id) {
        if (id) {
            let allEvents = this._eventService.getEvents();
            let index = allEvents.findIndex((event) => event.id === id);
            this._eventService.deleteEvent(index);
            if (this.user && this.event) {
                this._userService.removeEventFromAllUsersEvents(this.event.id);
                this._authService.removeEventFromAllUsersEvents(this.event.id);
            }
            this._router.navigate(['events']);
        }
    }
    deleteReview(id) {
        let allEvents = this._eventService.getEvents();
        let eventIindex = allEvents.findIndex((event) => event.id === this.id);
        if (eventIindex >= 0) {
            let event = allEvents[eventIindex];
            let reviewIndex = event.reviews.findIndex((review) => review.id === id);
            this._eventService.deleteReview(eventIindex, reviewIndex);
        }
    }
    openEditEventDialog() {
        const dialogRef = this.dialog.open(event_create_dialog_component_1.EventCreateDialogComponent, {
            data: { eventBeingUpdated: Object.assign({}, this.event) },
            width: '800px',
            autoFocus: false,
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe((updatedEvent) => {
            if (updatedEvent) {
                this._eventService.updateEventById(updatedEvent.id, updatedEvent);
                this.event = updatedEvent;
            }
        });
    }
    calculateAvgRating() {
        const totalRatings = this.reviews.reduce((total, review) => total + review.rating, 0) || 0;
        this.avgRating =
            this.reviews.length === 0
                ? 0
                : Math.floor(totalRatings / this.reviews.length);
    }
    roundPercent(percent) {
        return Math.floor(percent);
    }
    groupReviewsByRating() {
        this.groupedReviews = this.reviews.reduce((rv, review) => {
            (rv[review['rating']] = rv[review['rating']] || []).push(review);
            return rv;
        }, {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
        });
    }
};
EventDetailComponent = __decorate([
    core_1.Component({
        selector: 'app-event',
        templateUrl: './event-detail.component.html',
        styleUrls: ['./event-detail.component.sass'],
    })
], EventDetailComponent);
exports.EventDetailComponent = EventDetailComponent;
