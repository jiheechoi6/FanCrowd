import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import mongoose from "mongoose";
import FandomCategory from "../../models/fandom-category";
import Fandom from "../../models/fandom";
import FandomPost from "../../models/fandom-post";
import FandomComment from "../../models/fandom-comment";
import User from "../../models/user";
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
} from "../../interfaces/IFandom";
import ErrorService from "../../services/error";
import FandomService from "../../services/fandom";
import GlobalService from "../../services/global";

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
  route.post("", async (req, res, next) => {
    try {
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
  });

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

      //should be passing req.currentUser to updateFandomById
      const updatedFandom = fandomService.updateFandomById(
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
      const categoryName = req.params.categoryName;
      const category = await FandomCategory.findOne({
        name: categoryName.toLowerCase()
      });

      if (!category) {
        throw new ErrorService(
          "NotFoundError",
          `Category with name ${categoryName} does not exist`
        );
      }

      const fandoms: IFandomDTO[] = await Fandom.find({
        category: category._id
      }).select("-createdBy");

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

      const newCategoryDoc = await FandomCategory.create(newCategory);
      const category = newCategoryDoc.toObject();
      Reflect.deleteProperty(category, "createdBy");

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
      const categoryId = req.params.categoryId;
      if (!mongoose.isValidObjectId(categoryId)) {
        throw new ErrorService(
          "NotFoundError",
          `Fandom category with id ${categoryId} not found`
        );
      }
      const categoryDoc = await FandomCategory.findById(categoryId);
      //check if user who created category is the one deleting (one who sent request) or admin

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
      if (!mongoose.isValidObjectId(categoryId)) {
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

        const category = await FandomCategory.findOne({
          name: categoryName.toLowerCase().split("-").join(" ")
        });

        if (!category) {
          throw new ErrorService(
            "NotFoundError",
            `Category with name ${categoryName} does not exist`
          );
        }

        const fandom = await Fandom.findOne({
          name: fandomName.toLowerCase().split("-").join(" "),
          category: category._id
        });

        if (!fandom) {
          throw new ErrorService(
            "NotFoundError",
            `Fandom with name ${fandomName} does not exist`
          );
        }

        const postsWithLikes: IFandomPostDTOWithLikes[] = await FandomPost.aggregate(
          [
            {
              $match: {
                fandom: fandom._id
              }
            },
            {
              $lookup: {
                from: "userlikes",
                as: "numLikes",
                let: {
                  fandomPostId: "$_id"
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$isLike", true] },
                          {
                            $eq: ["$fandomPost", "$$fandomPostId"]
                          }
                        ]
                      }
                    }
                  },
                  {
                    $project: {
                      user: 1
                    }
                  }
                ]
              }
            },
            {
              $lookup: {
                from: "userlikes",
                as: "numDislikes",
                let: {
                  fandomPostId: "$_id"
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$isLike", false] },
                          {
                            $eq: ["$fandomPost", "$$fandomPostId"]
                          }
                        ]
                      }
                    }
                  },
                  {
                    $project: {
                      user: 1
                    }
                  }
                ]
              }
            },
            {
              $lookup: {
                from: "users",
                as: "postedBy",
                localField: "postedBy",
                foreignField: "_id"
              }
            },
            {
              $unwind: "$postedBy"
            },
            {
              $project: {
                postedBy: {
                  username: 1,
                  profileURL: 1
                },
                numLikes: 1,
                numDislikes: 1,
                title: 1,
                content: 1,
                createdAt: 1,
                fandom: 1
              }
            }
          ]
        );

        res.status(200).send(postsWithLikes);
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
      if (!mongoose.isValidObjectId(postId)) {
        throw new ErrorService(
          "NotFoundError",
          `Post with id ${postId} not found`
        );
      }

      const posts: IFandomPostDTOWithLikes[] = await FandomPost.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(postId)
          }
        },
        {
          $lookup: {
            from: "userlikes",
            as: "numLikes",
            let: {
              fandomPostId: "$_id"
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$isLike", true] },
                      {
                        $eq: ["$fandomPost", "$$fandomPostId"]
                      }
                    ]
                  }
                }
              },
              {
                $project: {
                  user: 1
                }
              }
            ]
          }
        },
        {
          $lookup: {
            from: "userlikes",
            as: "numDislikes",
            let: {
              fandomPostId: "$_id"
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$isLike", false] },
                      {
                        $eq: ["$fandomPost", "$$fandomPostId"]
                      }
                    ]
                  }
                }
              },
              {
                $project: {
                  user: 1
                }
              }
            ]
          }
        },
        {
          $lookup: {
            from: "users",
            as: "postedBy",
            localField: "postedBy",
            foreignField: "_id"
          }
        },
        {
          $unwind: "$postedBy"
        },
        {
          $project: {
            postedBy: {
              username: 1,
              profileURL: 1
            },
            numLikes: 1,
            numDislikes: 1,
            title: 1,
            content: 1,
            createdAt: 1,
            fandom: 1
          }
        }
      ]);

      const postWithId = posts[0];
      if (!postWithId) {
        throw new ErrorService(
          "NotFoundError",
          `Post with id ${postId} not found`
        );
      }

      res.status(200).send(postWithId);
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

      if (!mongoose.isValidObjectId(newPost.fandom)) {
        throw new ErrorService(
          "NotFoundError",
          `Fandom with id ${newPost.fandom} does not exist`
        );
      }

      const fandom = await Fandom.findById(newPost.fandom);

      if (!fandom) {
        throw new ErrorService(
          "NotFoundError",
          `Fandom with id ${newPost.fandom} does not exist`
        );
      }

      const newPostDoc = await FandomPost.create(newPost);
      const post: IFandomPostDTOWithLikes = {
        ...newPostDoc.toObject(),
        numDislikes: [],
        numLikes: [],
        postedBy: {
          username: createdByUser!.username,
          profileURL: createdByUser!.profileURL
        }
      };

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
      if (!mongoose.isValidObjectId(postId)) {
        throw new ErrorService(
          "NotFoundError",
          `Post with id ${postId} not found`
        );
      }
      const postDoc = await FandomPost.findById(postId);
      //check if user who created post is the one deleting (one who sent request) or admin

      if (!postDoc) {
        throw new ErrorService(
          "NotFoundError",
          `Post with id ${postId} not found`
        );
      }

      await postDoc.delete();
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
      if (!mongoose.isValidObjectId(postId)) {
        throw new ErrorService(
          "NotFoundError",
          `Post with id ${postId} not found`
        );
      }

      const postDoc = await FandomPost.findById(postId);
      //check if user who created post is the one updating (one who sent request) or admin

      if (!postDoc) {
        throw new ErrorService(
          "NotFoundError",
          `Post with id ${postId} not found`
        );
      }

      postDoc.content = req.body.content || postDoc.content;
      postDoc.title = req.body.title || postDoc.title;

      if (req.body.fandom) {
        const fandom = await Fandom.findById(req.body.fandom);

        if (!fandom) {
          throw new ErrorService(
            "NotFoundError",
            `Fandom with id ${req.body.fandom} does not exist`
          );
        }

        postDoc.fandom = req.body.fandom;
      }

      const updatedPost = await postDoc.save();

      res.status(200).send(updatedPost);
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
      if (!mongoose.isValidObjectId(postId)) {
        throw new ErrorService(
          "NotFoundError",
          `Post with id ${postId} not found`
        );
      }

      const comments: IFandomCommentDTOWithLikes[] = await FandomComment.aggregate(
        [
          {
            $match: {
              fandomPost: mongoose.Types.ObjectId(postId)
            }
          },
          {
            $lookup: {
              from: "userlikes",
              as: "numLikes",
              let: {
                fandomCommentId: "$_id"
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$isLike", true] },
                        {
                          $eq: ["$fandomComment", "$$fandomCommentId"]
                        }
                      ]
                    }
                  }
                },
                {
                  $project: {
                    user: 1
                  }
                }
              ]
            }
          },
          {
            $lookup: {
              from: "userlikes",
              as: "numDislikes",
              let: {
                fandomCommentId: "$_id"
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$isLike", false] },
                        {
                          $eq: ["$fandomComment", "$$fandomCommentId"]
                        }
                      ]
                    }
                  }
                },
                {
                  $project: {
                    user: 1
                  }
                }
              ]
            }
          },
          {
            $lookup: {
              from: "users",
              as: "postedBy",
              localField: "postedBy",
              foreignField: "_id"
            }
          },
          {
            $unwind: "$postedBy"
          },
          {
            $project: {
              postedBy: {
                username: 1,
                profileURL: 1
              },
              numLikes: 1,
              numDislikes: 1,
              title: 1,
              content: 1,
              createdAt: 1,
              fandomPost: 1
            }
          }
        ]
      );

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

      if (!mongoose.isValidObjectId(newComment.fandomPost)) {
        throw new ErrorService(
          "NotFoundError",
          `Post with id ${newComment.fandomPost} does not exist`
        );
      }

      const post = await FandomPost.findById(newComment.fandomPost);

      if (!post) {
        throw new ErrorService(
          "NotFoundError",
          `Post with id ${newComment.fandomPost} does not exist`
        );
      }

      const newCommentDoc = await FandomComment.create(newComment);
      const comment: IFandomCommentDTOWithLikes = {
        ...newCommentDoc.toObject(),
        numDislikes: [],
        numLikes: [],
        postedBy: {
          username: createdByUser!.username,
          profileURL: createdByUser!.profileURL
        }
      };

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
      if (!mongoose.isValidObjectId(commentId)) {
        throw new ErrorService(
          "NotFoundError",
          `Comment with id ${commentId} not found`
        );
      }

      const comment = await FandomComment.findById(commentId);

      if (!comment) {
        throw new ErrorService(
          "NotFoundError",
          `Comment with id ${commentId} not found`
        );
      }

      await comment.delete();
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
      if (!mongoose.isValidObjectId(commentId)) {
        throw new ErrorService(
          "NotFoundError",
          `Comment with id ${commentId} not found`
        );
      }

      const comment = await FandomComment.findById(commentId);

      if (!comment) {
        throw new ErrorService(
          "NotFoundError",
          `Comment with id ${commentId} not found`
        );
      }

      comment.title = req.body.title || comment.title;
      comment.content = req.body.content || comment.content;

      if (req.body.fandomPost) {
        const post = await FandomPost.findById(req.body.fandomPost);

        if (!post) {
          throw new ErrorService(
            "NotFoundError",
            `Post with id ${req.body.fandomPost} does not exist`
          );
        }

        comment.fandomPost = req.body.fandomPost;
      }

      const updatedComment = await comment.save();
      res.status(200).send(updatedComment);
    } catch (err) {
      return next(err);
    }
  });
};
