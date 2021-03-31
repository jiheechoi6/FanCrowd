import { Injectable } from '@angular/core';
import UserDTO from 'src/app/shared/models/user-dto';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, fromEventPattern, Observable} from 'rxjs';
import NewUser from 'src/app/shared/models/new-user';
import { EmailService } from './email.service';
import EventDTO from 'src/app/shared/models/event-dto';
import SigninRes from 'src/app/shared/models/signin-res';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
// import { tokenNotExpired } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<UserDTO | null>(null);
  token: string | null = null;
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
          id: 1,
        },
        {
          name: 'World Expo',
          date: new Date(2021, 5, 12),
          totalAttending: 2,
          id: 2,
        },
        {
          name: 'J.K Rowling Meet & Greet',
          date: new Date(2021, 9, 12),
          totalAttending: 3,
          id: 5,
        },
        {
          name: 'FIFA World Cup Party',
          date: new Date(2021, 11, 3),
          totalAttending: 1,
          id: 7,
        },
      ],
      fandoms: [
        {
          name: 'Avengers',
          id: 1,
          activityLevel: 5,
          category: 'movies',
        },
        {
          name: 'Harry Potter',
          id: 2,
          activityLevel: 2,
          category: 'movies',
        },
        {
          // Books Category
          name: 'Percy Jackson',
          id: 10,
          activityLevel: 1,
          category: 'books',
        },
        {
          // Games Category
          name: 'Call of Duty',
          id: 20,
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
          id: 2,
        },
      ],
      fandoms: [
        {
          // Movies Category
          name: 'Harry Potter',
          id: 2,
          activityLevel: 2,
          category: 'movies',
        },
        {
          // Sports Category
          name: 'Basketball',
          id: 25,
          activityLevel: 3,
          category: 'sports',
        },
        {
          // Shows Category
          name: 'The Big Bang Theory',
          id: 14,
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

  constructor(
    private _http: HttpClient,
    private _emailService: EmailService,
    private _userService: UserService
  ) {}

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

  getCurrentUser(): BehaviorSubject<UserDTO | null> {
    return this.currentUser;
  }

  createNewUser(newUser: NewUser) {
    if(!newUser.fullName || !newUser.email || !newUser.username || !newUser.password){
      return null;
    }

    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post<SigninRes>('http://localhost:5000/api/auth/signup', newUser, {headers: headers, responseType: 'json'})
  }

  processResult(user: UserDTO) {
    return user;
  }

  logOut() {
    this.currentUser.next(null);
    this.token = null;
    localStorage.clear();
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
    return this.currentUser.getValue()?.attendingEvents;
  }

  updateUserEventsByUsername(username: string, event: EventDTO): void {
    // Update user info (Add event to events attending) on server,
    // code below requires server call

    let user = this.currentUser.getValue();

    if (user) {
      let index = user.attendingEvents.findIndex(
        (userEvent) => userEvent.id === event.id
      );

      if (index < 0) {
        user.attendingEvents.push(event);
      }
    }
  }

  removeEventFromUserEvents(
    username: string,
    eventId: number | undefined
  ): void {
    // Update user info (remove event from events attending) on server,
    // code below requires server call

    let user = this.currentUser.getValue();
    if (user) {
      let eventIndex = user.attendingEvents.findIndex(
        (userEvent) => userEvent.id === eventId
      );

      if (eventIndex >= 0) {
        user.attendingEvents.splice(eventIndex, 1);
      }
    }
  }

  removeEventFromAllUsersEvents(eventId: number | undefined): void {
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
}
