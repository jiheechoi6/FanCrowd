import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import UserProfileDTO from 'src/app/shared/models/user-dto';
import EventDTO from 'src/app/shared/models/event-dto';
import Event from 'src/app/shared/models/event';
import Fandom from 'src/app/shared/models/fandom';
import FandomDTO from 'src/app/shared/models/fandom-dto';
import UserFandomRes from 'src/app/shared/models/user-fandom-res';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getAllUsers() {
    return this._http.get<UserProfileDTO[]>(`/api/users/`);
  }

  getUserByUsername(username: string) {
    // Get user from server, code below requires server call
    // return this.users.find((user) => user.username === username) || null;
    return this._http.get<UserProfileDTO>(`/api/users/${username}`);
  }

  getUserEventsByUsername(username: string) {
    // Get User's events from server, code below requires server call
    // return (
    //   this.users.find((user) => user.username === username)?.attendingEvents ||
    //   []
    // );
    return this._http.get<Event[]>(`/api/users/${username}/events`);
  }

  getUserFandomsByUsername(username: string) {
    return this._http.get<UserFandomRes[]>(`/api/users/${username}/fandoms`, {
      responseType: 'json',
    });
  }

  deleteUserByUsername(username: string) {
    // Delete user from server, code below requires server call
    this._http.delete(`/api/users/${username}`).subscribe();
  }

  banUserByUsername(username: string) {
    // Delete user from server, code below requires server call
    this._http.delete(`/api/users/${username}`).subscribe();
  }

  updateUserByUsername(
    updatedUser: UserProfileDTO,
    usernameBeforeUpdate: string
  ) {
    this._http
      .patch(`/api/users/${usernameBeforeUpdate}`, updatedUser)
      .subscribe();
  }
}
