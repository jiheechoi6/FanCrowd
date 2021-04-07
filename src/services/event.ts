import mongoose from "mongoose";
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
  IEventSummary,
  IEventFilter,
  IPopulatedEventDTO
} from "../interfaces/IEvent";
import ErrorService from "./error";
import GlobalService from "./global";
import {
  IAttendEvent,
  INewAttendEventDTO,
  IRequestUser
} from "../interfaces/IUser";
import FandomService from "./fandom";
import FandomCategory from "../models/fandom-category";

export default class EventService {
  private static _globalService = new GlobalService();
  private static _fandomService = new FandomService();

  public async getEventDocById(eventId: mongoose.Types._ObjectId | string) {
    EventService._globalService.checkValidObjectId(
      eventId,
      `Event with id ${eventId} does not exist`
    );

    const event = await Event.findById(eventId);

    if (!event) {
      throw new ErrorService(
        "NotFoundError",
        `Event with id ${eventId} does not exist`
      );
    }

    return event;
  }

  public async getEventById(eventId: string) {
    EventService._globalService.checkValidObjectId(
      eventId,
      `Event with id ${eventId} does not exist`
    );

    const events = await this.getEventsMatchingFilters({
      _id: mongoose.Types.ObjectId(eventId)
    });

    const eventWithId = events[0];

    if (!eventWithId) {
      throw new ErrorService(
        "NotFoundError",
        `Event with id ${eventId} does not exist`
      );
    }

    return eventWithId;
  }

  public async getEvents() {
    return await this.getEventsMatchingFilters({});
  }

  public async getEventsMatchingFilters(eventFilter: IEventFilter) {
    const events: IPopulatedEventDTO[] = await Event.aggregate([
      {
        $match: eventFilter
      },
      {
        $lookup: {
          from: "attends",
          as: "attendees",
          let: {
            eventId: "$_id"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$event", "$$eventId"]
                }
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: "users",
          as: "postedBy",
          localField: "postedBy",
          foreignField: "_id"
        }
      },
      {
        $unwind: "$postedBy"
      },
      {
        $lookup: {
          from: "fandoms",
          as: "fandom",
          let: {
            eventFandom: "$fandom"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$eventFandom"]
                }
              }
            },
            {
              $lookup: {
                from: FandomCategory.collection.name,
                as: "category",
                localField: "category",
                foreignField: "_id"
              }
            },
            {
              $unwind: "$category"
            }
          ]
        }
      },
      {
        $unwind: "$fandom"
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          location: 1,
          startDate: 1,
          endDate: 1,
          totalAttendance: {
            $size: "$attendees"
          },
          postedBy: {
            username: 1,
            profileURL: 1
          },
          fandom: 1
        }
      },
      {
        $sort: {
          startDate: 1
        }
      }
    ]);
    return events;
  }

  public async getFandomEventsMatchingFilters(eventFilter: IEventFilter) {
    const events: IEventSummary[] = await Event.aggregate([
      {
        $match: eventFilter
      },
      {
        $lookup: {
          from: "attends",
          as: "attendees",
          let: {
            eventId: "$_id"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$event", "$$eventId"]
                }
              }
            }
          ]
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          location: 1,
          startDate: 1,
          endDate: 1,
          totalAttendance: {
            $size: "$attendees"
          }
        }
      }
    ]);
    return events;
  }

  public async getEventsByFandom(categoryName: string, fandomName: string) {
    const fandom = await EventService._fandomService.getFandomByName(
      categoryName,
      fandomName
    );
    const events = await this.getFandomEventsMatchingFilters({
      fandom: fandom._id
    });
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
    reqUser: IRequestUser
  ) {
    EventService._globalService.checkValidObjectId(
      eventId,
      `Event with id ${eventId} does not exist`
    );

    const eventDoc = await this.getEventDocById(eventId);

    EventService._globalService.hasPermission(
      eventDoc.postedBy._id,
      reqUser,
      `Only the creator or an admin may update event with id ${eventId}`
    );

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
    reqUser: IRequestUser
  ) {
    EventService._globalService.checkValidObjectId(
      eventId,
      `Event with id ${eventId} does not exist`
    );

    const event = await this.getEventDocById(eventId);

    EventService._globalService.hasPermission(
      event.postedBy._id,
      reqUser,
      `Only the creator or an admin may delete event with id ${eventId}`
    );

    await event.delete();
  }

  public async getEventReviewsById(eventId: mongoose.Types._ObjectId | string) {
    const eventDoc: IEvent = await this.getEventDocById(eventId);
    const reviews: IEventReview[] = await EventReview.find({ event: eventDoc })
      .sort({ updatedAt: "ascending" })
      .populate("postedBy", ["username", "role", "profileURL"])
      .populate("event");
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

    this.getEventDocById(eventId);
    const newReviewDoc = await EventReview.create(newReview);
    const review = newReviewDoc.toObject();
    Reflect.deleteProperty(review, "postedBy");

    return review;
  }

  public async deleteReviewById(
    reviewId: mongoose.Types._ObjectId | string,
    reqUser: IRequestUser
  ) {
    EventService._globalService.checkValidObjectId(
      reviewId,
      `Review with id ${reviewId} does not exist`
    );

    const review = await this.getReviewById(reviewId);

    EventService._globalService.hasPermission(
      review.postedBy._id,
      reqUser,
      `Only the creator or an admin may delete review with id ${reviewId}`
    );

    await review.delete();
  }

  public async updateReviewById(
    eventId: mongoose.Types._ObjectId | string,
    reviewId: mongoose.Types._ObjectId | string,
    updatedReview: IUpdateEventReviewDTO,
    reqUser: IRequestUser
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

    EventService._globalService.hasPermission(
      reviewDoc.postedBy._id,
      reqUser,
      `Only the creator or an admin may update review with id ${reviewId}`
    );

    reviewDoc.title = updatedReview.title || reviewDoc.title;
    reviewDoc.content = updatedReview.content || reviewDoc.content;
    reviewDoc.rating = updatedReview.rating || reviewDoc.rating;

    if (eventId) {
      const event = await this.getEventDocById(eventId);
      reviewDoc.event = event;
    }

    const updatedReviewDoc = await reviewDoc.save();
    const review = updatedReviewDoc.toObject();
    Reflect.deleteProperty(review, "postedBy");

    return review;
  }

  public async getEventAttendeesById(
    eventId: mongoose.Types._ObjectId | string
  ) {
    const eventDoc: IEvent = await this.getEventDocById(eventId);
    const attendees: IAttendEvent[] = await Attend.find({
      event: eventDoc._id
    });

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

    this.getEventDocById(eventId);
    const newAttendeeDoc = await Attend.create(newAttendee);
    const attendee = newAttendeeDoc.toObject();
    Reflect.deleteProperty(attendee, "user");

    return attendee;
  }

  public async deleteAttendeeById(
    attendeeId: mongoose.Types._ObjectId | string,
    reqUser: IRequestUser
  ) {
    EventService._globalService.checkValidObjectId(
      attendeeId,
      `Attendee with id ${attendeeId} does not exist`
    );

    const attendee = await this.getAttendeeById(attendeeId);

    EventService._globalService.hasPermission(
      attendee.user,
      reqUser,
      `Only the attendee or an admin may delete attendee with id ${attendeeId}`
    );

    await attendee.delete();
  }
}
