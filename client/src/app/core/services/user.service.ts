import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import UserDTO from 'src/app/shared/models/user-dto';
import EventDTO from 'src/app/shared/models/event-dto';
import Event from 'src/app/shared/models/event';
import Fandom from 'src/app/shared/models/fandom';
import FandomDTO from 'src/app/shared/models/fandom-dto';
import UserFandomRes from 'src/app/shared/models/user-fandom-res'

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private _http: HttpClient) {}

  getAllUsers(){
    return this._http.get<UserDTO[]>(`/api/users/`);
  }

  getUserByUsername(username: string){
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
    return this._http.get<Event[]>(`/api/users/${username}/events`);
  }

  getUserFandomsByUsername(username: string){
    return this._http.get<UserFandomRes[]>(`/api/users/${username}/fandoms`,
      {responseType: 'json'});
  }

  deleteUserByUsername(username: string) {
    // Delete user from server, code below requires server call
    this._http.delete(`/api/users/${username}`).subscribe();
  }

  banUserByUsername(username: string) {
    // Delete user from server, code below requires server call
    this._http.delete(`/api/users/${username}`).subscribe();
  }

  updateUserByUsername(updatedUser: UserDTO, usernameBeforeUpdate: string) {
    // Update user info on server, code below requires server call
    this._http.patch(`/api/users/${usernameBeforeUpdate}`, 
      {bio: updatedUser.bio,
        city: updatedUser.city,
        country: updatedUser.country,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        profileURL: updatedUser.profileURL
      }).subscribe();
  }

  updateUserEventsByUsername(username: string, event: EventDTO) {
    // Update user info (Add event to events attending) on server,
    // code below requires server call

    let currentUser = this.users.find((user) => user.username === username);

    if (currentUser) {
      let index = currentUser.attendingEvents.findIndex(
        (userEvent) => userEvent._id === event._id
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
        (userEvent) => userEvent._id === eventId
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
          (userEvent) => userEvent._id === eventId
        );

        if (eventIndex >= 0) {
          user.attendingEvents.splice(eventIndex, 1);
        }
      }
    });
  }

  addFandomToUser(username: string, fandom: Fandom | null) {
    //Add a fandom with id fandomId to Users fandoms, code below requires server call

    // if (!fandom) return;

    // for (let i = 0; i < this.users.length; i++) {
    //   if (this.users[i].username === username) {
    //     this.users[i].fandoms.push(this.convertFandomToFandomDTO(fandom));
    //   }
    // }
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

