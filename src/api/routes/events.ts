import { Router } from "express";
import passport from "passport";
import {
  INewEventReviewInputDTO,
  INewEventInputDTO,
  IUpdateEventDTO,
  IUpdateEventReviewDTO
} from "../../interfaces/IEvent";
import { INewAttendEventDTO } from "../../interfaces/IUser";
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
          postedBy: req.user!._id!
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
      const eventService = new EventService();
      const events = await eventService.getEventsMatchingFilters({});
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
   * description: gets event by id
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
   * path: /api/events/:eventId/reviews
   * method: POST
   * body:
   * {
   *  title: string,
   *  content: string,
   *  rating: number,
   *  event: string
   * }
   * params: None
   * description: creates a new review for event with eventId
   */
  route.post(
    "/:eventId/reviews",
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
   * path: /api/events/:eventId/reviews
   * method: DELETE
   * body: None
   * params:
   * {
   *  eventId: string
   * }
   * description: deletes all reviews of an event
   */
  route.delete(
    "/:eventId/reviews",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req, res, next) => {
      try {
        const eventId = req.params.eventId;
        const eventService = new EventService();
        await eventService.deleteAllReviews(eventId);
        res.status(200).send();
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/events/reviews/:reviewId
   * method: DELETE
   * body: None
   * params:
   * {
   *  reviewId: string
   * }
   * description: deletes a review by id
   */
  route.delete(
    "/reviews/:reviewId",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req, res, next) => {
      try {
        const reviewId = req.params.reviewId;
        const eventService = new EventService();
        const deletedReview = await eventService.deleteReviewById(
          reviewId,
          req.user!
        );
        const updatedSummary = await eventService.getReviewSummary(
          deletedReview.event
        );
        res.status(200).send(updatedSummary);
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

        const eventService = new EventService();
        const reqBody = req.body as IUpdateEventReviewDTO;

        const updatedReview = await eventService.updateReviewById(
          reviewId,
          reqBody,
          req.user!
        );
        const updatedSummary = await eventService.getReviewSummary(
          updatedReview.event
        );
        res.status(200).send({ updatedReview, updatedSummary });
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/events/:eventId/reviews
   * method: GET
   * body: None
   * params:
   * {
   *  eventId: string
   * }
   * description: gets all the reviews of an event or [] if no reviews
   */
  route.get("/:eventId/reviews", async (req, res, next) => {
    try {
      const eventId = req.params.eventId;
      const eventService = new EventService();
      const reviews = await eventService.getEventReviewsById(eventId);
      const reviewSummary = await eventService.getReviewSummary(eventId);
      res.status(200).send({ reviews, summary: reviewSummary });
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
          user: req.user!._id!
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
   * description: deletes an attendee from an event
   */
  route.delete(
    "/attend/:attendId",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req, res, next) => {
      try {
        const attendeeId = req.params.attendId;
        const eventService = new EventService();
        await eventService.deleteAttendeeById(attendeeId, req.user!);
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
   * description: deletes all attendees of an event
   */
  route.delete(
    "/attends/:eventId",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req, res, next) => {
      try {
        const eventId = req.params.eventId;
        const eventService = new EventService();
        await eventService.deleteAllAttendees(eventId);
        res.status(200).send();
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/events/attend/:eventId
   * method: GET
   * body: None
   * params:
   * {
   *  eventId: string
   * }
   * description: gets all the attendees for an event or [] if no attendees
   */
  route.get("/attend/:eventId", async (req, res, next) => {
    try {
      const eventId = req.params.eventId;
      const eventService = new EventService();
      const attendees = await eventService.getEventAttendeesById(eventId);
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
      const category = categoryName.split("-").join(" ").toLowerCase();
      const fandom = fandomName.split("-").join(" ").toLowerCase();

      const eventService = new EventService();
      const events = await eventService.getEventsByFandom(category, fandom);

      res.status(200).send(events);
    } catch (err) {
      return next(err);
    }
  });
};
