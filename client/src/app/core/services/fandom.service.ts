import { Injectable } from '@angular/core';
import Fandom from 'src/app/shared/models/fandom';
import { HttpClient, HttpParams } from '@angular/common/http';
import Category from 'src/app/shared/models/category';
import { FandomPost } from 'src/app/shared/models/fandom-post';
import FandomPostComment from 'src/app/shared/models/fandom-post-comment';

@Injectable({
  providedIn: 'root',
})
export class FandomService {
  category: Category[] = [
    {
      _id: 1,
      name: 'Movies',
      backgroundURL:
        'https://i.pinimg.com/originals/51/c2/2e/51c22e9f59f506d283c1b07fa92e9a93.jpg',
    },
    {
      _id: 2,
      name: 'Books',
      backgroundURL:
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80',
    },
    {
      _id: 3,
      name: 'Shows',
      backgroundURL:
        'https://www.canvasandwall.co.za/wp-content/uploads/2020/04/TV-Background-3D-wallpaper.jpg',
    },
    {
      _id: 4,
      name: 'Anime',
      backgroundURL:
        'https://wallpaper-house.com/data/out/7/wallpaper2you_191367.jpg',
    },
    {
      _id: 5,
      name: 'Games',
      backgroundURL: 'https://wallpaperaccess.com/full/242347.jpg',
    },
    {
      _id: 6,
      name: 'Sports',
      backgroundURL: 'https://wallpaperaccess.com/full/552032.jpg',
    },
    {
      _id: 7,
      name: 'Technology',
      backgroundURL: 'https://wallpaperaccess.com/full/249743.png',
    },
  ];

