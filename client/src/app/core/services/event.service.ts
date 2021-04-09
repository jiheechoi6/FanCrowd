import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Event from 'src/app/shared/models/event';
import Review, { IEventReviewSummary } from 'src/app/shared/models/review';
import ReviewDTO from 'src/app/shared/models/review-dto';
import { Observable } from 'rxjs';
import Attendee from 'src/app/shared/models/attendee';
import { IEventSummary } from 'src/app/shared/models/event-summary';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  today = new Date();

  constructor(private _http: HttpClient) {}

  sortFunction(a: Event, b: Event): number {
    var dateA = new Date(a.startDate).getTime();
    var dateB = new Date(b.startDate).getTime();
    return dateA > dateB ? 1 : -1;
  }

  getEvents(): Observable<Event[]> {
    // Get all events matching a category and fandom
    return this._http.get<Event[]>('/api/events');
  }

  getEventsByCategoryAndFandom(categoryName: string, fandomName: string) {
    const dashedCategoryName = categoryName.split(' ').join('-');
    const dashedFandomName = fandomName.split(' ').join('-');

    return this._http.get<IEventSummary[]>(
      `/api/events/${dashedCategoryName}/${dashedFandomName}`
    );
  }

  getEventById(id: string | undefined): Observable<Event> {
    // Get one event
    return this._http.get<Event>(`/api/events/${id}`);
  }

  createEvent(event: Event): Observable<Event> {
    // Create an event
    return this._http.post<Event>(`/api/events/`, event);
  }

  isUserAttendingEvent(eventId: string) {
    return this._http.get<boolean>(`/api/events/${eventId}/is-attending`);
  }

  createAttendee(eventId: string = '') {
    // Create an attendee
    return this._http.post<Attendee>(`/api/events/${eventId}/attends`, {});
  }

  deleteAttendee(eventId: string) {
    return this._http.delete(`/api/events/${eventId}/unattend`);
  }

  deleteAttendees(eventId: string): Observable<Object> {
    // Delete all attendees for an event
    return this._http.delete(`/api/events/attends/${eventId}`);
  }

  deleteEvent(eventId: string): Observable<Object> {
    // Delete event
    return this._http.delete(`/api/events/${eventId}`);
  }

  getReviewsByEventId(eventId: string) {
    return this._http.get<{ reviews: Review[]; summary: IEventReviewSummary }>(
      `/api/events/${eventId}/reviews`
    );
  }

  addReviewToEvent(eventId: string, review: ReviewDTO): Observable<ReviewDTO> {
    // Create one review for an event
    return this._http.post<ReviewDTO>(`/api/events/${eventId}/reviews`, review);
  }

  updateReviewById(
    reviewId: string,
    updatedReview: ReviewDTO
  ): Observable<ReviewDTO> {
    // Update a review
    return this._http.patch<ReviewDTO>(
      `/api/events/reviews/${reviewId}`,
      updatedReview
    );
  }

  deleteReview(reviewId: string) {
    return this._http.delete<IEventReviewSummary>(
      `/api/events/reviews/${reviewId}`
    );
  }

  deleteReviews(eventId: string): Observable<Object> {
    // Delete all reviews of an event
    return this._http.delete(`/api/events/${eventId}/reviews`);
  }

  updateEventById(
    eventId: string | undefined,
    updatedEvent: Event
  ): Observable<Event> {
    // Update event
    return this._http.patch<Event>(`/api/events/${eventId}`, updatedEvent);
  }
}
