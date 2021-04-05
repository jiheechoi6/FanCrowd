import dotenv from "dotenv";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error(".env file not found");
}

export default {
  port: parseInt(process.env.PORT || "5000"),
  databaseURL: process.env.MONGODB_URI || "",
  api: {
    prefix: "/api"
  },
  jwtSecret: process.env.JWT_SECRET || "secret",
  nodemailer: {
    senderEmail: process.env.SENDER_EMAIL,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    redirectUri: "https://developers.google.com/oauthplayground"
  }
};
