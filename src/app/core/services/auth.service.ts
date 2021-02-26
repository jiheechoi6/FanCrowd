import { Injectable } from '@angular/core';
import User from 'src/app/shared/models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserComponent } from 'src/app/user/user.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usernamePassord:Map<string, string> = 
    new Map([
        ["user1", "user1"],
        ["user2", "user2"],
        ["admin", "admin"]
    ]);
  currentLoggedInUser:string = "";
  users: Map<string, User> = 
    new Map([
    ['user1',
    {
      username: 'user1',
      password: 'user1',
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
      ]
    }],
    ['user2',
      {
      username: 'user2',
      password: 'user2',
      fullName: 'Raj Patel',
      city: 'Toronto',
      country: 'Canada',
      email: 'raj@gmail.com',
      profileUrl: 'https://dummyimage.com/250',
      role: 'user',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      attendingEvents: [],
      fandoms: []
    }],
    ['admin',
      {
      username: 'admin',
      password: 'admin',
      fullName: 'Jihee',
      city: 'Toronto',
      country: 'Canada',
      email: 'jihee@gmail.com',
      profileUrl: 'https://dummyimage.com/250',
      role: 'user',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      attendingEvents: [],
      fandoms: []
    }],
  ]);

  constructor(private http: HttpClient) {}

  getPasswordByUsername(username: string) {
    if(!this._usernamePassord.has(username)){
      return null
    }
    return this._usernamePassord.get(username);
  }

  addNewUser(username: string, firstname:string, lastname:string, password:string, usertype: string){
    this.users.set(username, 
      {username: username,
      password: password,
      fullName: firstname + lastname,
      city: '',
      country: '',
      email: '',
      profileUrl: '',
      role: usertype,
      bio: '',
      attendingEvents: [],
      fandoms: []});
      console.log(this.users.get(username));
  }
}
