import mongoose from "mongoose";
import FandomCategory from "../models/fandom-category";
import Fandom from "../models/fandom";
import FandomPost from "../models/fandom-post";
import FandomComment from "../models/fandom-comment";
import FandomMember from "../models/fandom-member";
import UserLike from "../models/user-like";
import {
  IFandomCategoryDTO,
  IFandomCommentDTOWithLikes,
  IFandomCommentFilter,
  IFandomDTO,
  IFandomPostDTOWithLikes,
  IFandomPostFilter,
  INewFandomCategoryInputDTO,
  INewFandomCommentInputDTO,
  INewFandomInputDTO,
  INewFandomPostInputDTO,
  IUpdateCategoryDTO,
  IUpdateCommentDTO,
  IUpdateFandomDTO,
  IUpdatePostDTO
} from "../interfaces/IFandom";
import ErrorService from "./error";
import GlobalService from "./global";
import {
  INewFandomMemberInputDTO,
  INewUserLikeInputDTO,
  IRequestUser,
  IUser
} from "../interfaces/IUser";

export default class FandomService {
  private static _globalService = new GlobalService();

  public async getFandomById(fandomId: mongoose.Types._ObjectId | string) {
    const fandom = await Fandom.findById(fandomId);
    if (!fandom) {
      throw new ErrorService(
        "NotFoundError",
        `Fandom with id ${fandomId} does not exist`
      );
    }

    return fandom;
  }

  public async getFandomByName(categoryName: string, fandomName: string) {
    const category = await this.getCategoryByName(categoryName);

    const fandom = await Fandom.findOne({
      category: category?._id,
      name: fandomName.toLowerCase().split("-").join(" ")
    });

    if (!fandom) {
      throw new ErrorService(
        "NotFoundError",
        `Fandom with name ${fandomName} does not exist`
      );
    }

    return fandom;
  }

  public async getCommentDocById(commentId: mongoose.Types._ObjectId | string) {
    const comment = await FandomComment.findById(commentId);

    if (!comment) {
      throw new ErrorService(
        "NotFoundError",
        `Comment with id ${commentId} not found`
      );
    }

    return comment;
  }

  public async getPostDocById(postId: mongoose.Types._ObjectId | string) {
    const post = await FandomPost.findById(postId);

    if (!post) {
      throw new ErrorService(
        "NotFoundError",
        `Post with id ${postId} not found`
      );
    }

    return post;
  }

  public async getCategoryById(categoryId: mongoose.Types._ObjectId | string) {
    const fandomCategory = await FandomCategory.findById(categoryId);

    if (!fandomCategory) {
      throw new ErrorService(
        "NotFoundError",
        `Category with id ${categoryId} does not exist`
      );
    }

    return fandomCategory;
  }

