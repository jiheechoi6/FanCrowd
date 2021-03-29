import mongoose from "mongoose";
import FandomCategory from "../models/fandom-category";
import Fandom from "../models/fandom";
import FandomPost from "../models/fandom-post";
import FandomComment from "../models/fandom-comment";
import User from "../models/user";
import {
  IFandom,
  IFandomCategory,
  IFandomCategoryDTO,
  IFandomCommentDTOWithLikes,
  IFandomDTO,
  IFandomPost,
  IFandomPostDTOWithLikes,
  INewFandomCategoryInputDTO,
  INewFandomCommentInputDTO,
  INewFandomInputDTO,
  INewFandomPostInputDTO,
  IUpdateFandomDTO
} from "../interfaces/IFandom";
import ErrorService from "./error";
import GlobalService from "./global";

export default class FandomService {
  private static _globalService = new GlobalService();

  public async doesCategoryExist(
    categoryId: mongoose.Types._ObjectId | string
  ) {
    const category = await FandomCategory.findById(categoryId);
    if (!category) {
      throw new ErrorService(
        "NotFoundError",
        `Category with id ${categoryId} does not exist`
      );
    }
  }

  private async _getFandomById(fandomId: mongoose.Types._ObjectId | string) {
    const fandom = await Fandom.findById(fandomId);
    if (!fandom) {
      throw new ErrorService(
        "NotFoundError",
        `Fandom with id ${fandomId} does not exist`
      );
    }

    return fandom;
  }

  private async _getFandomCategoryById(
    categoryId: mongoose.Types._ObjectId | string
  ) {
    const fandomCategory = await FandomCategory.findById(categoryId);

    if (!fandomCategory) {
      throw new ErrorService(
        "NotFoundError",
        `Category with id ${categoryId} does not exist`
      );
    }

    return fandomCategory;
  }

  public async getFandomCategories() {
    const categories: IFandomCategoryDTO[] = await FandomCategory.find(
      {}
    ).select("-createdBy");
    return categories;
  }

  public async createFandom(newFandom: INewFandomInputDTO) {
    FandomService._globalService.checkValidObjectId(
      newFandom.category,
      `Category with id ${newFandom.category} does not exist`
    );

    this.doesCategoryExist(newFandom.category);
    const newFandomDoc = await Fandom.create(newFandom);
    const fandom = newFandomDoc.toObject();
    Reflect.deleteProperty(fandom, "createdBy");

    return fandom;
  }

  public async updateFandomById(
    fandomId: mongoose.Types._ObjectId | string,
    updatedFandom: IUpdateFandomDTO,
    createdByUserId: mongoose.Types._ObjectId | undefined
  ) {
    FandomService._globalService.checkValidObjectId(
      fandomId,
      `Fandom with id ${fandomId} does not exist`
    );

    const fandomDoc = await this._getFandomById(fandomId);

    //uncomment after auth is implemented
    // FandomService._globalService.hasPermission(
    //   fandomDoc.createdBy,
    //   createdByUserId,
    //   `Only the creator or an admin may update fandom with id ${fandomId}`
    // );

    fandomDoc.name = updatedFandom.name || fandomDoc.name;
    fandomDoc.backgroundURL =
      updatedFandom.backgroundURL || fandomDoc.backgroundURL;

    if (updatedFandom.category) {
      const fandomCategory = await this._getFandomCategoryById(
        updatedFandom.category
      );
      fandomDoc.category = fandomCategory._id;
    }

    const updatedFandomDoc = await fandomDoc.save();
    const fandom = updatedFandomDoc.toObject();
    Reflect.deleteProperty(fandom, "createdBy");

    return fandom;
  }

  public async deleteFandomById(
    fandomId: mongoose.Types._ObjectId | string,
    createdByUserId: mongoose.Types._ObjectId | undefined
  ) {
    FandomService._globalService.checkValidObjectId(
      fandomId,
      `Fandom with id ${fandomId} does not exist`
    );

    const fandom = await this._getFandomById(fandomId);

    //uncomment after auth is implemented
    // FandomService._globalService.hasPermission(
    //   fandom.createdBy,
    //   createdByUserId,
    //   `Only the creator or an admin may delete fandom with id ${fandomId}`
    // );

    await fandom.delete();
  }
}
