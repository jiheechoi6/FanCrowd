import { Injectable } from '@angular/core';
import User from 'src/app/shared/models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<User | null | undefined>(null);
  usernameToPassword = new Map([
    ['user1', 'user1'],
    ['user2', 'user2'],
    ['admin', 'admin'],
  ]);
  users: User[] = [
    {
      username: 'user1',
      fullName: 'Chandra Panta Chhetri',
      city: 'Toronto',
      country: 'Canada',
      email: 'chandra@gmail.com',
      profileUrl: 'https://dummyimage.com/250',
      role: 'user',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      attendingEvents: [
        { name: 'Get Together', date: new Date(), totalAttending: 10, id: 1 },
        { name: 'Fandom Friday', date: new Date(), totalAttending: 10, id: 2 },
        {
          name: 'Harry Potter Convention',
          date: new Date(),
          totalAttending: 10,
          id: 3,
        },
        {
          name: 'Comic Convention',
          date: new Date(),
          totalAttending: 10,
          id: 4,
        },
      ],
      fandoms: [
        {
          name: 'Harry Potter',
          id: 1,
          activityLevel: 5,
        },
        {
          name: 'Spiderman',
          id: 2,
          activityLevel: 2,
        },
        {
          name: 'Superman',
          id: 3,
          activityLevel: 1,
        },
        {
          name: 'Batman',
          id: 4,
          activityLevel: 10,
        },
      ],
    },
    {
      username: 'user2',
      fullName: 'Raj Patel',
      city: 'Toronto',
      country: 'Canada',
      email: 'raj@gmail.com',
      profileUrl: 'https://dummyimage.com/250',
      role: 'user',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      attendingEvents: [
        {
          name: 'Harry Potter Convention',
          date: new Date(),
          totalAttending: 10,
          id: 3,
        },
      ],
      fandoms: [
        {
          name: 'Harry Potter',
          id: 1,
          activityLevel: 2,
        },
        {
          name: 'Superman',
          id: 3,
          activityLevel: 6,
        },
        {
          name: 'Batman',
          id: 4,
          activityLevel: 9,
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

  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string) {
    //API request to auth endpoint
    if (
      !this.usernameToPassword.has(username) ||
      this.usernameToPassword.get(username) !== password
    ) {
      this.currentUser.next(null);
      return null;
    }

    const user = this.users.find((user) => user.username === username);
    this.currentUser.next(user);
    return user;
  }

  createNewUser(
    username: string,
    firstname: string,
    lastname: string,
    password: string,
    usertype: string
  ) {}
}
