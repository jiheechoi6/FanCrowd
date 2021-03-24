import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import FandomCategory from "../../models/fandom-category";
import { IFandomCategory } from "../../interfaces/IFandom";

const route = Router();

export default (app: Router) => {
  app.use("/fandoms", route);

  /**
   * path: /api/fandoms/categories
   * body: None
   * params: None
   * description: returns all the fandom categories or [] if no categories
   */
  route.get("/categories", async (req, res, next) => {
    try {
      const categories: IFandomCategory[] = await FandomCategory.find({});
      res.send({ data: categories });
    } catch (err) {
      return next(err);
    }
  });
};
