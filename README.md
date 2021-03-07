# CSC309 Group Project - FanCrowd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.


## Running the App

If first time, after cloning the repository to your local machine, first run `npm install`, then run `npm install -g @angular/cli`. Lastly open a new terminal in the directory and run `ng serve` for a dev server. Then navigate to `http://localhost:4200/` in your preferred choice of a browser.

If you have already cloned the repository and run the first two commands, then open a new terminal in the directory on your local machine and run `ng serve`. Then navigate to `http://localhost:4200/` in your preferred choice of a browser.

## Login Credentials

We have 2 users and 1 admin. 

User 1; username: user1, password: user1
User 2; username: user2, password: user2
Admin; username: admin, password: admin

## Things to Keep in Mind

When a new event, Fandom category, or fandom is added the app uses an id of 1000. The id is hardcoded so if you add multiple of these objects when deleting or updating, the app will choose the first one in the list that matches the id of 1000. This will be addressed in phase 2 when we build the backend because in the database we will only allow unique ids.
