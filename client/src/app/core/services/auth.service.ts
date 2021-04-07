import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import NewUser from 'src/app/shared/models/new-user';
import { EmailService } from './email.service';
import {
  UserIdentityToken,
  UserIdentity,
} from 'src/app/shared/models/user-identity-token';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<UserIdentity | null>(null);
  token: string | null = null;

  constructor(
    private _http: HttpClient,
    private _emailService: EmailService,
    private _router: Router
  ) {}

  loginUser(username: string, password: string) {
    return this._http
      .post<UserIdentityToken>('/api/auth/signin', { username, password })
      .pipe(map((res) => this.updateCurrentUser(res)));
  }

  createNewUser(newUser: NewUser) {
    return this._http
      .post<UserIdentityToken>('/api/auth/signup', newUser)
      .pipe(map((res) => this.updateCurrentUser(res)));
  }

  updateCurrentUser(res: UserIdentityToken) {
    if (res.user && res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      this.currentUser.next(res.user);
      this.token = res.token;
    }
    return res;
  }

  logOut() {
    this.currentUser.next(null);
    this.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  autoLogin() {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      this.token = localStorage.getItem('token');
      const userData: UserIdentity = JSON.parse(localStorage.getItem('user')!);
      this.currentUser.next(userData);
      this._http.get<UserIdentity>('/api/auth/currentUser').subscribe(
        (res) => this.updateCurrentUser({ token: this.token!, user: res }),
        (err) => this.logOut()
      );
    }
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
}