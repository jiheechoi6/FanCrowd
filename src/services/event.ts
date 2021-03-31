import mongoose from "mongoose";
import Fandom from "../models/fandom";
import User from "../models/user";
import Event from "../models/event";
import {
    IEvent, 
    INewEventInputDTO,
    IEventReview,
    INewEventReviewInputDTO,
    IUpdateEventDTO
} from "../interfaces/IEvent";
import ErrorService from "./error";
import GlobalService from "./global";
import { IUser } from "../interfaces/IUser";
import FandomService from "./fandom";

export default class EventService {
  private static _globalService = new GlobalService();
  private static _fandomService = new FandomService();

  public async getEventById(eventId: mongoose.Types._ObjectId | string) {
    const event = await Event.findById(eventId).populate("postedBy").populate("fandom");

    if (!event) {
      throw new ErrorService(
        "NotFoundError",
        `Event with id ${eventId} does not exist`
      );
    }

    return event;
  }

  public async getEventByFandom(fandomName: string) {
    const fandom = await EventService._fandomService.getFandomByName(fandomName);
    const events: IEvent[] =
        (await Event.find({ fandom: fandom._id }).populate("postedBy").populate("fandom")) ||
        [];

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

    if (updatedEvent.fandom && updatedEvent.fandom._id) {
      const fandom = await EventService._fandomService.getFandomById(updatedEvent.fandom._id);
      eventDoc.fandom = fandom;
    }

    const updatedEventDoc = await eventDoc.save();
    const event = updatedEventDoc.toObject();
    Reflect.deleteProperty(event, "postedBy");

    return event;
  }

  /* TODO */
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
}
