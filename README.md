# CSC309 Group Project - FanCrowd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5. This project uses 2 external libraries called _Font Awesome_ and _ng-pick-datetime_.


## Running the App

Clone the repository to your local machine, then follow the next 4 steps:

**1.)** Open a new terminal in the `team09` directory and run `npm install`\
**2.)** Run `npm install ng-pick-datetime --save`\
**3.)** Run `npm install -g @angular/cli`\
**4.)** run `ng serve` or `npm start` and navigate to `http://localhost:4200/` in your preferred choice of a browser

## Login Credentials

**User 1**; username: `user1`, password: `user1`\
**User 2**; username: `user2`, password: `user2`\
**Admin**; username: `admin`, password: `admin`


## Features and How to Use
#### Login/Signup
This feature gives the user access to our web application. It has validation on all it's forms to ensure the data entered is correct. It will only allow the user to click login/signup if the data is valid. We have also included a reset password feature to allow the user to reset their password, it is a two step process where the user will first recieve a verification code and they must enter that code only then will their new password become active. **Note**: The reset password right now will not actually reset the password of any users this will be made complete in Phase 2 with the backend.

When the user/admin navigates to the login page, they will be asked to give their credentials (given above). If their credentials are entered incorrectly, the form will display a message saying something is invalid. If the information is valid it will enable the login button and allow the user to login in which will take them to the profile page. When users signup they will also be redirected to the profile page. Admins cannot sign up, their accounts must be pre-populated or someone with access to the backend must create one for them.


#### Profile
This page displays the user's/admin's biography, shows their picture, shows which fandoms they're interested in, and which events they will attend. It also displays their personal information and allow them to edit the information or delete their accounts. 

If a user goes to another users profile page they cannot edit that users information or delete their account. Admins can ban users for some amount of time if neccesary. The ban will not actually ban a user right now, this will be implemented in Phase 2 with help from the backend. User's and admins can edit or delete their own profiles, but admins can ban other users! If a user/admin clicks on one of the fandoms in the `Fandoms` section, they will be redirected to the Fandoms page and that specific fandom they clicked on, same goes for the events in the `Events Attending` section.


#### Search
The search bar located in the navigation bar allows the user/admin to search for other users/admins or themselves. It is an elastic search so it will filter on every key input.

Users/admins can both search for other users/admins and checkout their profile pages to see which events they will attend or which fandoms they're interested in!


#### Calendar
This page displays a calendar showing how many events you(the user/admin) will attend and on which dates. It will also display the events and some of their information.

A user/admin can see how many events they will attend on a particular date. If the  user/admin clicks on the date (the date number), it will open a modal window of all the events that the user/admin will attend on that date. If you click one of the events, you will be redirected to the `event details` page giving you more information about that event.


#### Events

## Things to Keep in Mind

When a new event, Fandom category, or fandom is added the app uses an id of 1000. The id is hardcoded so if you add multiple of these objects when deleting or updating, the app will choose the first one in the list that matches the id of 1000. This will be addressed in phase 2 when we build the backend because in the database we will only allow unique ids.