  fandoms: Fandom[] = [
    {
      _id: 1,
      category: this.category[0].name,
      name: 'Avengers',
      backgroundURL: 'https://wallpaperaccess.com/full/311206.jpg',
      createdAt: new Date(),
    },
    {
      _id: 2,
      category: this.category[0].name,
      name: 'Harry Potter',
      backgroundURL: 'https://wallpapercave.com/wp/wp2763337.jpg',
      createdAt: new Date(),
    },
    {
      _id: 3,
      category: this.category[0].name,
      name: 'Avengers: Age of Ultron',
      backgroundURL: 'https://wallpaperaccess.com/full/1117133.jpg',
      createdAt: new Date(),
    },
    {
      _id: 4,
      category: this.category[0].name,
      name: 'Maze Runner: The Death Cure',
      backgroundURL:
        'https://images3.alphacoders.com/913/thumb-1920-913996.jpg',
      createdAt: new Date(),
    },
    {
      _id: 5,
      category: this.category[0].name,
      name: 'Journey to the Mysterious Island',
      backgroundURL: 'https://images2.alphacoders.com/805/805700.jpg',
      createdAt: new Date(),
    },
    {
      _id: 7,
      category: this.category[1].name,
      name: 'Divergent',
      backgroundURL: 'https://wallpapercave.com/wp/wp1826730.jpg',
      createdAt: new Date(),
    },
    {
      _id: 8,
      category: this.category[1].name,
      name: 'The Chronicles of Narnia',
      backgroundURL: 'https://wallpaperaccess.com/full/1715646.jpg',
      createdAt: new Date(),
    },
    {
      _id: 9,
      category: this.category[1].name,
      name: 'Harry Potter',
      backgroundURL:
        'https://i.pinimg.com/originals/9e/79/90/9e799033d6cc8983b902cb9a7c41b74c.jpg',
      createdAt: new Date(),
    },
    {
      _id: 10,
      category: this.category[1].name,
      name: 'Percy Jackson',
      backgroundURL: 'https://wallpapercave.com/wp/wp2961879.jpg',
      createdAt: new Date(),
    },
    {
      _id: 12,
      category: this.category[2].name,
      name: 'Game of Thrones',
      backgroundURL: 'https://cdn.wallpapersafari.com/26/33/Fbx3ci.jpg',
      createdAt: new Date(),
    },
    {
      _id: 13,
      category: this.category[2].name,
      name: "The Queen's Gambit",
      backgroundURL: 'https://wallpaperaccess.com/full/4722410.jpg',
      createdAt: new Date(),
    },
    {
      _id: 14,
      category: this.category[2].name,
      name: 'The Big Bang Theory',
      backgroundURL: 'https://wallpapercave.com/wp/Htvtugs.jpg',
      createdAt: new Date(),
    },
    {
      _id: 16,
      category: this.category[3].name,
      name: 'Yu-Gi-Oh!',
      backgroundURL:
        'https://i.pinimg.com/originals/d1/7a/d8/d17ad80144ef56adbf58a17a686ea619.jpg',
      createdAt: new Date(),
    },
    {
      _id: 17,
      category: this.category[3].name,
      name: 'One Punch Man',
      backgroundURL: 'https://cdn.wallpapersafari.com/51/10/9A6JeS.jpg',
      createdAt: new Date(),
    },
    {
      _id: 18,
      category: this.category[3].name,
      name: 'Beyblade',
      backgroundURL:
        'https://i.pinimg.com/originals/2c/ae/46/2cae460058ec18fa42d5a3c07589b781.jpg',
      createdAt: new Date(),
    },
    {
      _id: 20,
      category: this.category[4].name,
      name: 'Call of Duty',
      backgroundURL:
        'https://i.pinimg.com/originals/c4/88/a5/c488a5045bf7ac2d08b8bd9342cecf92.jpg',
      createdAt: new Date(),
    },
    {
      _id: 21,
      category: this.category[4].name,
      name: 'God of War',
      backgroundURL: 'https://wallpapercave.com/wp/T4xxWSN.jpg',
      createdAt: new Date(),
    },
    {
      _id: 22,
      category: this.category[4].name,
      name: "Assassin's Creed",
      backgroundURL:
        'https://i.pinimg.com/originals/80/d9/89/80d98924b54c6ff8b8438cc30ea1e694.jpg',
      createdAt: new Date(),
    },
    {
      _id: 23,
      category: this.category[4].name,
      name: 'NBA 2020',
      backgroundURL: 'https://wallpaperaccess.com/full/103114.jpg',
      createdAt: new Date(),
    },
    {
      _id: 25,
      category: this.category[5].name,
      name: 'Basketball',
      backgroundURL:
        'https://i.pinimg.com/originals/dc/eb/80/dceb80db40569f060a1197d7f8c58916.jpg',
      createdAt: new Date(),
    },
    {
      _id: 26,
      category: this.category[5].name,
      name: 'Soccer',
      backgroundURL: 'https://wallpapercave.com/wp/4dqP3rn.jpg',
      createdAt: new Date(),
    },
    {
      _id: 27,
      category: this.category[5].name,
      name: 'Golf',
      backgroundURL: 'https://cdn.hipwallpaper.com/i/91/94/rFjELC.jpg',
      createdAt: new Date(),
    },
    {
      _id: 28,
      category: this.category[5].name,
      name: 'Cricket',
      backgroundURL:
        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Y3JpY2tldHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
      createdAt: new Date(),
    },
    {
      _id: 29,
      category: this.category[6].name,
      name: 'Apple',
      backgroundURL: 'https://wallpapercave.com/wp/8duz5Ir.jpg',
      createdAt: new Date(),
    },
    {
      _id: 30,
      category: this.category[6].name,
      name: 'OnePlus',
      createdAt: new Date(),
      backgroundURL:
        'https://m-cdn.phonearena.com/images/hub/54-two_500/OnePlus-8T-release-date-price-features-and-news.jpg',
    },
  ];

