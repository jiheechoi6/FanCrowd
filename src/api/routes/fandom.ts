import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import User from "../../models/user";
import passport from "passport";
import {
  INewFandomCategoryInputDTO,
  INewFandomCommentInputDTO,
  INewFandomInputDTO,
  INewFandomPostInputDTO,
  IUpdateCategoryDTO,
  IUpdateCommentDTO,
  IUpdateFandomDTO,
  IUpdatePostDTO
} from "../../interfaces/IFandom";
import ErrorService from "../../services/error";
import FandomService from "../../services/fandom";
import { INewUserLikeInputDTO } from "../../interfaces/IUser";

const route = Router();

export default (app: Router) => {
  app.use("/fandoms", route);

  /**
   * path: /api/fandoms
   * method: POST
   * body:
   * {
   *  name: string,
   *  backgroundURL: string,
   *  category: string
   * }
   * params: None
   * description: creates a new fandom
   */
  route.post(
    "",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      try {
        console.log(req.user);
        //should be getting from req.user
        const createdByUser = await User.findOne({ role: "user" });
        const newFandom: INewFandomInputDTO = {
          ...req.body,
          createdBy: createdByUser?._id
        };

        const fandomService = new FandomService();
        const fandom = await fandomService.createFandom(newFandom);
        res.status(200).send(fandom);
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/fandoms/:fandomId
   * method: DELETE
   * body: None
   * params:
   * {
   *  fandomId: number
   * }
   * description: deletes a fandom
   */
  route.delete("/:fandomId", async (req, res, next) => {
    try {
      const fandomId = req.params.fandomId;
      const fandomService = new FandomService();

      //Should be passing in req.user.id instead of undefined
      await fandomService.deleteFandomById(fandomId, undefined);
      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/:fandomId
   * method: PATCH
   * body:
   * {
   *  name: string,
   *  backgroundURL: string,
   *  category: string
   * }
   * params:
   * {
   *  fandomId: number
   * }
   * description: updates a fandom
   */
  route.patch("/:fandomId", async (req, res, next) => {
    try {
      const fandomId = req.params.fandomId;
      const fandomService = new FandomService();
      const reqBody = req.body as IUpdateFandomDTO;

      //Should be passing in req.user.id instead of undefined
      const updatedFandom = await fandomService.updateFandomById(
        fandomId,
        reqBody,
        undefined
      );
      res.status(200).send(updatedFandom);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/categories
   * method: GET
   * body: None
   * params: None
   * description: gets all the fandom categories or [] if no categories
   */
  route.get("/categories", async (req, res, next) => {
    try {
      const fandomService = new FandomService();
      const categories = await fandomService.getFandomCategories();

      res.status(200).send(categories);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/categories/:categoryName
   * method: GET
   * body: None
   * params:
   * {
   *  categoryName: string
   * }
   * description: gets all the fandoms in categoryName or [] if no fandoms
   */
  route.get("/categories/:categoryName", async (req, res, next) => {
    try {
      const fandomService = new FandomService();
      const fandoms = await fandomService.getFandomsInCategory(
        req.params.categoryName
      );
      res.status(200).send(fandoms);
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

      const fandomService = new FandomService();
      const category = await fandomService.createCategory(newCategory);
      res.status(200).send(category);
    } catch (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return next(
          new ErrorService("MongoError", "Duplicate fandom category")
        );
      }

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
      const fandomService = new FandomService();

      //Should be passing in req.user.id instead of undefined
      await fandomService.deleteCategoryById(req.params.categoryId, undefined);
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
      const fandomService = new FandomService();
      const reqBody = req.body as IUpdateCategoryDTO;

      //Should be passing in req.user.id instead of undefined
      const category = await fandomService.updateCategoryById(
        req.params.categoryId,
        reqBody,
        undefined
      );

      res.status(200).send(category);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/categories/:categoryName/:fandomName/posts
   * method: GET
   * body: None
   * params:
   * {
   *    categoryName: string,
   *    fandomName: string
   * }
   * description: gets all the posts for a fandom given fandom name and category
   */
  route.get(
    "/categories/:categoryName/:fandomName/posts",
    async (req, res, next) => {
      try {
        //of the form category-name and fandom-name
        const categoryName = req.params.categoryName;
        const fandomName = req.params.fandomName;

        const fandomService = new FandomService();
        const posts = await fandomService.getPostsForFandom(
          categoryName,
          fandomName
        );

        res.status(200).send(posts);
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/fandoms/posts/:postId
   * method: GET
   * body: None
   * params:
   * {
   *    postId: string
   * }
   * description: gets a post by id
   */
  route.get("/posts/:postId", async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const fandomService = new FandomService();
      const post = await fandomService.getPostById(postId);

      res.status(200).send(post);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/posts
   * method: POST
   * body:
   * {
   *  title: string,
   *  content: string,
   *  fandom: string
   * }
   * params: None
   * description: creates a post in a fandom
   */
  route.post("/posts", async (req, res, next) => {
    try {
      //should be getting from req.user
      const createdByUser = await User.findOne({ role: "user" });
      const newPost: INewFandomPostInputDTO = {
        ...req.body,
        postedBy: createdByUser?._id
      };

      const fandomService = new FandomService();
      const post = await fandomService.createPost(newPost, createdByUser);
      res.status(200).send(post);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/posts/:postId
   * method: DELETE
   * body: None
   * params:
   * {
   *    postId: string
   * }
   * description: removes a post from a fandom
   */
  route.delete("/posts/:postId", async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const fandomService = new FandomService();

      //Should be passing in req.user.id instead of undefined
      await fandomService.deletePostById(postId, undefined);
      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/posts/:postId
   * method: PATCH
   * body:
   * {
   *  title: string,
   *  content: string,
   *  fandom: string
   * }
   * params:
   * {
   *    postId: string
   * }
   * description: updates a post
   */
  route.patch("/posts/:postId", async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const reqBody = req.body as IUpdatePostDTO;
      const fandomService = new FandomService();

      //Should be passing in req.user.id instead of undefined
      const post = await fandomService.updatePostById(
        postId,
        reqBody,
        undefined
      );

      res.status(200).send(post);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/posts/:postId/comments
   * method: GET
   * body: None
   * params:
   * {
   *    postId: string
   * }
   * description: gets comments for a post
   */
  route.get("/posts/:postId/comments", async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const fandomService = new FandomService();
      const comments = await fandomService.getCommentsForPost(postId);
      res.status(200).send(comments);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/comments
   * method: POST
   * body:
   * {
   *  title: string,
   *  content: string,
   *  fandomPost: string
   * }
   * params: None
   * description: creates a comment
   */
  route.post("/comments", async (req, res, next) => {
    try {
      //should be getting from req.user
      const createdByUser = await User.findOne({ role: "user" });
      const newComment: INewFandomCommentInputDTO = {
        ...req.body,
        postedBy: createdByUser?._id
      };

      const fandomService = new FandomService();
      const comment = await fandomService.createComment(
        newComment,
        createdByUser
      );

      res.status(200).send(comment);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/comments/:commentId
   * method: DELETE
   * body: None
   * params:
   * {
   *    commentId: string
   * }
   * description: deletes a comment
   */
  route.delete("/comments/:commentId", async (req, res, next) => {
    try {
      const commentId = req.params.commentId;
      const fandomService = new FandomService();

      //Should be passing in req.user.id instead of undefined
      await fandomService.deleteCommentById(commentId, undefined);
      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/comments/:commentId
   * method: PATCH
   * body:
   * {
   *  title: string,
   *  content: string,
   *  fandomPost: string
   * }
   * params:
   * {
   *    commentId: string
   * }
   * description: updates a comment
   */
  route.patch("/comments/:commentId", async (req, res, next) => {
    try {
      const commentId = req.params.commentId;
      const reqBody = req.body as IUpdateCommentDTO;
      const fandomService = new FandomService();

      //Should be passing in req.user.id instead of undefined
      const comment = await fandomService.updateCommentById(
        commentId,
        reqBody,
        undefined
      );

      res.status(200).send(comment);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/fandoms/likes
   * method: POST
   * body:
   * {
   *  fandomPost: string,
   *  fandomComment: string,
   *  isLike: boolean
   * }
   * params: None
   * description: adds like/dislike to a comment or post
   */
  route.post("/likes", async (req, res, next) => {
    try {
      //should be getting from req.user
      const createdByUser = await User.findOne({ role: "user" });
      const newLike: INewUserLikeInputDTO = {
        ...req.body,
        user: createdByUser?._id
      };

      const fandomService = new FandomService();
      await fandomService.updateLikes(newLike);
      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  });
};
