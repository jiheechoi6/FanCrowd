# CSC309 Group Project - FanCrowd
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Libraries Used
| Dependency in package.json | Library Name |
| -------------------------- | ------------ |
| `"@fortawesome/fontawesome-free": "^5.15.2"` | Font Awesome  |
| `"@shtian/ng-pick-datetime": "^11.0.0"` | ng-pick-datetime |
| `"rxjs": "~6.6.0"` | RxJS  |
| `"xng-breadcrumb": "^6.6.1"`  | xng-breadcrumb |
| `"nodemailer": "^6.5.0"` | Nodemailer |
| `"passport-jwt": "^4.0.0"` | Passport.JS |

## App Link
**FanCrowd Site:** 

## Running the App
**Note:** You will need `Docker` and `MongoDB` installed correctly to run the backend.
Clone the repository to your local machine, then follow the steps to run the backend and frontend:

### Backend
**1.)** Open `Docker Desktop`, and then open a new terminal in the `team09/src` directory as administrator\
**2.)** Run `docker-compose build`, it will say `Successfully built ...` on completion\
**3.)** Run `docker-compose up`, it will say `Done seeding db` and `Server running on port 5000` on completion\
**4.)** Open `MongoDB Compass` and connect to localhost `27018`\
**5.)** API can be accessed with `http://localhost:5000/api/` on Postman

### Frontend
**1.)** Open a new terminal in the `team09/client` directory as administrator\
**2.)** Run `npm install`\
**3.)** Run `npm install -g @angular/cli`\
**4.)** Run `npm start`\
**5.)** Navigate to `http://localhost:4200/` in your preferred choice of a browser


## Login Credentials
**User 1**; username: `user1`, password: `user1`\
**User 2**; username: `user2`, password: `user2`\
**Admin**; username: `admin`, password: `admin`

The instructions to test as a user and admin are given below in the **Features** section. It explains what happens if you click on certain buttons or items and how some features differ for users and admins. Some things may not have any instructions as we believe those are trivial for example; Create/Delete buttons, or how to navigate the navigation bar.


## Features and How to Use
#### Login/Signup
This feature gives the user access to our web application. It has validation on all it's forms to ensure the data entered is correct. It will only allow the user to click login/signup if the data is valid. We have also included a reset password feature to allow the user to reset their password, it is a two step process where the user will first recieve a verification code on their email and they must enter that code only then will their new password become active.\

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


## API Routes
**URI**: `http://localhost:5000/api/`\
**Note:** The following table shows the responses returned for status code `200`, any other status code would result in some sort of an error message explaining what went wrong. Also all these endpoints require a header field called `Authorization` whose value is the token returned by the signin or signup endpoint in the form  of `"JWT {token}"`. Anywhere in the tables below if you see the format `{something}`, this means it should be replaced with the correct field and value from the database, for example; `{eventId}` means replace it with an actual event id from the database. The request bodies and responses are just examples, when testing expect to see different results for different values inputted for the fields.

### AUTH Endpoints
<table>
<tr>
<td> Method </td> <td> Route </td> <td> Body </td> <td> Response </td>
</tr>
<tr>
<td> 
  
  `POST`
  
</td>
<td> 
  
  `/auth/signup` 
  
</td>
<td>
  
```json
{
   "fullName": "Professor Mark",
   "email": "professor_mark@gmail.ca",
   "username": "prof_mark",
   "password": "ProfM@rk123"
}
```

</td>
<td>
  
```json
{
    "user": {
        "_id": "607054bcf4587500516bf232",
        "role": "user",
        "username": "prof_mark",
        "profileURL": "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
    },
    "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDcwNTRiY2Y0NTg3NTAwNTE2YmYyMzIiLCJyb2xlIjoidXNlciIsInVzZXJuYW1lIjoicHJvZl9tYXJrIiwicHJvZmlsZVVSTCI6Imh0dHBzOi8vd3d3LnBuZ2l0ZW0uY29tL3BpbWdzL20vMzAtMzA3NDE2X3Byb2ZpbGUtaWNvbi1wbmctaW1hZ2UtZnJlZS1kb3dubG9hZC1zZWFyY2hwbmctZW1wbG95ZWUucG5nIiwiaWF0IjoxNjE3OTc0NDYwfQ.KPMfaQ4X8TLshCC857vnFs-LV3Ag4DgVDgOuDHA-NQo"
}
```

</td>
</tr>
<tr>
<td> 
  
  `POST`
  
</td> <td> SignIn </td> 

<td> 
  
  `/auth/signin` 
  
</td>
<td>
  
```json
{
    "username": "user1",
    "password": "user1"
}
```

</td>
<td>
  
