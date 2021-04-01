import mongoose from "mongoose";
import ErrorService from "./error";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { IEmailOptions } from "../interfaces/IEmail";
import config from "../config";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const OAuth2 = google.auth.OAuth2;

export default class EmailService {
  private async createTransporter() {
    const oauth2Client = new OAuth2(
      config.nodemailer.googleClientId,
      config.nodemailer.googleClientSecret,
      config.nodemailer.redirectUri
    );

    oauth2Client.setCredentials({
      refresh_token: config.nodemailer.googleRefreshToken
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.nodemailer.senderEmail,
        accessToken,
        clientId: config.nodemailer.googleClientId,
        clientSecret: config.nodemailer.googleClientSecret,
        refreshToken: config.nodemailer.googleRefreshToken
      }
    } as SMTPTransport.Options);

    return transporter;
  }

  public async sendEmail(emailOptions: IEmailOptions) {
    const emailTransporter = await this.createTransporter();
    await emailTransporter.sendMail({
      ...emailOptions,
      from: config.nodemailer.senderEmail
    });
  }
}
