import mongoose from "mongoose";
import Fandom from "../models/fandom";
import User from "../models/user";
import Event from "../models/event";
import Attend from "../models/attend";
import EventReview from "../models/event-review";
import {
  IEvent,
  INewEventInputDTO,
  IEventReview,
  INewEventReviewInputDTO,
  IUpdateEventDTO,
  IUpdateEventReviewDTO,
} from "../interfaces/IEvent";
import ErrorService from "./error";
import GlobalService from "./global";
import { IAttendEvent, INewAttendEventDTO, IUser } from "../interfaces/IUser";
import FandomService from "./fandom";

export default class EventService {
  private static _globalService = new GlobalService();
  private static _fandomService = new FandomService();

  public async getEventById(eventId: mongoose.Types._ObjectId | string) {
    EventService._globalService.checkValidObjectId(
      eventId,
      `Event with id ${eventId} does not exist`
    );

    const event = await Event.findById(eventId)
      .populate("postedBy")
      .populate("fandom");
    
    if (!event) {
      throw new ErrorService(
        "NotFoundError",
        `Event with id ${eventId} does not exist`
      );
    }

    return event;
  }

  public async getEventsByFandom(categoryName: string, fandomName: string) {
    const fandom = await EventService._fandomService.getFandomByName(
      categoryName, fandomName
    );
    const events: IEvent[] =
      (await Event.find({ fandom: fandom._id })
        .populate("postedBy")
        .populate("fandom")) || [];

    return events;
  }

  public async createEvent(newEvent: INewEventInputDTO) {
    EventService._globalService.checkValidObjectId(
      newEvent.fandom,
      `Fandom with id ${newEvent.fandom} does not exist`
    );

    EventService._fandomService.getFandomById(newEvent.fandom);
    const newEventDoc = await Event.create(newEvent);
    const event = newEventDoc.toObject();
    Reflect.deleteProperty(event, "postedBy");

    return event;
  }

  public async updateEventById(
    eventId: mongoose.Types._ObjectId | string,
    updatedEvent: IUpdateEventDTO,
    postedByUserId: mongoose.Types._ObjectId | undefined
  ) {
    EventService._globalService.checkValidObjectId(
      eventId,
      `Event with id ${eventId} does not exist`
    );

    const eventDoc = await this.getEventById(eventId);

    // TODO: uncomment following code after auth is implemented
    // EventService._globalService.hasPermission(
    //   eventDoc.postedBy,
    //   postedByUserId,
    //   `Only the creator or an admin may update event with id ${eventId}`
    // );

    eventDoc.name = updatedEvent.name || eventDoc.name;
    eventDoc.description = updatedEvent.description || eventDoc.description;
    eventDoc.location = updatedEvent.location || eventDoc.location;
    eventDoc.startDate = updatedEvent.startDate || eventDoc.startDate;
    eventDoc.endDate = updatedEvent.endDate || eventDoc.endDate;

    if (updatedEvent.fandom) {
      const fandom = await EventService._fandomService.getFandomById(
        updatedEvent.fandom
      );
      eventDoc.fandom = fandom;
    }

    const updatedEventDoc = await eventDoc.save();
    const event = updatedEventDoc.toObject();
    Reflect.deleteProperty(event, "postedBy");

    return event;
  }

  // TODO: Create two more methods to delete all reviews and attendees
  public async deleteEventById(
    eventId: mongoose.Types._ObjectId | string,
    postedByUserId: mongoose.Types._ObjectId | undefined
  ) {
    EventService._globalService.checkValidObjectId(
      eventId,
      `Event with id ${eventId} does not exist`
    );

    const event = await this.getEventById(eventId);

    // TODO: uncomment following code after auth is implemented
    // EventService._globalService.hasPermission(
    //   event.postedBy,
    //   postedByUserId,
    //   `Only the creator or an admin may delete event with id ${eventId}`
    // );

    await event.delete();
  }

  public async getEventReviewsById(eventId: mongoose.Types._ObjectId | string) {
    const eventDoc: IEvent = await this.getEventById(eventId);
    const reviews: IEventReview[] =
      (await EventReview.find({ event: eventDoc })
        .populate("postedBy")
        .populate("event")) || [];
    return reviews;
  }

  public async getReviewById(reviewId: mongoose.Types._ObjectId | string) {
    EventService._globalService.checkValidObjectId(
      reviewId,
      `Review with id ${reviewId} does not exist`
    );

    const review = await EventReview.findById(reviewId);

    if (!review) {
      throw new ErrorService(
        "NotFoundError",
        `Review with id ${reviewId} does not exist`
      );
    }

    return review;
  }