```json
{
    "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDZmZWEwOGZmOTFhZTAwM2I1N2NlMjYiLCJyb2xlIjoidXNlciIsInVzZXJuYW1lIjoidXNlcjEiLCJwcm9maWxlVVJMIjoiaHR0cHM6Ly9tb2NhaC5vcmcvdXBsb2Fkcy9wb3N0cy81NDIwNjQxLW1vb24tbmlnaHQtYmxhY2stc3BhY2UtaGFsbG93ZWVuLXN0YXItc3VwZXJtb29uLW5hdHVyZS1zdGVybmUtc3VwZXItbW9vbi1nYWxheHktdW5pdmVyc2Utc2t5LW5pZ2h0aW1lLWNyZWF0aXZlLWNvbW1vbnMtaW1hZ2VzLmpwZyIsImlhdCI6MTYxNzk0ODExMH0.fjCFHyV8-tyKdtc1M96PLYXo7fr4iDPbBMaljyOsqjo",
    "user": {
        "_id": "606fea08ff91ae003b57ce26",
        "role": "user",
        "username": "user1",
        "profileURL": "https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg"
    }
}
```

</td>
</tr>
<tr>
<td> 
  
  `GET`
  
</td> <td> Current User </td> 
<td> 
  
  `/auth/currentUser` 
  
</td> <td> N/A </td>
<td> 
  
 ```json
 {
   "_id": "606fea08ff91ae003b57ce26",
   "role": "user",
   "username": "user1",
   "profileURL": "https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg"
 }
 ```
</td>
</tr>
<tr>
</tr>
</table>


### USER Endpoints
<table>
<tr>
<td> Method </td> <td> Route </td> <td> Body </td> <td> Response </td>
</tr>
<tr>
<td> 
  
  `PATCH`

<td> 
  
  `/users/{username}` 
  
</td>
<td>
  
```json
{
    "bio": "Updated BIO",
    "city": "Updated City",
    "country": "Updated Country",
    "email": "new_email@gmail.com",
    "fullName": "Updated Name",
    "profileURL": "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
}
```

</td>
<td>
  
```json
{
    "role": "user",
    "bio": "Updated BIO",
    "profileURL": "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
    "city": "Updated City",
    "country": "Updated Country",
    "_id": "607051e3f4587500516bf190",
    "email": "new_email@gmail.com",
    "fullName": "Updated Name",
    "password": "$2a$10$q4Q..NiwGeHDPBkkfeu.zO7wBnOtFrag6Tg5z8e31EeCER9UMuzQ2",
    "username": "user1",
    "createdAt": "2021-04-09T13:08:51.261Z"
}
```

</td>
</tr>
<tr>
<td> 
  
  `DELETE`

<td> 
  
  `/users/{username}` 
  
</td>
<td> N/A </td>
<td> N/A </td>
</tr>
<tr>
<td> 
  
  `GET`
  
</td>
<td> 
  
  `/users` 
  
</td> <td> N/A </td>
<td> 
  
 ```json
 [
    {
        "role": "user",
        "bio": "Updated BIO",
        "profileURL": "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
        "city": "Updated City",
        "country": "Updated Country",
        "_id": "607051e3f4587500516bf190",
        "email": "new_email@gmail.com",
        "fullName": "Updated Name",
        "password": "$2a$10$q4Q..NiwGeHDPBkkfeu.zO7wBnOtFrag6Tg5z8e31EeCER9UMuzQ2",
        "username": "user1",
        "createdAt": "2021-04-09T13:08:51.261Z"
    },
    {
        "role": "user",
        "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "profileURL": "https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg",
        "city": "Toronto",
        "country": "Canada",
        "_id": "607051e3f4587500516bf191",
        "email": "raj@gmail.com",
        "fullName": "Raj Patel",
        "password": "$2a$10$v4odtrBLXTOynBeAOMcTL.cmf33r/m109lD.zPKtpW2Gp51FNme32",
        "username": "user2",
        "createdAt": "2021-04-09T13:08:51.357Z"
    },
    {
        "role": "admin",
        "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "profileURL": "https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg",
        "city": "Toronto",
        "country": "Canada",
        "_id": "607051e3f4587500516bf192",
        "email": "jihee@gmail.com",
        "fullName": "Jihee",
        "password": "$2a$10$YHF9YBbw3MyodDnBD00cfuU2Mq6i4yFYsOiH3aF6TvVwnVJFO6rlO",
        "username": "admin",
        "createdAt": "2021-04-09T13:08:51.448Z"
    },
    {
        "role": "user",
        "bio": "",
        "profileURL": "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
        "city": "",
        "country": "",
        "_id": "607054bcf4587500516bf232",
        "fullName": "Professor Mark",
        "email": "professor_mark@gmail.ca",
        "username": "prof_mark",
        "password": "$2a$10$kdIgJPQugSWDWe.uiwpB9uOQWM/w6XH4ZCGTYVBIOm81WzeFdGgii",
        "createdAt": "2021-04-09T13:21:00.241Z"
    }
]
 ```
</td>
</tr>
<tr>
</tr>
</table>
