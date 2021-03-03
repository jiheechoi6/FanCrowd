import { Injectable } from '@angular/core';
import UserDTO from 'src/app/shared/models/user-dto';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  constructor(private _http: HttpClient) {}

  getUserByUsername(username: string) {
    // Get user from server, code below requires server call

    return this.users.find((user) => user.username === username) || null;
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
}
