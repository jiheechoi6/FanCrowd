import { Injectable } from '@angular/core';
import UserDTO from 'src/app/shared/models/user-dto';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, fromEventPattern, Observable} from 'rxjs';
import NewUser from 'src/app/shared/models/new-user';
import { EmailService } from './email.service';
import EventDTO from 'src/app/shared/models/event-dto';
import UserIdentityToken from 'src/app/shared/models/user-identity-token';
import UserIdentity from 'src/app/shared/models/user-identity';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<UserIdentity | null>(null);
  token: string | null = null;

  users: UserDTO[] = [
    {
      _id: '1',
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
          id: "1",
        },
        {
          name: 'World Expo',
          date: new Date(2021, 5, 12),
          totalAttending: 2,
          id: "2",
        },
        {
          name: 'J.K Rowling Meet & Greet',
          date: new Date(2021, 9, 12),
          totalAttending: 3,
          id: "5",
        },
        {
          name: 'FIFA World Cup Party',
          date: new Date(2021, 11, 3),
          totalAttending: 1,
          id: "7",
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
      _id: '2',
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
          id: "2",
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
      _id: '3',
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
  ) {
    this.autoLogin();
  }

  loginUser(username: string, password: string) {
    //API request to auth endpoint
    return this._http.post<UserIdentityToken>('/api/auth/signin',
        {username, password}, {responseType: 'json'})
          .pipe(map(res => this.updateCurrentUser(res)));
  }

  createNewUser(newUser: NewUser) {
    if(!newUser.fullName || !newUser.email || !newUser.username || !newUser.password){
      return null;
    }

    return this._http.post<UserIdentityToken>('/api/auth/signup', newUser, {responseType: 'json'})
        .pipe(map((res)=>this.updateCurrentUser(res)));
  }

  getCurrentUser(): BehaviorSubject<UserIdentity | null> {
    return this.currentUser;
  }

  updateCurrentUser(res: UserIdentityToken): UserIdentityToken {
    if(res.user && res.token){
      localStorage.setItem('id_token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user))
      this.currentUser.next({
        ...res.user
      })
      this.token = res.token;
    }
    return res;
  }

  processResult(user: UserDTO) {
    return user;
  }

  logOut() {
    this.currentUser.next(null);
    this.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('id_token');
  }

  autoLogin(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }

    this._http.get<UserIdentity>('/api/auth/currentUser',
      {responseType: 'json'}).pipe(map(res => this.currentUser.next({...res})));
  }

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
    // return this.currentUserInfo.getValue()?.attendingEvents;
  }

  updateUserEventsByUsername(username: string, event: EventDTO): void {
    // Update user info (Add event to events attending) on server,
    // code below requires server call

    // let user = this.currentUserInfo.getValue();

    // if (user) {
    //   let index = user.attendingEvents.findIndex(
    //     (userEvent) => userEvent.id === event.id
    //   );

    //   if (index < 0) {
    //     user.attendingEvents.push(event);
    //   }
    // }
  }

  removeEventFromUserEvents(
    username: string,
    eventId: string | undefined
  ): void {
    // Update user info (remove event from events attending) on server,
    // code below requires server call

    // let user = this.currentUserInfo.getValue();
    // if (user) {
    //   let eventIndex = user.attendingEvents.findIndex(
    //     (userEvent) => userEvent.id === eventId
    //   );

    //   if (eventIndex >= 0) {
    //     user.attendingEvents.splice(eventIndex, 1);
    //   }
    // }
  }

  removeEventFromAllUsersEvents(eventId: string | undefined): void {
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
