import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import UserProfileDTO, { UserSearchDTO } from 'src/app/shared/models/user-dto';
import UserFandomRes from 'src/app/shared/models/user-fandom-res';
import { IEventSummary } from 'src/app/shared/models/event-summar';
import { ResetPasswordInfo } from 'src/app/shared/models/reset-password';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getAllUsers() {
    return this._http.get<UserSearchDTO[]>(`/api/users`);
  }

  getUserByUsername(username: string) {
    return this._http.get<UserProfileDTO>(`/api/users/${username}`);
  }

  getUserEventsByUsername(username: string) {
    return this._http.get<IEventSummary[]>(`/api/users/${username}/events`);
  }

  getUserFandomsByUsername(username: string) {
    return this._http.get<UserFandomRes[]>(`/api/users/${username}/fandoms`, {
      responseType: 'json',
    });
  }

  deleteUserByUsername(username: string) {
    this._http.delete(`/api/users/${username}`).subscribe();
  }

  banUserByUsername(username: string) {
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

  resetPassword(resetPasswordInfo: ResetPasswordInfo) {
    return this._http.post(`/api/users/reset-password`, resetPasswordInfo);
  }
}