  public async getCategoryByName(categoryName: string) {
    const fandomCategory = await FandomCategory.findOne({
      name: categoryName.toLowerCase().split("-").join(" ")
    });

    if (!fandomCategory) {
      throw new ErrorService(
        "NotFoundError",
        `Category with name ${categoryName} does not exist`
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

    this.getCategoryById(newFandom.category);
    const newFandomDoc = await Fandom.create(newFandom);
    const fandom = newFandomDoc.toObject();
    Reflect.deleteProperty(fandom, "createdBy");

    return fandom;
  }

  public async updateFandomById(
    fandomId: mongoose.Types._ObjectId | string,
    updatedFandom: IUpdateFandomDTO,
    reqUser: IRequestUser
  ) {
    FandomService._globalService.checkValidObjectId(
      fandomId,
      `Fandom with id ${fandomId} does not exist`
    );

    const fandomDoc = await this.getFandomById(fandomId);

    FandomService._globalService.hasPermission(
      fandomDoc.createdBy,
      reqUser,
      `Only the creator or an admin may update fandom with id ${fandomId}`
    );

    fandomDoc.name = updatedFandom.name || fandomDoc.name;
    fandomDoc.backgroundURL =
      updatedFandom.backgroundURL || fandomDoc.backgroundURL;

    if (updatedFandom.category) {
      const fandomCategory = await this.getCategoryById(updatedFandom.category);
      fandomDoc.category = fandomCategory._id;
    }

    const updatedFandomDoc = await fandomDoc.save();
    const fandom = updatedFandomDoc.toObject();
    Reflect.deleteProperty(fandom, "createdBy");

    return fandom;
  }

  public async deleteFandomById(
    fandomId: mongoose.Types._ObjectId | string,
    reqUser: IRequestUser
  ) {
    FandomService._globalService.checkValidObjectId(
      fandomId,
      `Fandom with id ${fandomId} does not exist`
    );

    const fandom = await this.getFandomById(fandomId);

    FandomService._globalService.hasPermission(
      fandom.createdBy,
      reqUser,
      `Only the creator or an admin may delete fandom with id ${fandomId}`
    );

    await fandom.delete();
  }

  public async getFandomsInCategory(categoryName: string) {
    const category = await FandomCategory.findOne({
      name: categoryName.toLowerCase().split("-").join(" ")
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

    return { fandoms, category };
  }

  public async createCategory(newCategory: INewFandomCategoryInputDTO) {
    const newCategoryDoc = await FandomCategory.create(newCategory);
    const category = newCategoryDoc.toObject();
    Reflect.deleteProperty(category, "createdBy");

    return category;
  }

  public async joinFandom(newMember: INewFandomMemberInputDTO) {
    FandomService._globalService.checkValidObjectId(
      newMember.fandom,
      `Fandom with id ${newMember.fandom} not found`
    );
    await this.getFandomById(newMember.fandom);
    await FandomMember.create(newMember);
  }

  public async leaveFandom(
    userId: mongoose.Types._ObjectId,
    fandomId: mongoose.Types._ObjectId | string
  ) {
    await FandomMember.deleteOne({ user: userId, fandom: fandomId });
  }

  public async isUserInFandom(
    userId: mongoose.Types._ObjectId,
    fandomId: mongoose.Types._ObjectId | string
  ) {
    return await FandomMember.exists({ user: userId, fandom: fandomId });
  }

  public async deleteCategoryById(
    categoryId: mongoose.Types._ObjectId | string,
    reqUser: IRequestUser
  ) {
    FandomService._globalService.checkValidObjectId(
      categoryId,
      `Fandom category with id ${categoryId} not found`
    );

    const categoryDoc = await this.getCategoryById(categoryId);

    FandomService._globalService.hasPermission(
      categoryDoc.createdBy,
      reqUser,
      `Only the creator or an admin may delete the fandom category with id ${categoryId}`
    );

    await categoryDoc.delete();
  }

  public async updateCategoryById(
    categoryId: mongoose.Types._ObjectId | string,
    updatedCategory: IUpdateCategoryDTO,
    reqUser: IRequestUser
  ) {
    FandomService._globalService.checkValidObjectId(
      categoryId,
      `Fandom category with id ${categoryId} not found`
    );

    const categoryDoc = await this.getCategoryById(categoryId);

    FandomService._globalService.hasPermission(
      categoryDoc.createdBy,
      reqUser,
      `Only the creator or an admin may update the fandom category with id ${categoryId}`
    );

    categoryDoc.name = updatedCategory.name || categoryDoc.name;
    categoryDoc.backgroundURL =
      updatedCategory.backgroundURL || categoryDoc.backgroundURL;

    const updatedCategoryDoc = await categoryDoc!.save();
    const category = updatedCategoryDoc.toObject();
    Reflect.deleteProperty(category, "createdBy");

    return category;
  }

  public async getPostsMatchingFilters(postFilter: IFandomPostFilter) {
    const posts: IFandomPostDTOWithLikes[] = await FandomPost.aggregate([
      {
        $match: postFilter
      },
      {
        $lookup: {
          from: "userlikes",
          as: "likes",
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
          as: "dislikes",
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
          likes: 1,
          dislikes: 1,
          title: 1,
          content: 1,
          createdAt: 1,
          fandom: 1
        }
      }
    ]);

    return posts;
  }

  public async getCommentsMatchingFilters(commentFilter: IFandomCommentFilter) {
    const comments: IFandomCommentDTOWithLikes[] = await FandomComment.aggregate(
      [
        {
          $match: commentFilter
        },
        {
          $lookup: {
            from: "userlikes",
            as: "likes",
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
            as: "dislikes",
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
            likes: 1,
            dislikes: 1,
            title: 1,
            content: 1,
            createdAt: 1,
            fandomPost: 1
          }
        }
      ]
    );

    return comments;
  }

  public async getPostsForFandom(categoryName: string, fandomName: string) {
    const fandom = await this.getFandomByName(categoryName, fandomName);

    const posts: IFandomPostDTOWithLikes[] = await this.getPostsMatchingFilters(
      { fandom: fandom._id }
    );

    return posts;
  }

  public async getPostById(postId: string) {
    FandomService._globalService.checkValidObjectId(
      postId,
      `Post with id ${postId} not found`
    );

    const posts = await this.getPostsMatchingFilters({
      _id: mongoose.Types.ObjectId(postId)
    });

    const postWithId = posts[0];

    if (!postWithId) {
      throw new ErrorService(
        "NotFoundError",
        `Post with id ${postId} not found`
      );
    }

    return postWithId;
  }

  public async createPost(
    newPost: INewFandomPostInputDTO,
    createdByUser: IRequestUser
  ) {
    FandomService._globalService.checkValidObjectId(
      newPost.fandom,
      `Fandom with id ${newPost.fandom} does not exist`
    );

    await this.getFandomById(newPost.fandom);

    const newPostDoc = await FandomPost.create(newPost);
    const post: IFandomPostDTOWithLikes = {
      ...newPostDoc.toObject(),
      dislikes: [],
      likes: [],
      postedBy: {
        username: createdByUser.username,
        profileURL: createdByUser.profileURL
      }
    };

    return post;
  }

  public async deletePostById(
    postId: mongoose.Types._ObjectId | string,
    reqUser: IRequestUser
  ) {
    FandomService._globalService.checkValidObjectId(
      postId,
      `Post with id ${postId} not found`
    );

    const post = await this.getPostDocById(postId);
    FandomService._globalService.hasPermission(
      post.postedBy,
      reqUser,
      `Only the creator or an admin may delete the post with id ${post}`
    );

    await post.delete();
  }

  public async updatePostById(
    postId: mongoose.Types._ObjectId | string,
    updatedPost: IUpdatePostDTO,
    reqUser: IRequestUser
  ) {
    FandomService._globalService.checkValidObjectId(
      postId,
      `Post with id ${postId} not found`
    );

    const post = await this.getPostDocById(postId);

    FandomService._globalService.hasPermission(
      post.postedBy,
      reqUser,
      `Only the creator or an admin may update the post with id ${post}`
    );

    post.content = updatedPost.content || post.content;
    post.title = updatedPost.title || post.title;

    if (updatedPost.fandom) {
      const fandom = await this.getFandomById(updatedPost.fandom);
      post.fandom = fandom._id;
    }

    const updatedPostDoc = await post.save();
    return updatedPostDoc;
  }

  public async getCommentsForPost(postId: string) {
    FandomService._globalService.checkValidObjectId(
      postId,
      `Post with id ${postId} not found`
    );

    const comments = await this.getCommentsMatchingFilters({
      fandomPost: mongoose.Types.ObjectId(postId)
    });
    return comments;
  }

  public async createComment(
    newComment: INewFandomCommentInputDTO,
    createdByUser: IRequestUser
  ) {
    FandomService._globalService.checkValidObjectId(
      newComment.fandomPost,
      `Post with id ${newComment.fandomPost} does not exist`
    );

    await this.getPostDocById(newComment.fandomPost);

    const newCommentDoc = await FandomComment.create(newComment);
    const comment: IFandomCommentDTOWithLikes = {
      ...newCommentDoc.toObject(),
      dislikes: [],
      likes: [],
      postedBy: {
        username: createdByUser.username,
        profileURL: createdByUser.profileURL
      }
    };

    return comment;
  }

  public async deleteCommentById(
    commentId: mongoose.Types._ObjectId | string,
    reqUser: IRequestUser
  ) {
    FandomService._globalService.checkValidObjectId(
      commentId,
      `Comment with id ${commentId} not found`
    );

    const comment = await this.getCommentDocById(commentId);

    FandomService._globalService.hasPermission(
      comment.postedBy,
      reqUser,
      `Only the creator or an admin may delete the comment with id ${commentId}`
    );

    await comment.delete();
  }

  public async updateCommentById(
    commentId: mongoose.Types._ObjectId | string,
    updatedComment: IUpdateCommentDTO,
    reqUser: IRequestUser
  ) {
    FandomService._globalService.checkValidObjectId(
      commentId,
      `Comment with id ${commentId} not found`
    );

    const comment = await this.getCommentDocById(commentId);

    FandomService._globalService.hasPermission(
      comment.postedBy,
      reqUser,
      `Only the creator or an admin may update the comment with id ${commentId}`
    );

    comment.title = updatedComment.title || comment.title;
    comment.content = updatedComment.content || comment.content;

    if (updatedComment.fandomPost) {
      const post = await this.getPostDocById(updatedComment.fandomPost);
      comment.fandomPost = post._id;
    }

    const updatedCommentDoc = await comment.save();
    return updatedCommentDoc;
  }

  public async updateLikes(newLike: INewUserLikeInputDTO) {
    const query: { [key: string]: any } = {
      user: newLike.user
    };

    if (newLike.fandomPost) {
      query.fandomPost = newLike.fandomPost;
      await this.getPostDocById(newLike.fandomPost);
    }

    if (newLike.fandomComment) {
      query.fandomComment = newLike.fandomComment;
      await this.getCommentDocById(newLike.fandomComment);
    }

    const previousLike = await UserLike.findOne(query);
    if (previousLike) {
      await previousLike.delete();
      if (previousLike.isLike !== newLike.isLike) {
        await UserLike.create(newLike);
      }
    } else {
      await UserLike.create(newLike);
    }
  }
}
