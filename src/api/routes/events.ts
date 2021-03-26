import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import { isValidObjectId } from "mongoose";
import EventReview from "../../models/event-review";
import Event from "../../models/event";
import Fandom from "../../models/fandom";
import User from "../../models/user";
import {
  IEvent,
  IEventReview,
  INewEventReviewInputDTO,
  INewEventInputDTO,
} from "../../interfaces/IEvent";
import ErrorService from "../../services/error";

const route = Router();

export default (app: Router) => {
  app.use("/events", route);

  /**
   * path: /api/events
   * method: POST
   * body:
   * {
   *  name: string;
   *  description: string;
   *  location: string;
   *  startDate: string;    // Change to Date
   *  endDate: string;      // Change to Date
   *  fandom: string;
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
          `Fandom with id ${newEvent.fandom} does not exist-1`
        );
      }

      const newEventDoc = await Event.create(fandom);
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

//   /**
//    * path: /api/fandoms/:fandomId
//    * method: PATCH
//    * body:
//    * {
//    *  name: string,
//    *  backgroundURL: string,
//    *  category: string
//    * }
//    * params:
//    * {
//    *  fandomId: number
//    * }
//    * description: updates a fandom
//    */
//   route.patch("/:fandomId", async (req, res, next) => {
//     try {
//       const fandomId = req.params.fandomId;

//       if (!isValidObjectId(fandomId)) {
//         throw new ErrorService(
//           "NotFoundError",
//           `Fandom with id ${fandomId} does not exist`
//         );
//       }

//       const fandomDoc = await Fandom.findById(fandomId);

//       if (!fandomDoc) {
//         throw new ErrorService(
//           "NotFoundError",
//           `Fandom with id ${fandomId} does not exist`
//         );
//       }

//       //should be checking if user who created fandom is the one updating or admin
//       fandomDoc.name = req.body.name || fandomDoc.name;
//       fandomDoc.backgroundURL =
//         req.body.backgroundURL || fandomDoc.backgroundURL;
//       fandomDoc.category = req.body.category || fandomDoc.category;

//       const updatedFandom = await fandomDoc.save();
//       const fandom = updatedFandom.toObject();
//       Reflect.deleteProperty(fandom, "createdBy");

//       res.status(200).send(fandom);
//     } catch (err) {
//       return next(err);
//     }
//   });

//   /**
//    * path: /api/fandoms/categories
//    * method: GET
//    * body: None
//    * params: None
//    * description: gets all the fandom categories or [] if no categories
//    */
//   route.get("/categories", async (req, res, next) => {
//     try {
//       const categories: IFandomCategoryDTO[] = await FandomCategory.find(
//         {}
//       ).select("-createdBy");
//       res.status(200).send(categories);
//     } catch (err) {
//       return next(err);
//     }
//   });

//   /**
//    * path: /api/fandoms/categories/:categoryName
//    * method: GET
//    * body: None
//    * params:
//    * {
//    *  categoryName: string
//    * }
//    * description: gets all the fandoms in categoryName or [] if no fandoms
//    */
//   route.get("/categories/:categoryName", async (req, res, next) => {
//     try {
//       const categoryName = req.params.categoryName;
//       const category = await FandomCategory.findOne({
//         name: categoryName.toLowerCase(),
//       });

//       if (!category) {
//         throw new ErrorService(
//           "NotFoundError",
//           `Category with name ${categoryName} does not exist`
//         );
//       }

//       const fandoms: IFandomDTO[] =
//         (await Fandom.find({ category: category._id }).select("-createdBy")) ||
//         [];

//       res.status(200).send(fandoms);
//     } catch (err) {
//       return next(err);
//     }
//   });

//   /**
//    * path: /api/fandoms/categories
//    * method: POST
//    * body:
//    * {
//    *    name: string,
//    *    backgroundURL: string
//    * }
//    * params: None
//    * description: creates a new fandom categories
//    */
//   route.post("/categories", async (req, res, next) => {
//     try {
//       //should be getting from req.user
//       const createdByUser = await User.findOne({ role: "admin" });
//       const newCategory: INewFandomCategoryInputDTO = {
//         ...req.body,
//         createdBy: createdByUser?._id,
//       };

//       const newCategoryDoc = await FandomCategory.create(newCategory);
//       const category = newCategoryDoc.toObject();
//       Reflect.deleteProperty(category, "createdBy");

//       res.status(200).send(category);
//     } catch (err) {
//       if (err.name === "MongoError" && err.code === 11000) {
//         return next(
//           new ErrorService("MongoError", "Duplicate fandom category")
//         );
//       }

//       return next(err);
//     }
//   });

//   /**
//    * path: /api/fandoms/categories/:categoryId
//    * method: DELETE
//    * body: None
//    * params:
//    * {
//    *    categoryId: number
//    * }
//    * description: deletes category with id categoryId
//    */
//   route.delete("/categories/:categoryId", async (req, res, next) => {
//     try {
//       const categoryId = req.params.categoryId;
//       if (!isValidObjectId(categoryId)) {
//         throw new ErrorService(
//           "NotFoundError",
//           `Fandom category with id ${categoryId} not found`
//         );
//       }
//       const categoryDoc = await FandomCategory.findById(categoryId);
//       //check if user who created category is the one deleting (one who sent request) or admin

//       if (!categoryDoc) {
//         throw new ErrorService(
//           "NotFoundError",
//           `Fandom category with id ${categoryId} not found`
//         );
//       }

//       await categoryDoc.delete();
//       res.status(200).send();
//     } catch (err) {
//       return next(err);
//     }
//   });

//   /**
//    * path: /api/fandoms/categories/:categoryId
//    * method: PATCH
//    * body:
//    * {
//    *    name: string,
//    *    backgroundURL: string
//    * }
//    * params:
//    * {
//    *    categoryId: number
//    * }
//    * description: updates category with id categoryId
//    */
//   route.patch("/categories/:categoryId", async (req, res, next) => {
//     try {
//       const categoryId = req.params.categoryId;
//       if (!isValidObjectId(categoryId)) {
//         throw new ErrorService(
//           "NotFoundError",
//           `Fandom category with id ${categoryId} not found`
//         );
//       }

//       const categoryDoc = await FandomCategory.findById(categoryId);
//       //check if user who created category is the one updating (one who sent request)

//       if (!categoryDoc) {
//         throw new ErrorService(
//           "NotFoundError",
//           `Fandom category with id ${categoryId} not found`
//         );
//       }

//       categoryDoc!.name = req.body.name || categoryDoc.name;
//       categoryDoc!.backgroundURL =
//         req.body.backgroundURL || categoryDoc.backgroundURL;

//       const updatedCategory = await categoryDoc!.save();
//       const category = updatedCategory.toObject();
//       Reflect.deleteProperty(category, "createdBy");

//       res.status(200).send(category);
//     } catch (err) {
//       return next(err);
//     }
//   });
};
