import {
  IAttendEvent,
  IFandomMember,
  IUser,
  IUserLike
} from "../interfaces/IUser";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import UserModel from "../models/user";
import FandomModel from "../models/fandom";
import FandomCategoryModel from "../models/fandom-category";
import FandomPostModel from "../models/fandom-post";
import EventModel from "../models/event";
import EventReviewModel from "../models/event-review";
import AttendModel from "../models/attend";
import FandomMemberModel from "../models/fandom-member";
import FandomCommentModel from "../models/fandom-comment";
import UserLikeModel from "../models/user-like";

import {
  IFandom,
  IFandomCategory,
  IFandomComment,
  IFandomPost
} from "../interfaces/IFandom";
import { IEvent, IEventReview } from "../interfaces/IEvent";

const users: IUser[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    bio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    city: "Toronto",
    country: "Canada",
    email: "chandra.panta345@hotmail.com",
    fullName: "Chandra Panta Chhetri",
    password: "user1",
    profileURL:
      "https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg",
    role: "user",
    username: "user1",
    isBanned: false
  },
  {
    _id: new mongoose.Types.ObjectId(),
    bio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    city: "Toronto",
    country: "Canada",
    email: "raj@gmail.com",
    fullName: "Raj Patel",
    password: "user2",
    profileURL:
      "https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg",
    role: "user",
    username: "user2",
    isBanned: false
  },
  {
    _id: new mongoose.Types.ObjectId(),
    bio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    city: "Toronto",
    country: "Canada",
    email: "jihee@gmail.com",
    fullName: "Jihee",
    password: "admin",
    profileURL:
      "https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg",
    role: "admin",
    username: "admin",
    isBanned: false
  }
];

const fandomCategories: IFandomCategory[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    backgroundURL:
      "https://i.pinimg.com/originals/51/c2/2e/51c22e9f59f506d283c1b07fa92e9a93.jpg",
    name: "Movies",
    createdBy: users[2]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    backgroundURL:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80",
    name: "Books",
    createdBy: users[2]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    backgroundURL:
      "https://www.canvasandwall.co.za/wp-content/uploads/2020/04/TV-Background-3D-wallpaper.jpg",
    name: "Shows",
    createdBy: users[2]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    backgroundURL: "https://cdn.wallpapersafari.com/28/72/eMnp5F.jpg",
    name: "Anime",
    createdBy: users[2]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    backgroundURL: "https://wallpaperaccess.com/full/242347.jpg",
    name: "Games",
    createdBy: users[2]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    backgroundURL: "https://wallpaperaccess.com/full/552032.jpg",
    name: "Sports",
    createdBy: users[2]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    backgroundURL: "https://wallpaperaccess.com/full/249743.png",
    name: "Technology",
    createdBy: users[2]._id
  }
];