  fandomPosts: FandomPost[] = [
    {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      createdAt: new Date(2021, 2, 17),
      numDislikes: [],
      numLikes: [],
      postedBy: {
        username: 'user1',
        profileURL:
          'https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg',
      },
      title: 'Lorem ipsum dolor sit amet',
      fandom: '17',
      _id: '0',
    },
    {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      createdAt: new Date(2021, 1, 1),
      numDislikes: [],
      numLikes: [],
      postedBy: {
        username: 'user2',
        profileURL:
          'https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg',
      },
      title: 'Lorem ipsum dolor',
      fandom: '17',
      _id: '1',
    },
    {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      createdAt: new Date(2021, 1, 19),
      numDislikes: [],
      numLikes: [],
      postedBy: {
        username: 'user2',
        profileURL:
          'https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg',
      },
      title: 'Lorem ipsum dolor sit amet',
      fandom: '11',
      _id: '2',
    },
    {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      createdAt: new Date(2021, 1, 5),
      numDislikes: [],
      numLikes: [],
      postedBy: {
        username: 'user1',
        profileURL:
          'https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg',
      },
      title: 'Lorem ipsum dolor sit amet',
      fandom: '12',
      _id: '3',
    },
    {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      createdAt: new Date(2021, 2, 14),
      numDislikes: [],
      numLikes: [],
      postedBy: {
        username: 'user1',
        profileURL:
          'https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg',
      },
      title: 'Lorem ipsum dolor sit amet',
      fandom: '14',
      _id: '4',
    },
    {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      createdAt: new Date(2021, 2, 12),
      numDislikes: [],
      numLikes: [],
      postedBy: {
        username: 'user2',
        profileURL:
          'https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg',
      },
      title: 'Lorem ipsum dolor sit amet',
      fandom: '16',
      _id: '5',
    },
  ];

  constructor(private _http: HttpClient) {}

  sortFunction(a: any, b: any): number {
    var dateA = a.name;
    var dateB = b.name;
    return dateA > dateB ? 1 : -1;
  }

  addCategory(category: Category) {
    return this._http.post<Category>(`/api/fandoms/categories`, category);
  }

  getCategories() {
    return this._http.get<Category[]>('/api/fandoms/categories');
  }

  addFandom(fandom: Fandom) {
    return this._http.post<Fandom>(`/api/fandoms`, fandom);
  }

  getFandoms(): Fandom[] {
    // Get fandoms from server, code below requires server call

    return this.fandoms.sort((a, b) => this.sortFunction(a, b));
  }

  getFandomsByCategories(categoryName: string = '') {
    const dashedCategoryName = categoryName.split(' ').join('-');
    return this._http.get<{ fandoms: Fandom[]; category: Category }>(
      `/api/fandoms/categories/${dashedCategoryName}`
    );
  }

  deleteFandom(index: number): boolean {
    // Delete fandom from server, code below requires server call

    if (index >= 0) {
      this.fandoms.splice(index, 1);
      return true;
    }

    return false;
  }

  getPostsForFandom(categoryName: string, fandomName: string) {
    const dashedCategoryName = categoryName.split(' ').join('-');
    const dashedFandomName = fandomName.split(' ').join('-');
    return this._http.get<FandomPost[]>(
      `/api/fandoms/categories/${dashedCategoryName}/${dashedFandomName}/posts`
    );
  }

  updatePostForFandom(postId: number | undefined, updatedPost: FandomPost) {
    //Update post with id postId in db, code below requires server call

    return [];
  }

  deletePostFromFandom(postId: number | undefined) {
    //Remove post with id postId in db, code below requires server call

    return [];
  }

  createPostForFandom(post: FandomPost) {
    //Add post to a fandom, code below requires server call

    return post;
  }

  getFandomByName(categoryName: string, fandomName: string) {
    const dashedCategoryName = categoryName.split(' ').join('-');
    const dashedFandomName = fandomName.split(' ').join('-');
    return this._http.get<Fandom>(
      `/api/fandoms/categories/${dashedCategoryName}/${dashedFandomName}`
    );
  }

  getFandomPostById(postId: string = '') {
    return this._http.get<FandomPost>(`/api/fandoms/posts/${postId}`);
  }

  getCommentsForPost(postId: string = '') {
    return this._http.get<FandomPostComment[]>(
      `/api/fandoms/posts/${postId}/comments`
    );
  }

  addCommentToPost(postId: string, comment: FandomPostComment) {
    const fandomPost = this.getFandomPostById(postId);

    // comment.id = Math.floor(Math.random() * (10000 - 12) + 12);

    return comment;
  }

  editPostComment(
    postId: string | undefined,
    commentId: number | undefined,
    updatedComment: FandomPostComment
  ) {
    if (typeof postId === 'undefined') return null;

    const fandomPost = this.getFandomPostById(postId);

    if (typeof commentId === 'undefined') return fandomPost;

    return fandomPost;
  }

  removeCommentFromPost(postId: string | undefined, commentId: number) {
    if (typeof postId === 'undefined') return null;

    const fandomPost = this.getFandomPostById(postId);

    return fandomPost;
  }
}
