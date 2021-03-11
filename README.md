# CSC309 Group Project - FanCrowd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5. This project uses 2 external libraries called _Font Awesome_ and _ng-pick-datetime_. We have used HTML, SASS, JavaScript, and TypeScript to develop this project.


## Running the App

Clone the repository to your local machine, and make sure you're on the `dev` branch (This is crucial!) then follow the next 4 steps:

**1.)** Open a new terminal in the `team09` directory and run `npm install`\
**2.)** Run `npm install ng-pick-datetime --save`\
**3.)** Run `npm install -g @angular/cli`\
**4.)** run `ng serve` or `npm start` and navigate to `http://localhost:4200/` in your preferred choice of a browser

## Login Credentials

**User 1**; username: `user1`, password: `user1`\
**User 2**; username: `user2`, password: `user2`\
**Admin**; username: `admin`, password: `admin`

The instructions to test as a user and admin are given below in the **Features** section. It explains what happens if you click on certain buttons or items and how some features differ for users and admins. Some things may not have any instructions as we believe those are trivial for example; Create/Delete buttons, or how to navigate the naveigation bar.


## Features and How to Use
#### Login/Signup
This feature gives the user access to our web application. It has validation on all it's forms to ensure the data entered is correct. It will only allow the user to click login/signup if the data is valid. We have also included a reset password feature to allow the user to reset their password, it is a two step process where the user will first recieve a verification code on their email and they must enter that code only then will their new password become active.\
**Note**: The reset password right now will not actually reset the password of any users this will be made complete in Phase 2 with the backend.

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
This page will display all the events listed in order of most recent to oldest start dates. The events display a brief description, which user/admin posted it, the fandom type, the name, location, date and time, and how many users are attending. 

For a user/admin to access more details about the event, they can click the name of the event. If you click the username it will redirect you to that user's profile, if you click the fandom name, it will redirect you to the fandom's discussion board. Users/admins can create their own events by giving valid information, if information is missing or invalid, the form will display a validation message and disable the `Create` button. 

If you click the event name, it will redirect you to that event's page where more information will be provided such as reviews from other users, a full description of the event, the overall rating from all the reviews given. Notice that the user/admin who created the event is the only person who can edit or delete the event, but admins can edit or delete all events whether or not they created them.

A user/admin is allowed to write a review once on each event. Only the user/admin that wrote the review can edit or delete the review, but admins can delete all reviews whether or not they created them. The user/admin can click the `Add Review` button, which open a form that has validation messages if information entered is invalid. If the information is valid then the `Add` button will be enable, otherwise disabled (Same as all the other forms on the site). Reviews are ideally sorted by recent first. Right now they are not sorted, but this will be implemented in Phase 2 with the help of the backend.

To navigate back to all events, please use the back button on your browser.


#### Fandoms
This page is split into categories and fandoms. For each fandom users can post discussions and comments to spark interest!

A user/admin can navigate to a specfic fandom by selecting it's category then the fandom itself.\
**Note**: Only admins are allowed to add more categories, but both users and admins can add fandoms.

When a user/admin is on the fandom page, they have the ability to join the fandom by clicking `Join Fandom`. For a user/admin to post, they must join the fandom first. When a user/admin posts, they cannot edit or delete their post. A user/admin can like or dislike a post or comment, by clicking the "Thumbs up" or "Thumbs down" on the individual posts.\
**Note**: Currently everytime you click like or dislike, it will update the counter, of course there should be constraints and those will be added in Phase 2 with the help of the backend.

Notice, for each fandom on it's page on the right side, it displays all the events for that fandom. By clicking an event in that box you can navigate to that event's detail page. 


## Things to Keep in Mind

When a new event, Fandom category, or fandom is added the app uses a hardcoded id value of 1000. The id is hardcoded so if you add multiple of these objects when deleting or updating, the app will choose the first one in the list that matches the id of 1000, even though you meant to delete the second or third item you created. This will be addressed in phase 2 with the help of the backend because in the database we will only allow unique ids.

Also please don't pay too much attention to the images or the content of the features, this is hardcoded so some of it may not make sense.
