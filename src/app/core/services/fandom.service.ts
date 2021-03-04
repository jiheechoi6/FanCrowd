import { Injectable } from '@angular/core';
import Fandom from 'src/app/shared/models/fandom';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FandomService {
  category = ["Movies", "Books", "Shows", "Anime", "Games", "Sports", "Technology"];
  fandoms: Fandom[] = [
    {
        id: 1,
        category: this.category[0],
        name: "Avengers",
        backgroundUrl: ''
    },
    {
        id: 2,
        category: this.category[0],
        name: "Harry Potter",
        backgroundUrl: 'https://wallpapercave.com/wp/wp2763337.jpg'
    },
    {
        id: 3,
        category: this.category[0],
        name: "Avengers: Age of Ultron",
        backgroundUrl: ''
    },
    {
        id: 4,
        category: this.category[0],
        name: "Maze Runner",
        backgroundUrl: ''
    },
    {
        id: 5,
        category: this.category[0],
        name: "Journey to the Mysterious Island",
        backgroundUrl: ''
    },
    {
        id: 6,
        category: this.category[0],
        name: "All",
        backgroundUrl: ''
    },
    {
        id: 7,
        category: this.category[1],
        name: "Divergent",
        backgroundUrl: ''
    },
    {
        id: 8,
        category: this.category[1],
        name: "The Chronicles of Narnia",
        backgroundUrl: ''
    },
    {
        id: 9,
        category: this.category[1],
        name: "Harry Potter",
        backgroundUrl: ''
    },
    {
        id: 10,
        category: this.category[1],
        name: "The Big Bang Theory",
        backgroundUrl: ''
    },
    {
        id: 11,
        category: this.category[1],
        name: "All",
        backgroundUrl: ''
    },
    {
        id: 12,
        category: this.category[2],
        name: "Game of Thrones",
        backgroundUrl: ''
    },
    {
        id: 13,
        category: this.category[2],
        name: "The Queen's Gambit",
        backgroundUrl: ''
    },
    {
        id: 14,
        category: this.category[2],
        name: "Harry Potter",
        backgroundUrl: ''
    },
    {
        id: 15,
        category: this.category[2],
        name: "All",
        backgroundUrl: ''
    },
    {
        id: 16,
        category: this.category[3],
        name: "Yu-Gi-Oh!",
        backgroundUrl: ''
    },
    {
        id: 17,
        category: this.category[3],
        name: "One Punch Man",
        backgroundUrl: ''
    },
    {
        id: 18,
        category: this.category[3],
        name: "Beyblade",
        backgroundUrl: ''
    },
    {
        id: 19,
        category: this.category[3],
        name: "All",
        backgroundUrl: ''
    },
    {
        id: 20,
        category: this.category[4],
        name: "Call of Duty",
        backgroundUrl: ''
    },
    {
        id: 21,
        category: this.category[4],
        name: "God of War",
        backgroundUrl: ''
    },
    {
        id: 22,
        category: this.category[4],
        name: "Assassin's Creed",
        backgroundUrl: ''
    },
    {
        id: 23,
        category: this.category[4],
        name: "NBA 2020",
        backgroundUrl: ''
    },
    {
        id: 24,
        category: this.category[4],
        name: "All",
        backgroundUrl: ''
    },
    {
        id: 25,
        category: this.category[5],
        name: "Basketball",
        backgroundUrl: ''
    },
    {
        id: 26,
        category: this.category[5],
        name: "Soccer",
        backgroundUrl: ''
    },
    {
        id: 27,
        category: this.category[5],
        name: "Golf",
        backgroundUrl: ''
    },
    {
        id: 28,
        category: this.category[5],
        name: "Cricket",
        backgroundUrl: ''
    },
    {
        id: 29,
        category: this.category[5],
        name: "All",
        backgroundUrl: ''
    },
    {
        id: 30,
        category: this.category[6],
        name: "All",
        backgroundUrl: ''
    }
  ];

  constructor(private http: HttpClient) {}

  sortFunction(a: Fandom, b: Fandom) : number{  
    var dateA = new Date(a.name).getTime();
    var dateB = new Date(b.name).getTime();
    return dateA > dateB ? 1 : -1;  
  }

  getCategories(): string[] {
    // Get categories from server, code below requires server call

    return this.category.sort();
  }

  getFandoms(): Fandom[] {
    // Get fandoms from server, code below requires server call

    return this.fandoms.sort((a,b) => this.sortFunction(a,b));
  }

  getFandomsByCategories(category: string | undefined): string[] {
    // Get fandoms from server, code below requires server call
    let fandomsByCategory: string[] = [];
    this.fandoms.forEach((fandom: Fandom) => {
        if (category !== undefined && fandom.category === category){
            fandomsByCategory.push((fandom.name));
        }
    });

    return fandomsByCategory.sort();
  }

  createFandom(fandom: Fandom): void {
    // Add fandom to server, code below requires server call

    this.fandoms.push(fandom);
  }

  deleteFandom(index: number): boolean {
    // Delete fandom from server, code below requires server call
    
    if (index >= 0) {
      this.fandoms.splice(index, 1);
      return true;
    }

    return false;
  }
}