  public async createReview(
    eventId: mongoose.Types._ObjectId | string,
    newReview: INewEventReviewInputDTO
  ) {
    EventService._globalService.checkValidObjectId(
      eventId,
      `Event with id ${eventId} does not exist`
    );

    this.getEventById(eventId);
    const newReviewDoc = await EventReview.create(newReview);
    const review = newReviewDoc.toObject();
    Reflect.deleteProperty(review, "postedBy");

    return review;
  }

  public async deleteReviewById(
    reviewId: mongoose.Types._ObjectId | string,
    postedByUserId: mongoose.Types._ObjectId | undefined
  ) {
    EventService._globalService.checkValidObjectId(
      reviewId,
      `Review with id ${reviewId} does not exist`
    );

    const review = await this.getReviewById(reviewId);

    /* TODO: uncomment following code after auth is implemented,
     * also manually check for role type Admin
     */
    // EventService._globalService.hasPermission(
    //   review.postedBy,
    //   postedByUserId,
    //   `Only the creator or an admin may delete review with id ${reviewId}`
    // );

    await review.delete();
  }

  public async updateReviewById(
    eventId: mongoose.Types._ObjectId | string,
    reviewId: mongoose.Types._ObjectId | string,
    updatedReview: IUpdateEventReviewDTO,
    postedByUserId: mongoose.Types._ObjectId | undefined
  ) {
    EventService._globalService.checkValidObjectId(
      eventId,
      `Event with id ${eventId} does not exist`
    );

    EventService._globalService.checkValidObjectId(
      reviewId,
      `Review with id ${reviewId} does not exist`
    );

    const reviewDoc = await this.getReviewById(reviewId);

    // TODO: uncomment following code after auth is implemented
    //       also manually check for role type Admin
    // EventService._globalService.hasPermission(
    //   reviewDoc.postedBy,
    //   postedByUserId,
    //   `Only the creator or an admin may update review with id ${reviewId}`
    // );

    reviewDoc.title = updatedReview.title || reviewDoc.title;
    reviewDoc.content = updatedReview.content || reviewDoc.content;
    reviewDoc.rating = updatedReview.rating || reviewDoc.rating;

    if (eventId) {
      const event = await this.getEventById(eventId);
      reviewDoc.event = event;
    }

    const updatedReviewDoc = await reviewDoc.save();
    const review = updatedReviewDoc.toObject();
    Reflect.deleteProperty(review, "postedBy");

    return review;
  }

  public async getEventAttendeesById(eventId: mongoose.Types._ObjectId | string) {
    const eventDoc = await this.getEventById(eventId);
    const attendees: IAttendEvent[] = await Attend.find({ event: eventDoc._id });

    return attendees;
  }

  public async getAttendeeById(attendeeId: mongoose.Types._ObjectId | string) {
    EventService._globalService.checkValidObjectId(
      attendeeId,
      `Attendee with id ${attendeeId} does not exist`
    );

    const attendee = await Attend.findById(attendeeId);

    if (!attendee) {
      throw new ErrorService(
        "NotFoundError",
        `Attendee with id ${attendeeId} does not exist`
      );
    }

    return attendee;
  }

  public async createAttendee(
    eventId: mongoose.Types._ObjectId | string,
    newAttendee: INewAttendEventDTO
  ) {
    EventService._globalService.checkValidObjectId(
      eventId,
      `Event with id ${eventId} does not exist`
    );

    this.getEventById(eventId);
    const newAttendeeDoc = await Attend.create(newAttendee);
    const attendee = newAttendeeDoc.toObject();
    Reflect.deleteProperty(attendee, "user");

    return attendee;
  }

  public async deleteAttendeeById(
    attendeeId: mongoose.Types._ObjectId | string,
    userId: mongoose.Types._ObjectId | undefined
  ) {
    EventService._globalService.checkValidObjectId(
      attendeeId,
      `Attendee with id ${attendeeId} does not exist`
    );

    const attendee = await this.getAttendeeById(attendeeId);

    /* TODO: uncomment following code after auth is implemented,
     * also manually check for role type Admin
     */
    // EventService._globalService.hasPermission(
    //   attendee.user,
    //   userId,
    //   `Only the attendee or an admin may delete attendee with id ${attendeeId}`
    // );

    await attendee.delete();
  }
}
