import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import { isValidObjectId } from "mongoose";
import EventReview from "../../models/event-review";
import Event from "../../models/event";
import Fandom from "../../models/fandom";
import User from "../../models/user";
import Attend from "../../models/attend";
import {
  IEvent,
  IEventReview,
  INewEventReviewInputDTO,
  INewEventInputDTO,
} from "../../interfaces/IEvent";
import { IAttendEvent, INewAttendEventDTO } from '../../interfaces/IUser';
import ErrorService from "../../services/error";

const route = Router();

export default (app: Router) => {
  app.use("/events", route);

  /**
   * path: /api/events
   * method: POST
   * body:
   * {
   *  name: string,
   *  description: string,
   *  location: string,
   *  startDate: string,    
   *  endDate: string,    
   *  fandom: string,
   * }
   * 
   * params: None
   * description: creates a new event
   */
  route.post("", async (req, res, next) => {
    try {
      // Should be getting from req.user
      const postedByUser = await User.findOne({ role: "user" });
      const newEvent: INewEventInputDTO = {
        ...req.body,
        postedBy: postedByUser?._id,
      };

      if (!isValidObjectId(newEvent.fandom)) {
        throw new ErrorService(
          "NotFoundError",
          `Fandom with id ${newEvent.fandom} does not exist`
        );
      }

      const fandom = await Fandom.findById(newEvent.fandom);

      if (!fandom) {
        throw new ErrorService(
          "NotFoundError",
          `Fandom with id ${newEvent.fandom} does not exist`
        );
      }

      const newEventDoc = await Event.create(newEvent);
      const event = newEventDoc.toObject();
      Reflect.deleteProperty(event, "postedBy");

      res.status(200).send(event);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events/:eventId
   * method: DELETE
   * body: None
   * params:
   * {
   *  eventId: number
   * }
   * description: deletes an event
   */
  route.delete("/:eventId", async (req, res, next) => {
    try {
      const eventId = req.params.eventId;

      if (!isValidObjectId(eventId)) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const event = await Event.findById(eventId);

      if (!event) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      // Should be checking if user who created event is the one deleting or admin

      await event.delete();
      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events/:eventId
   * method: PATCH
   * body:
   * {
   *  name: string,
   *  description: string,
   *  location: string,
   *  startDate: string,    
   *  endDate: string,    
   *  fandom: string,
   * }
   * params:
   * {
   *  eventId: number
   * }
   * 
   * description: updates an event
   */
  route.patch("/:eventId", async (req, res, next) => {
    try {
      const eventId = req.params.eventId;
      const fandomId = req.body.fandom;

      if (!isValidObjectId(eventId)) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const eventDoc = await Event.findById(eventId);

      if (!eventDoc) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const fandomDoc = await Fandom.findById(fandomId);

      if (!fandomDoc) {
        throw new ErrorService(
          "NotFoundError",
          `Fandom with id ${fandomId} does not exist`
        );
      }

      //should be checking if user who created fandom is the one updating or admin
      eventDoc.name = req.body.name || eventDoc.name;
      eventDoc.description = req.body.description || eventDoc.description;
      eventDoc.location = req.body.category || eventDoc.location;
      eventDoc.startDate = req.body.startDate || eventDoc.startDate;
      eventDoc.endDate = req.body.endDate || eventDoc.endDate;
      eventDoc.fandom = req.body.fandom || eventDoc.fandom;

      const updatedEvent = await eventDoc.save();
      const event = updatedEvent.toObject();
      Reflect.deleteProperty(event, "postedBy");

      res.status(200).send(event);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events
   * method: GET
   * body: None
   * params: None
   * 
   * description: gets all the events or [] if no events exist
   */
  route.get("", async (req, res, next) => {
    try {
      const events: IEvent[] = await Event.find({}).populate("postedBy").populate("fandom");
      res.status(200).send(events);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events/:eventId
   * method: GET
   * body: None
   * params:
   * {
   *  eventId: string
   * }
   * 
   * description: gets events by id or [] if no event
   */
   route.get("/:eventId", async (req, res, next) => {
    try {
      const eventId = req.params.eventId;

      if (!isValidObjectId(eventId)) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const event = await Event.findOne({
        _id: eventId,
      })
      .populate("postedBy")
      .populate("fandom");

      if (!event) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      res.status(200).send(event);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events/:fandomName
   * method: GET
   * body: None
   * params:
   * {
   *  fandomName: string
   * }
   * 
   * description: gets events by fandomName or [] if no fandoms
   */
  route.get("/:fandomName", async (req, res, next) => {
    try {
      const fandomName = req.params.fandomName;
      const name = fandomName.split("-").join(" ");

      const fandom = await Fandom.findOne({
        name: name.toLowerCase(),
      });

      if (!fandom) {
        throw new ErrorService(
          "NotFoundError",
          `Fandom with name ${fandomName} does not exist`
        );
      }

      const events: IEvent[] =
        (await Event.find({ fandom: fandom._id }).populate("postedBy").populate("fandom")) ||
        [];

      res.status(200).send(events);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events/reviews/:eventId
   * method: POST
   * body:
   * {
   *  title: string,
   *  content: string,
   *  rating: number,  
   *  event: string
   * }
   * 
   * params: None
   * description: creates a new review on an event
   */
   route.post("/reviews/:eventId", async (req, res, next) => {
    try {
      // Should be getting from req.user
      const postedByUser = await User.findOne({ role: "user" });
      const eventId = req.params.eventId;
      const newReview: INewEventReviewInputDTO = {
        ...req.body,
        postedBy: postedByUser?._id,
      };

      if (!isValidObjectId(eventId)) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const event = await Event.findById(eventId);

      if (!event) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const newReviewDoc = await EventReview.create(newReview);
      const review = newReviewDoc.toObject();
      Reflect.deleteProperty(review, "postedBy");

      res.status(200).send(review);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events/reviews/:eventId
   * method: DELETE
   * body: None
   * params:
   * {
   *  eventId: number
   * }
   * description: deletes all reviews of an event
   */
   route.delete("/reviews/:eventId", async (req, res, next) => {
    try {
      const eventId = req.params.eventId;

      if (!isValidObjectId(eventId)) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const event = await Event.findById(eventId);
      if (!event) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const reviews = await EventReview.find({event: event._id});

      if (!reviews) {
        throw new ErrorService(
          "NotFoundError",
          `Reviews in Event with id ${eventId} do not exist`
        );
      }

      reviews.forEach(async (review) => {
        review.remove();
      });
      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events/reviews/:reviewId
   * method: DELETE
   * body: None
   * params:
   * {
   *  reviewId: number
   * }
   * description: deletes a review
   */
   route.delete("/reviews/:reviewId", async (req, res, next) => {
    try {
      const reviewId = req.params.reviewId;

      if (!isValidObjectId(reviewId)) {
        throw new ErrorService(
          "NotFoundError",
          `Review with id ${reviewId} does not exist`
        );
      }

      const review = await EventReview.findById(reviewId);

      if (!review) {
        throw new ErrorService(
          "NotFoundError",
          `Review with id ${reviewId} does not exist`
        );
      }

      // Should check if user who created the review is the one deleting or admin

      await review.delete();
      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events/reviews/:reviewId
   * method: PATCH
   * body:
   * {
   *  title: string,
   *  content: string,
   *  rating: number,
   *  event: string
   * }
   * params:
   * {
   *  reviewId: number
   * }
   * 
   * description: updates a review
   */
   route.patch("/reviews/:reviewId", async (req, res, next) => {
    try {
      const reviewId = req.params.reviewId;
      const eventId = req.body.event;

      if (!isValidObjectId(reviewId)) {
        throw new ErrorService(
          "NotFoundError",
          `Review with id ${reviewId} does not exist`
        );
      }

      const reviewDoc = await EventReview.findById(reviewId);

      if (!reviewDoc) {
        throw new ErrorService(
          "NotFoundError",
          `Review with id ${eventId} does not exist`
        );
      }

      const eventDoc = await Event.findById(eventId);

      if (!eventDoc) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      // Should check if user who created the review is the one updating or admin
      reviewDoc.title = req.body.title || reviewDoc.title;
      reviewDoc.content = req.body.content || reviewDoc.content;
      reviewDoc.rating = req.body.rating || reviewDoc.rating;
      reviewDoc.event = req.body.event || reviewDoc.event;

      const updatedReview = await reviewDoc.save();
      const review = updatedReview.toObject();
      Reflect.deleteProperty(review, "postedBy");

      res.status(200).send(review);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events/reviews/:eventId
   * method: GET
   * body: None
   * params:
   * {
   *  eventId: string
   * }
   * 
   * description: gets all the reviews of an event or [] if no reviews exist
   */
   route.get("/reviews/:eventId", async (req, res, next) => {
    try {
      const eventId = req.params.eventId;

      if (!isValidObjectId(eventId)) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const eventDoc = await Event.findById(eventId);

      if (!eventDoc) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const events: IEventReview[] =
        (await EventReview.find({ event: eventDoc._id }).populate("postedBy").populate("event")) ||
        [];

      res.status(200).send(events);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events/attend/:eventId
   * method: POST
   * body:
   * {
   *  event: string,
   *  user: string
   * }
   * params:
   * {
   *  eventId: number
   * }
   * 
   * description: user attends an event
   */
   route.post("/attend/:eventId", async (req, res, next) => {
    try {
      // Should be getting from req.user
      const user = await User.findOne({ role: "user" });
      const eventId = req.params.eventId;
      const newAttend: INewAttendEventDTO = {
        ...req.body,
        postedBy: user?._id,
      };

      if (!isValidObjectId(eventId)) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const event = await Event.findById(eventId);

      if (!event) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const newAttendDoc = await Attend.create(newAttend);
      const attend = newAttendDoc.toObject();
      Reflect.deleteProperty(attend, "user");

      res.status(200).send(attend);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events/attend/:attendId
   * method: DELETE
   * body: None
   * params:
   * {
   *  attendId: number
   * }
   * description: deletes an attendance
   */
   route.delete("/attend/:attendId", async (req, res, next) => {
    try {
      const attendeeId = req.params.attendId;

      if (!isValidObjectId(attendeeId)) {
        throw new ErrorService(
          "NotFoundError",
          `Attendee with id ${attendeeId} does not exist`
        );
      }

      const attendee = await Attend.findById(attendeeId);

      if (!attendee) {
        throw new ErrorService(
          "NotFoundError",
          `Attendee with id ${attendeeId} does not exist`
        );
      }

      // Should check if user who attended is the one deleting or admin

      await attendee.delete();
      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events/attend/:eventId
   * method: DELETE
   * body: None
   * params:
   * {
   *  eventId: number
   * }
   * description: deletes all attendances of an event
   */
   route.delete("/attends/:eventId", async (req, res, next) => {
    try {
      const eventId = req.params.eventId;

      if (!isValidObjectId(eventId)) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const event = await Event.findById(eventId);
      if (!event) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const attendees = await Attend.find({event: event._id});

      if (!attendees) {
        throw new ErrorService(
          "NotFoundError",
          `Attendees of Event with id ${eventId} does not exist`
        );
      }

      // Should check if user who attended is the one deleting or admin

      attendees.forEach(async (attendee) => {
        attendee.remove();
      });
      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events/attend/:eventId
   * method: GET
   * body: None
   * params:
   * {
   *  eventId: string
   * }
   * 
   * description: gets all the attendees by eventId or [] if no event/attendees exist
   */
   route.get("/attend/:eventId", async (req, res, next) => {
    try {
      const eventId = req.params.eventId;

      if (!isValidObjectId(eventId)) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const event = await Event.findById(eventId);
      if (!event) {
        throw new ErrorService(
          "NotFoundError",
          `Event with id ${eventId} does not exist`
        );
      }

      const attendees = await Attend.find({event: event._id});

      if (!attendees) {
        throw new ErrorService(
          "NotFoundError",
          `Attendees with Event id ${eventId} do not exist`
        );
      }

      res.status(200).send(attendees);
    } catch (err) {
      return next(err);
    }
  });
};