const fandoms: IFandom[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[0]._id,
    name: "Avengers",
    backgroundURL: "https://wallpaperaccess.com/full/311206.jpg",
    createdBy: users[0]._id,
    createdAt: new Date(2020, 1, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[0]._id,
    name: "Harry Potter",
    backgroundURL: "https://wallpapercave.com/wp/wp2763337.jpg",
    createdBy: users[1]._id,
    createdAt: new Date(2020, 5, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[0]._id,
    name: "Avengers Age of Ultron",
    backgroundURL: "https://wallpaperaccess.com/full/1117133.jpg",
    createdBy: users[0]._id,
    createdAt: new Date(2020, 1, 1)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[0]._id,
    name: "Maze Runner The Death Cure",
    backgroundURL: "https://images3.alphacoders.com/913/thumb-1920-913996.jpg",
    createdBy: users[1]._id,
    createdAt: new Date(2010, 1, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[0]._id,
    name: "Journey to the Mysterious Island",
    backgroundURL: "https://images2.alphacoders.com/805/805700.jpg",
    createdBy: users[0]._id,
    createdAt: new Date(2019, 1, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[1]._id,
    name: "Divergent",
    backgroundURL: "https://wallpapercave.com/wp/wp1826730.jpg",
    createdBy: users[1]._id,
    createdAt: new Date(2012, 1, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[1]._id,
    name: "The Chronicles of Narnia",
    backgroundURL: "https://wallpaperaccess.com/full/1715646.jpg",
    createdBy: users[0]._id,
    createdAt: new Date(2020, 8, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[1]._id,
    name: "Harry Potter",
    backgroundURL:
      "https://i.pinimg.com/originals/9e/79/90/9e799033d6cc8983b902cb9a7c41b74c.jpg",
    createdBy: users[1]._id,
    createdAt: new Date(2020, 9, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[1]._id,
    name: "Percy Jackson",
    backgroundURL: "https://wallpapercave.com/wp/wp2961879.jpg",
    createdBy: users[0]._id,
    createdAt: new Date(2019, 1, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[2]._id,
    name: "Game of Thrones",
    backgroundURL: "https://cdn.wallpapersafari.com/26/33/Fbx3ci.jpg",
    createdBy: users[1]._id,
    createdAt: new Date(2015, 1, 10)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[2]._id,
    name: "The Queen's Gambit",
    backgroundURL: "https://wallpaperaccess.com/full/4722410.jpg",
    createdBy: users[0]._id,
    createdAt: new Date(2021, 2, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[2]._id,
    name: "The Big Bang Theory",
    backgroundURL: "https://wallpapercave.com/wp/Htvtugs.jpg",
    createdBy: users[0]._id,
    createdAt: new Date(2021, 3, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[3]._id,
    name: "Yu Gi Oh",
    backgroundURL:
      "https://i.pinimg.com/originals/d1/7a/d8/d17ad80144ef56adbf58a17a686ea619.jpg",
    createdBy: users[1]._id,
    createdAt: new Date(2020, 9, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[3]._id,
    name: "One Punch Man",
    backgroundURL: "https://cdn.wallpapersafari.com/51/10/9A6JeS.jpg",
    createdBy: users[0]._id,
    createdAt: new Date(2020, 1, 15)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[3]._id,
    name: "Beyblade",
    backgroundURL:
      "https://i.pinimg.com/originals/2c/ae/46/2cae460058ec18fa42d5a3c07589b781.jpg",
    createdBy: users[1]._id,
    createdAt: new Date(2020, 4, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[4]._id,
    name: "Call of Duty",
    backgroundURL:
      "https://i.pinimg.com/originals/c4/88/a5/c488a5045bf7ac2d08b8bd9342cecf92.jpg",
    createdBy: users[0]._id,
    createdAt: new Date(2020, 7, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[4]._id,
    name: "God of War",
    backgroundURL: "https://wallpapercave.com/wp/T4xxWSN.jpg",
    createdBy: users[1]._id,
    createdAt: new Date(2020, 9, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[4]._id,
    name: "Assassin's Creed",
    backgroundURL:
      "https://i.pinimg.com/originals/80/d9/89/80d98924b54c6ff8b8438cc30ea1e694.jpg",
    createdBy: users[0]._id,
    createdAt: new Date(2020, 12, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[4]._id,
    name: "NBA 2020",
    backgroundURL: "https://wallpaperaccess.com/full/103114.jpg",
    createdBy: users[0]._id,
    createdAt: new Date(2020, 5, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[5]._id,
    name: "Basketball",
    backgroundURL:
      "https://i.pinimg.com/originals/dc/eb/80/dceb80db40569f060a1197d7f8c58916.jpg",
    createdBy: users[1]._id,
    createdAt: new Date(2016, 1, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[5]._id,
    name: "Soccer",
    backgroundURL: "https://wallpapercave.com/wp/4dqP3rn.jpg",
    createdBy: users[0]._id,
    createdAt: new Date(2020, 1, 9)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[5]._id,
    name: "Golf",
    backgroundURL: "https://cdn.hipwallpaper.com/i/91/94/rFjELC.jpg",
    createdBy: users[1]._id,
    createdAt: new Date(2020, 9, 7)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[5]._id,
    name: "Cricket",
    backgroundURL:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Y3JpY2tldHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    createdBy: users[0]._id,
    createdAt: new Date(2020, 1, 18)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[6]._id,
    name: "Apple",
    backgroundURL: "https://wallpapercave.com/wp/8duz5Ir.jpg",
    createdBy: users[0]._id,
    createdAt: new Date(2020, 1, 12)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    category: fandomCategories[6]._id,
    name: "OnePlus",
    backgroundURL:
      "https://m-cdn.phonearena.com/images/hub/54-two_500/OnePlus-8T-release-date-price-features-and-news.jpg",
    createdBy: users[1]._id,
    createdAt: new Date(2020, 5, 17)
  }
];

const events: IEvent[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[1],
    name: "Comic Con",
    description: `A comic book convention or comic con is an event with a primary focus on comic books and comic book culture, in which comic book fans gather to meet creators, experts, and each other. Commonly, comic conventions are multi-day events hosted at convention centers, hotels, or college campuses.`,
    postedBy: users[0],
    location: "Toronto, Ontario, Canada",
    startDate: new Date(2021, 10, 12),
    endDate: new Date(2021, 10, 14)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[23],
    name: "World Expo",
    description: `Our once-in-a-lifetime celebration – the largest event ever staged in the Arab world – is set to welcome 190 participating countries, and millions of visitors from across the globe. Here they will experience warm Emirati hospitality at its finest, as well as the UAE’s values of inclusion, tolerance and cooperation. Youth are at the heart of our World Expo. That’s why Expo 2020 aspires to create a meaningful legacy that will benefit generations to come, both locally and globally, spanning everything from innovations and architecture to friendships and business opportunities.`,
    postedBy: users[1],
    location: "Dubai, UAE",
    startDate: new Date(2021, 5, 12),
    endDate: new Date(2021, 5, 14)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[0],
    name: "Marvel Studios",
    description: `Marvel Studios, LLC is an American film and television studio that is a subsidiary of Walt Disney Studios, a division of The Walt Disney Company. Marvel Studios is known for the production of the Marvel Cinematic Universe films, based on characters that appear in Marvel Comics publications.`,
    postedBy: users[1],
    location: "San Fransico, California, USA",
    startDate: new Date(2021, 6, 12),
    endDate: new Date(2021, 7, 14)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[16],
    name: "Sony Game Release",
    description: `God of War is an action-adventure game franchise created by David Jaffe at Sony's Santa Monica Studio. It began in 2005 on the PlayStation 2 video game console, and has become a flagship title for the PlayStation brand, consisting of eight games across multiple platforms with a ninth currently in development.`,
    postedBy: users[1],
    location: "Los Angeles, California, USA",
    startDate: new Date(2021, 4, 8),
    endDate: new Date(2021, 4, 11)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[1],
    name: "J.K Rowling Meet & Greet",
    description: `Harry Potter is a series of seven fantasy novels written by British author, J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.`,
    postedBy: users[0],
    location: "Vancouver, British Columbia, Canada",
    startDate: new Date(2021, 9, 12),
    endDate: new Date(2021, 9, 15)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[13],
    name: "Anime-Fest",
    description: `One-Punch Man is a Japanese superhero franchise created by the artist ONE. It tells the story of Saitama, a superhero who can defeat any opponent with a single punch but seeks to find a worthy opponent after growing bored by a lack of challenge due to his overwhelming strength.`,
    postedBy: users[1],
    location: "New York City, New York, USA",
    startDate: new Date(2021, 7, 30),
    endDate: new Date(2021, 8, 1)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[20],
    name: "FIFA World Cup Party",
    description: `The FIFA World Cup, often simply called the World Cup, is an international association football competition contested by the senior men's national teams of the members of the Fédération Internationale de Football Association, the sport's global governing body.`,
    postedBy: users[1],
    location: "Westminister, London, United Kingdom",
    startDate: new Date(2021, 11, 3),
    endDate: new Date(2021, 11, 8)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[9],
    name: "New HBO Show Press Release",
    description: `Home Box Office is an American pay television network owned by WarnerMedia Studios & Networks and the flagship property of parent subsidiary Home Box Office, Inc.`,
    postedBy: users[0],
    location: "Seattle, Washington, USA",
    startDate: new Date(2021, 12, 10),
    endDate: new Date(2021, 12, 13)
  }
];

const eventReviews: IEventReview[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Congue nisi vitae suscipit tellus mauris a diam maecenas.",
    event: events[0],
    postedBy: users[0],
    rating: 4,
    title: "Great Event",
    createdAt: new Date(2021, 1, 15),
    updatedAt: new Date(2021, 1, 15)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Congue nisi vitae suscipit tellus mauris a diam maecenas.",
    event: events[0],
    postedBy: users[1],
    rating: 5,
    title: "Amazing, Lot's of fun",
    createdAt: new Date(2021, 1, 15),
    updatedAt: new Date(2021, 1, 15)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Congue nisi vitae suscipit tellus mauris a diam maecenas.",
    event: events[1],
    postedBy: users[0],
    rating: 5,
    title: "Cool tech!",
    createdAt: new Date(2021, 1, 15),
    updatedAt: new Date(2021, 1, 15)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Congue nisi vitae suscipit tellus mauris a diam maecenas.",
    event: events[1],
    postedBy: users[1],
    rating: 3,
    title: "Nice things to see",
    createdAt: new Date(2021, 1, 15),
    updatedAt: new Date(2021, 1, 15)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Congue nisi vitae suscipit tellus mauris a diam maecenas.",
    event: events[3],
    postedBy: users[1],
    rating: 5,
    title: "Great Release Party!!!",
    createdAt: new Date(2021, 1, 15),
    updatedAt: new Date(2021, 1, 15)
  }
];

const fandomPosts: IFandomPost[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    fandom: fandoms[13]._id,
    postedBy: users[0]._id,
    title: "Lorem ipsum dolor sit amet",
    createdAt: new Date(2021, 2, 17)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    fandom: fandoms[13]._id,
    postedBy: users[1]._id,
    title: "Lorem ipsum dolor",
    createdAt: new Date(2021, 1, 1)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    fandom: fandoms[2]._id,
    postedBy: users[1]._id,
    title: "Lorem ipsum dolor sit amet",
    createdAt: new Date(2021, 1, 19)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    fandom: fandoms[2]._id,
    postedBy: users[0]._id,
    title: "Lorem ipsum dolor sit amet",
    createdAt: new Date(2021, 1, 5)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    fandom: fandoms[5]._id,
    postedBy: users[0]._id,
    title: "Lorem ipsum dolor sit amet",
    createdAt: new Date(2021, 2, 14)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    fandom: fandoms[6]._id,
    postedBy: users[0]._id,
    title: "Lorem ipsum dolor sit amet",
    createdAt: new Date(2021, 2, 12)
  }
];

const fandomComments: IFandomComment[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    postedBy: users[0]._id,
    title: "Comment 1",
    fandomPost: fandomPosts[0]._id,
    createdAt: new Date(2021, 2, 8)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    postedBy: users[1]._id,
    title: "Comment 2",
    fandomPost: fandomPosts[0]._id,
    createdAt: new Date(2021, 2, 8)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    postedBy: users[1]._id,
    title: "Comment 3",
    fandomPost: fandomPosts[1]._id,
    createdAt: new Date(2021, 2, 8)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    postedBy: users[0]._id,
    title: "Comment 4",
    fandomPost: fandomPosts[1]._id,
    createdAt: new Date(2021, 2, 8)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    postedBy: users[0]._id,
    title: "Comment 5",
    fandomPost: fandomPosts[2]._id,
    createdAt: new Date(2021, 2, 8)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    postedBy: users[1]._id,
    title: "Comment 6",
    fandomPost: fandomPosts[3]._id,
    createdAt: new Date(2021, 2, 8)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    postedBy: users[1]._id,
    title: "Comment 7",
    fandomPost: fandomPosts[4]._id,
    createdAt: new Date(2021, 2, 8)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    postedBy: users[0]._id,
    title: "Comment 8",
    fandomPost: fandomPosts[5]._id,
    createdAt: new Date(2021, 2, 8)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    postedBy: users[0]._id,
    title: "Comment 9",
    fandomPost: fandomPosts[5]._id,
    createdAt: new Date(2021, 2, 8)
  }
];

const attends: IAttendEvent[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    event: events[1]._id,
    user: users[1]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    event: events[1]._id,
    user: users[0]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    event: events[0]._id,
    user: users[0]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    event: events[4]._id,
    user: users[0]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    event: events[6]._id,
    user: users[1]._id
  }
];

const fandomMembers: IFandomMember[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[0]._id,
    user: users[0]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[2]._id,
    user: users[0]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[5]._id,
    user: users[0]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[4]._id,
    user: users[0]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[1]._id,
    user: users[1]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[2]._id,
    user: users[1]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    fandom: fandoms[3]._id,
    user: users[1]._id
  }
];

const userLikes: IUserLike[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    isLike: true,
    user: users[0]._id,
    fandomPost: fandomPosts[0]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    isLike: false,
    user: users[0]._id,
    fandomPost: fandomPosts[1]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    isLike: true,
    user: users[1]._id,
    fandomPost: fandomPosts[0]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    isLike: false,
    user: users[1]._id,
    fandomPost: fandomPosts[1]
  }
];

const dropDatabase = async () => {
  try {
    await UserModel.deleteMany({});
    await FandomModel.deleteMany({});
    await AttendModel.deleteMany({});
    await EventModel.deleteMany({});
    await EventReviewModel.deleteMany({});
    await FandomCategoryModel.deleteMany({});
    await FandomMemberModel.deleteMany({});
    await FandomCommentModel.deleteMany({});
    await UserLikeModel.deleteMany({});
    await FandomPostModel.deleteMany({});
  } catch (err) {
    console.log(err.message);
  }
};

export default async () => {
  console.log("Starting to seed db");
  await dropDatabase();

  for (let i = 0; i < users.length; i++) {
    let salt = await bcrypt.genSalt(10);
    users[i].password = await bcrypt.hash(users[i].password, salt);
    await UserModel.create(users[i]);
  }

  for (let i = 0; i < fandomCategories.length; i++) {
    let fandomCategory = {
      _id: fandomCategories[i]._id,
      backgroundURL: fandomCategories[i].backgroundURL,
      createdBy: fandomCategories[i].createdBy._id,
      name: fandomCategories[i].name
    };
    await FandomCategoryModel.create(fandomCategory);
  }

  for (let i = 0; i < fandoms.length; i++) {
    let fandom = {
      name: fandoms[i].name,
      backgroundURL: fandoms[i].backgroundURL,
      _id: fandoms[i]._id,
      category: fandoms[i].category,
      createdBy: fandoms[i].createdBy._id
    };
    await FandomModel.create(fandom);
  }

  for (let i = 0; i < fandomMembers.length; i++) {
    let fandomMember = {
      _id: fandomMembers[i]._id,
      user: fandomMembers[i].user._id,
      fandom: fandomMembers[i].fandom._id
    };
    await FandomMemberModel.create(fandomMember);
  }

  for (let i = 0; i < fandomPosts.length; i++) {
    let fandomPost = {
      title: fandomPosts[i].title,
      _id: fandomPosts[i]._id,
      content: fandomPosts[i].content,
      postedBy: fandomPosts[i].postedBy._id,
      fandom: fandomPosts[i].fandom._id
    };
    await FandomPostModel.create(fandomPost);
  }

  for (let i = 0; i < fandomComments.length; i++) {
    let fandomComment = {
      _id: fandomComments[i]._id,
      title: fandomComments[i].title,
      content: fandomComments[i].content,
      postedBy: fandomComments[i].postedBy._id,
      fandomPost: fandomComments[i].fandomPost._id
    };
    await FandomCommentModel.create(fandomComment);
  }

  for (let i = 0; i < events.length; i++) {
    let event = {
      _id: events[i]._id,
      name: events[i].name,
      description: events[i].description,
      location: events[i].location,
      postedBy: events[i].postedBy._id,
      startDate: events[i].startDate,
      endDate: events[i].endDate,
      fandom: events[i].fandom._id
    };
    await EventModel.create(event);
  }

  for (let i = 0; i < eventReviews.length; i++) {
    let eventReview = {
      _id: eventReviews[i]._id,
      title: eventReviews[i].title,
      content: eventReviews[i].content,
      rating: eventReviews[i].rating,
      postedBy: eventReviews[i].postedBy._id,
      event: eventReviews[i].event._id,
      createdAt: eventReviews[i].createdAt
    };
    await EventReviewModel.create(eventReview);
  }

  for (let i = 0; i < attends.length; i++) {
    let attend = {
      _id: attends[i]._id,
      event: attends[i].event._id,
      user: attends[i].user._id
    };
    await AttendModel.create(attend);
  }

  for (let i = 0; i < userLikes.length; i++) {
    let userLike = {
      _id: userLikes[i]._id,
      user: userLikes[i].user._id,
      fandomPost: userLikes[i].fandomPost?._id,
      isLike: userLikes[i].isLike,
      fandomComment: userLikes[i].fandomComment?._id
    };
    await UserLikeModel.create(userLike);
  }

  console.log("Done seeding db");
};
