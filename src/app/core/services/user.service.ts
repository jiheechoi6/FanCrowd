import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import UserDTO from 'src/app/shared/models/user-dto';
import EventDTO from 'src/app/shared/models/event-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    today = new Date();

    users: UserDTO[] = [
    {
      username: 'user1',
      fullName: 'Chandra Panta Chhetri',
      city: 'Toronto',
      country: 'Canada',
      email: 'chandra@gmail.com',
      profileUrl: 'https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg',
      role: 'user',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      attendingEvents: [
        { 
          name: 'Comic Con', 
          date: this.today, 
          totalAttending: 2, 
          id: 1 
        },
        { 
          name: 'World Expo',
          date: new Date(this.today.getTime() + 1),
          totalAttending: 2,
          id: 2,
        },
        {
          name: 'J.K Rowling Meet & Greet',
          date: new Date(this.today.getTime() + 9),
          totalAttending: 3,
          id: 5,
        },
        {
          name: 'FIFA World Cup Party',
          date: new Date(this.today.getTime() + 13),
          totalAttending: 1,
          id: 7,
        },
      ],
      fandoms: [
        {
          // Movies Category
          name: 'Avengers',
          id: 1,
          activityLevel: 5,
        },
        {
          // Movies Category
          name: 'Harry Potter',
          id: 2,
          activityLevel: 2,
        },
        {
          // Books Category
          name: 'Percy Jackson Series',
          id: 10,
          activityLevel: 1,
        },
        {
          // Games Category
          name: 'Call of Duty',
          id: 20,
          activityLevel: 4,
        },
      ],
    },
    {
      username: 'user2',
      fullName: 'Raj Patel',
      city: 'Toronto',
      country: 'Canada',
      email: 'raj@gmail.com',
      profileUrl: 'https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg',
      role: 'user',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      attendingEvents: [
        {
          name: 'World Expo',
          date: new Date(this.today.getTime() + 1),
          totalAttending: 2,
          id: 2,
        },
      ],
      fandoms: [
        {
          // Movies Category
          name: 'Harry Potter',
          id: 2,
          activityLevel: 2,
        },
        {
          // Sports Category
          name: 'Basketball',
          id: 25,
          activityLevel: 3,
        },
        {
          // Shows Category
          name: 'The Big Bang Theory',
          id: 14,
          activityLevel: 5,
        },
      ],
    },
    {
      username: 'admin',
      fullName: 'Jihee',
      city: 'Toronto',
      country: 'Canada',
      email: 'jihee@gmail.com',
      profileUrl: 'https://dummyimage.com/250',
      role: 'admin',
      bio: '',
      attendingEvents: [],
      fandoms: [],
    },
  ];

  constructor(private _http: HttpClient) {}

  getUserByUsername(username: string): UserDTO | null {
    // Get user from server, code below requires server call

    return this.users.find((user) => user.username === username) || null;
  }

  deleteUserByUsername(username: string): void {
    // Delete user from server, code below requires server call
  }

  banUserByUsername(username: string): void {
    // Delete user from server, code below requires server call
  }

  updateUserByUsername(updatedUser: UserDTO, usernameBeforeUpdate: string): void {
    // Update user info on server, code below requires server call
  }

  updateUserEventsByUsername(username: string, event: EventDTO): void {
    // Update user info (Add event to events attending) on server, 
    // code below requires server call

    let currentUser = this.users.find((user) => user.username === username);

    if (currentUser){
      let index = currentUser.attendingEvents.findIndex((userEvent) => userEvent.id === event.id);

      if (index < 0){
        currentUser.attendingEvents.push(event);
      }
    }
  }

  removeEventFromUserEvents(username: string, eventId: number | undefined): void {
    // Update user info (remove event from events attending) on server, 
    // code below requires server call

    let currentUser = this.users.find((user) => user.username === username);
    if (currentUser){
      let eventIndex = currentUser.attendingEvents.findIndex((userEvent) => userEvent.id === eventId);

      if (eventIndex >= 0){
        currentUser.attendingEvents.splice(eventIndex, 1);
      }
    }
  }

  removeEventFromAllUsersEvents(eventId: number | undefined): void {
    // Update user info (remove event from events attending) on server, 
    // code below requires server call

    this.users.forEach((user) => {
      if (user){
        let eventIndex = user.attendingEvents.findIndex((userEvent) => userEvent.id === eventId);
  
        if (eventIndex >= 0){
          user.attendingEvents.splice(eventIndex, 1);
        }
      }
    });
  }
  
  getUsernameNameMap(){
    let usermap:Map<string, string> = new Map();
    this.users.forEach((user)=>{
      usermap.set(user.fullName, user.username);
    });

    return usermap;
  }
}
