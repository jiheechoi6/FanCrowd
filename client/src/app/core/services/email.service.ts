import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPasswordInfo } from 'src/app/shared/models/reset-password';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private _http: HttpClient) {}

  sendVerficationCode(emailAndUsername: ResetPasswordInfo) {
    return this._http.post(`/api/users/reset-password-email`, emailAndUsername);
  }
}
