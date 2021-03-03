import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private _http: HttpClient) {}

  sendVerficationCode(email: string) {
    //API request to endpoint to send a random verification code to email
  }

  sendPasswordChangedEmail(email: string) {}
}
