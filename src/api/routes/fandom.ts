import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import FandomCategory from "../../models/fandom-category";
import User from "../../models/user";
import {
  IFandomCategory,
  IFandomCategoryDTO,
  INewFandomCategoryInputDTO
} from "../../interfaces/IFandom";

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
};
