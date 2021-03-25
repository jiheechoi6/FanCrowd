import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import { isValidObjectId } from "mongoose";
import FandomCategory from "../../models/fandom-category";
import User from "../../models/user";
import {
  IFandomCategory,
  IFandomCategoryDTO,
  INewFandomCategoryInputDTO
} from "../../interfaces/IFandom";
import ErrorService from "../../services/error";

const route = Router();

export default (app: Router) => {
  app.use("/fandoms", route);

  /**
   * path: /api/fandoms/categories
   * method: GET
   * body: None
   * params: None
   * description: gets all the fandom categories or [] if no categories
   */
  route.get("/categories", async (req, res, next) => {
    try {
      const categories: IFandomCategoryDTO[] = await FandomCategory.find(
        {}
      ).select("-createdBy");
      res.status(200).send(categories);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/categories
   * method: POST
   * body:
   * {
   *    name: string,
   *    backgroundURL: string
   * }
   * params: None
   * description: creates a new fandom categories
   */
  route.post("/categories", async (req, res, next) => {
    try {
      //should be getting from req.user
      const createdByUser = await User.findOne({ role: "admin" });
      const newCategory: INewFandomCategoryInputDTO = {
        ...req.body,
        createdBy: createdByUser?._id
      };

      const newCategoryDoc = await FandomCategory.create(newCategory);
      const category = newCategoryDoc.toObject();
      Reflect.deleteProperty(category, "createdBy");

      res.status(200).send(category);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/categories/:categoryId
   * method: DELETE
   * body: None
   * params:
   * {
   *    categoryId: number
   * }
   * description: deletes category with id categoryId
   */
  route.delete("/categories/:categoryId", async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
      if (!isValidObjectId(categoryId)) {
        throw new ErrorService(
          "NotFoundError",
          `Fandom category with id ${categoryId} not found`
        );
      }
      const categoryDoc = await FandomCategory.findById(categoryId);
      //check if user who created category is the one deleting (one who sent request)

      if (!categoryDoc) {
        throw new ErrorService(
          "NotFoundError",
          `Fandom category with id ${categoryId} not found`
        );
      }

      await categoryDoc.delete();
      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/categories/:categoryId
   * method: PATCH
   * body:
   * {
   *    name: string,
   *    backgroundURL: string
   * }
   * params:
   * {
   *    categoryId: number
   * }
   * description: updates category with id categoryId
   */
  route.patch("/categories/:categoryId", async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
      if (!isValidObjectId(categoryId)) {
        throw new ErrorService(
          "NotFoundError",
          `Fandom category with id ${categoryId} not found`
        );
      }

      const categoryDoc = await FandomCategory.findById(categoryId);
      //check if user who created category is the one updating (one who sent request)

      if (!categoryDoc) {
        throw new ErrorService(
          "NotFoundError",
          `Fandom category with id ${categoryId} not found`
        );
      }

      categoryDoc!.name = req.body.name || categoryDoc.name;
      categoryDoc!.backgroundURL =
        req.body.backgroundURL || categoryDoc.backgroundURL;

      const updatedCategory = await categoryDoc!.save();
      const category = updatedCategory.toObject();
      Reflect.deleteProperty(category, "createdBy");

      res.status(200).send(category);
    } catch (err) {
      return next(err);
    }
  });
};
