import { Injectable } from '@angular/core';
import UserDTO from 'src/app/shared/models/user-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import NewUser from 'src/app/shared/models/new-user';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<UserDTO | null>(null);
  usernameToPassword = new Map([
    ['user1', 'user1'],
    ['user2', 'user2'],
    ['admin', 'admin'],
  ]);
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

  constructor(private _http: HttpClient, private _emailService: EmailService) {}

  loginUser(username: string, password: string) {
    //API request to auth endpoint
    if (
      !this.usernameToPassword.has(username) ||
      this.usernameToPassword.get(username) !== password
    ) {
      this.currentUser.next(null);
      return null;
    }
    let loggedInUser = null;
    for (let user of this.users) {
      if (user.username === username) {
        loggedInUser = user;
      }
    }
    this.currentUser.next(loggedInUser);
    return loggedInUser;
  }

  createNewUser(newUser: NewUser) {
    //API request to users endpoint to create new user
    this.usernameToPassword.set(newUser.username, newUser.password);
    const newUserDTO = {
      ...newUser,
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      city: 'Toronto',
      country: 'Canada',
      role: 'user',
      fandoms: [],
      attendingEvents: [],
      profileUrl: 'https://dummyimage.com/250',
    };
    this.users.push(newUserDTO);
    this.currentUser.next(newUserDTO);
    return newUserDTO;
  }

  logOut() {
    this.currentUser.next(null);
  }

  autoLogin() {}

  resetPassword(
    emailVerficationCodeSentTo: string,
    newPassword: string,
    verficationCode: number
  ) {
    //API request to reset password endpoint
    //Only change password for user with email emailVerficationCodeSentTo and matching verficationCode
    //Send password was recently changed email, once successfully changed
    this._emailService.sendPasswordChangedEmail(emailVerficationCodeSentTo);
  }

  getCurrentLoggedInUserEvents() {
    return [
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
    ];
  }
}
