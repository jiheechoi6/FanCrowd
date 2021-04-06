import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import { isValidObjectId } from "mongoose";
import EventReview from "../../models/event-review";
import Event from "../../models/event";
import User from "../../models/user";
import Attend from "../../models/attend";
import passport from "passport";
import {
  IEvent,
  IEventReview,
  INewEventReviewInputDTO,
  INewEventInputDTO,
  IUpdateEventDTO,
  IUpdateEventReviewDTO
} from "../../interfaces/IEvent";
import { IAttendEvent, INewAttendEventDTO } from "../../interfaces/IUser";
import ErrorService from "../../services/error";
import EventService from "../../services/event";

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
   * params: None
   * description: creates a new event
   */
  route.post(
    "",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req, res, next) => {
      try {
        const newEvent: INewEventInputDTO = {
          ...req.body,
          postedBy: req.user!
        };

        const eventService = new EventService();
        const event = await eventService.createEvent(newEvent);
        res.status(200).send(event);
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/events/:eventId
   * method: DELETE
   * body: None
   * params:
   * {
   *  eventId: string
   * }
   * description: deletes an event
   */
  route.delete(
    "/:eventId",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req, res, next) => {
      try {
        const eventId = req.params.eventId;
        const eventService = new EventService();
        await eventService.deleteEventById(eventId, req.user!);
        res.status(200).send();
      } catch (err) {
        return next(err);
      }
    }
  );

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
   *  eventId: string
   * }
   * description: updates an event
   */
  route.patch(
    "/:eventId",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req, res, next) => {
      try {
        const eventId = req.params.eventId;
        const eventService = new EventService();
        const reqBody = req.body as IUpdateEventDTO;

        const updatedEvent = await eventService.updateEventById(
          eventId,
          reqBody,
          req.user!
        );

        res.status(200).send(updatedEvent);
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/events
   * method: GET
   * body: None
   * params: None
   * description: gets all the events or [] if no events exist
   */
  route.get("", async (req, res, next) => {
    try {
      const events: IEvent[] = await Event.find({}).sort({startDate: 'ascending'})
        .populate("postedBy", ["username", "role", "profileURL"])
        .populate({
          path: "fandom",
          populate: {
            path: "category"
          }
        });
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
   * description: gets events by id or [] if no event
   */
  route.get("/:eventId", async (req, res, next) => {
    try {
      const eventId = req.params.eventId;
      const eventService = new EventService();
      const event = await eventService.getEventById(eventId);

      res.status(200).send(event);
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
   * params: None
   * description: creates a new review on an event
   */
  route.post(
    "/reviews/:eventId",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req, res, next) => {
      try {
        const eventId = req.params.eventId;
        const newReview: INewEventReviewInputDTO = {
          ...req.body,
          postedBy: req.user!
        };

        const eventService = new EventService();
        const review = await eventService.createReview(eventId, newReview);
        res.status(200).send(review);
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/events/reviews/:eventId
   * method: DELETE
   * body: None
   * params:
   * {
   *  eventId: string
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

      const reviews = await EventReview.find({ event: event._id });

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
   *  reviewId: string
   * }
   * description: deletes a review
   */
  route.delete(
    "/review/:reviewId",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req, res, next) => {
      try {
        const reviewId = req.params.reviewId;
        const eventService = new EventService();

        await eventService.deleteReviewById(reviewId, req.user!);
        res.status(200).send();
      } catch (err) {
        return next(err);
      }
    }
  );

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
   *  reviewId: string
   * }
   * description: updates a review
   */
  route.patch(
    "/reviews/:reviewId",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req, res, next) => {
      try {
        const reviewId = req.params.reviewId;
        const eventId = req.body.event;

        const eventService = new EventService();
        const reqBody = req.body as IUpdateEventReviewDTO;

        const updatedReview = await eventService.updateReviewById(
          eventId,
          reviewId,
          reqBody,
          req.user!
        );

        res.status(200).send(updatedReview);
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/events/reviews/:eventId
   * method: GET
   * body: None
   * params:
   * {
   *  eventId: string
   * }
   * description: gets all the reviews of an event or [] if no reviews exist
   */
  route.get("/reviews/:eventId", async (req, res, next) => {
    try {
      const eventId = req.params.eventId;
      const eventService = new EventService();
      const event: IEvent = await eventService.getEventById(eventId);
      const reviews: IEventReview[] = await eventService.getEventReviewsById(
        event._id
      );

      res.status(200).send(reviews);
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
   *  eventId: string
   * }
   * description: user attends an event
   */
  route.post(
    "/attend/:eventId",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req, res, next) => {
      try {
        const eventId = req.params.eventId;
        const newAttendee: INewAttendEventDTO = {
          ...req.body,
          user: req.user!
        };

        const eventService = new EventService();
        const attendee = await eventService.createAttendee(
          eventId,
          newAttendee
        );

        res.status(200).send(attendee);
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/events/attend/:attendId
   * method: DELETE
   * body: None
   * params:
   * {
   *  attendId: string
   * }
   * description: deletes an attendance
   */
  route.delete(
    "/attend/:attendId",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req, res, next) => {
      try {
        const attendeeId = req.params.attendId;
        const eventService = new EventService();

        // Should check if user who attended is the one deleting or admin
        eventService.deleteAttendeeById(attendeeId, req.user!);
        res.status(200).send();
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/events/attend/:eventId
   * method: DELETE
   * body: None
   * params:
   * {
   *  eventId: string
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

      const attendees = await Attend.find({ event: event._id });

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
   * description: gets all the attendees by eventId or [] if no event/attendees exist
   */
  route.get("/attend/:eventId", async (req, res, next) => {
    try {
      const eventId = req.params.eventId;
      const eventService = new EventService();
      const event: IEvent = await eventService.getEventById(eventId);
      const attendees: IAttendEvent[] = await eventService.getEventAttendeesById(
        eventId
      );

      res.status(200).send(attendees);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/events/:categoryName/:fandomName
   * method: GET
   * body: None
   * params:
   * {
   *  categoryName: string
   *  fandomName: string
   * }
   * description: gets events by fandomName or [] if no fandoms
   */
  route.get("/:categoryName/:fandomName", async (req, res, next) => {
    try {
      const categoryName = req.params.categoryName;
      const fandomName = req.params.fandomName;
      const category = categoryName.split("-").join(" ");
      const fandom = fandomName.split("-").join(" ");

      const eventService = new EventService();
      const events = await eventService.getEventsByFandom(category, fandom);

      res.status(200).send(events);
    } catch (err) {
      return next(err);
    }
  });
};
