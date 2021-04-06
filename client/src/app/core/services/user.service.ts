import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import UserDTO from 'src/app/shared/models/user-dto';
import EventDTO from 'src/app/shared/models/event-dto';
import Event from 'src/app/shared/models/event';
import Fandom from 'src/app/shared/models/fandom';
import FandomDTO from 'src/app/shared/models/fandom-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: UserDTO[] = [
    {
      username: 'user1',
      fullName: 'Chandra Panta Chhetri',
      city: 'Toronto',
      country: 'Canada',
      email: 'chandra@gmail.com',
      profileUrl:
        'https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg',
      role: 'user',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      attendingEvents: [
        {
          name: 'Comic Con',
          date: new Date(2021, 10, 12),
          totalAttending: 2,
          id: '1',
        },
        {
          name: 'World Expo',
          date: new Date(2021, 5, 12),
          totalAttending: 2,
          id: '2',
        },
        {
          name: 'J.K Rowling Meet & Greet',
          date: new Date(2021, 9, 12),
          totalAttending: 3,
          id: '5',
        },
        {
          name: 'FIFA World Cup Party',
          date: new Date(2021, 11, 3),
          totalAttending: 1,
          id: '7',
        },
      ],
      fandoms: [
        {
          name: 'Avengers',
          _id: '14',
          activityLevel: 5,
          category: 'movies',
        },
        {
          name: 'Harry Potter',
          _id: '14',
          activityLevel: 2,
          category: 'movies',
        },
        {
          // Books Category
          name: 'Percy Jackson',
          _id: '14',
          activityLevel: 1,
          category: 'books',
        },
        {
          // Games Category
          name: 'Call of Duty',
          _id: '14',
          activityLevel: 4,
          category: 'games',
        },
      ],
    },
    {
      username: 'user2',
      fullName: 'Raj Patel',
      city: 'Toronto',
      country: 'Canada',
      email: 'raj@gmail.com',
      profileUrl:
        'https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg',
      role: 'user',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      attendingEvents: [
        {
          name: 'World Expo',
          date: new Date(2021, 5, 12),
          totalAttending: 2,
          id: '2',
        },
      ],
      fandoms: [
        {
          // Movies Category
          name: 'Harry Potter',
          _id: '14',
          activityLevel: 2,
          category: 'movies',
        },
        {
          // Sports Category
          name: 'Basketball',
          _id: '14',
          activityLevel: 3,
          category: 'sports',
        },
        {
          // Shows Category
          name: 'The Big Bang Theory',
          _id: '14',
          activityLevel: 5,
          category: 'shows',
        },
      ],
    },
    {
      username: 'admin',
      fullName: 'Jihee',
      city: 'Toronto',
      country: 'Canada',
      email: 'jihee@gmail.com',
      profileUrl: 'https://dummyimage.com/250.jpg',
      role: 'admin',
      bio: '',
      attendingEvents: [],
      fandoms: [],
    },
  ];

  constructor(private _http: HttpClient) {}

  getUserByUsername(username: string) {
    // Get user from server, code below requires server call

    // return this.users.find((user) => user.username === username) || null;
    return this._http.get<UserDTO>(`/api/users/${username}`);
  }

  getUserEventsByUsername(username: string) {
    // Get User's events from server, code below requires server call
    // return (
    //   this.users.find((user) => user.username === username)?.attendingEvents ||
    //   []
    // );
    return this._http.get<EventDTO[]>(`/api/users/${username}/events`);
  }

  deleteUserByUsername(username: string) {
    // Delete user from server, code below requires server call
  }

  banUserByUsername(username: string) {
    // Delete user from server, code below requires server call
  }

  updateUserByUsername(updatedUser: UserDTO, usernameBeforeUpdate: string) {
    // Update user info on server, code below requires server call
  }

  updateUserEventsByUsername(username: string, event: EventDTO) {
    // Update user info (Add event to events attending) on server,
    // code below requires server call

    let currentUser = this.users.find((user) => user.username === username);

    if (currentUser) {
      let index = currentUser.attendingEvents.findIndex(
        (userEvent) => userEvent.id === event.id
      );

      if (index < 0) {
        currentUser.attendingEvents.push(event);
      }
    }
  }

  removeEventFromUserEvents(username: string, eventId: string | undefined) {
    // Update user info (remove event from events attending) on server,
    // code below requires server call

    let currentUser = this.users.find((user) => user.username === username);
    if (currentUser) {
      let eventIndex = currentUser.attendingEvents.findIndex(
        (userEvent) => userEvent.id === eventId
      );

      if (eventIndex >= 0) {
        currentUser.attendingEvents.splice(eventIndex, 1);
      }
    }
  }

  removeEventFromAllUsersEvents(eventId: string | undefined) {
    // Update user info (remove event from events attending) on server,
    // code below requires server call

    this.users.forEach((user) => {
      if (user) {
        let eventIndex = user.attendingEvents.findIndex(
          (userEvent) => userEvent.id === eventId
        );

        if (eventIndex >= 0) {
          user.attendingEvents.splice(eventIndex, 1);
        }
      }
    });
  }

  getUsernameNameMap() {
    let usermap: Map<string, string> = new Map();
    this.users.forEach((user) => {
      usermap.set(user.fullName, user.username);
    });

    return usermap;
  }

  getUserProfilePhotos() {
    let photos: Map<string, string> = new Map<string, string>();
    this.users.forEach((user) => {
      photos.set(user.username, user.profileUrl);
    });
    return photos;
  }

  addFandomToUser(username: string, fandom: Fandom | null) {
    //Add a fandom with id fandomId to Users fandoms, code below requires server call

    if (!fandom) return;

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username) {
        this.users[i].fandoms.push(this.convertFandomToFandomDTO(fandom));
      }
    }
  }

  convertFandomToFandomDTO(fandom: Fandom) {
    const fandomDTO: FandomDTO = {
      activityLevel: 0,
      category: fandom.category,
      _id: fandom._id,
      name: fandom.name,
    };

    return fandomDTO;
  }

  removeFandomFromUser(username: string, fandomId: number | undefined) {
    //Remove a fandom with id fandomId from Users fandoms, code below requires server call
    // for (let i = 0; i < this.users.length; i++) {
    //   if (this.users[i].username === username) {
    //     for (let k = 0; k < this.users[i].fandoms.length; k++) {
    //       this.users[i].fandoms = this.users[i].fandoms.filter(
    //         (fandom) => fandom.id !== fandomId
    //       );
    //     }
    //   }
    // }
  }

  hasUserJoinedFandom(username: string, fandomName: string) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username) {
        for (let k = 0; k < this.users[i].fandoms.length; k++) {
          if (
            this.users[i].fandoms[k].name.toLowerCase().split(' ').join('-') ===
            fandomName
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
