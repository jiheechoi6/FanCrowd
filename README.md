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
This feature gives the user access to our web application. It has validation on all it's forms to ensure the data entered is correct. It will only allow the user to click login/signup if the data is valid. We have also included a reset password feature to allow the user to reset their password, it is a two step process where the user will first recieve a verification code on their email and they must enter that code only then will their new password become active.

When the user/admin navigates to the login page, they will be asked to give their credentials (given above). If their credentials are entered incorrectly, the form will display a message saying something is invalid. If the information is valid it will enable the login button and allow the user to login in which will take them to the profile page. When users signup they will also be redirected to the profile page. Admins cannot sign up, their accounts must be pre-populated or someone with access to the backend must create one for them.


#### Profile
This page displays the user's/admin's biography, shows their picture, shows which fandoms they're interested in, and which events they will attend. It also displays their personal information and allow them to edit the information or delete their accounts. 

If a user goes to another users profile page they cannot edit that users information or delete their account. Admins can ban users for some amount of time if neccesary. The ban will not actually ban a user right now, this will be implemented in Phase 2 with help from the backend. User's and admins can edit or delete their own profiles, but admins can ban other users! If a user/admin clicks on one of the fandoms in the `Fandoms` section, they will be redirected to the Fandoms page and that specific fandom they clicked on, same goes for the events in the `Events Attending` section.


#### Search
The search bar located in the navigation bar allows the user/admin to search for other users/admins or themselves. It is an elastic search so it will filter on every key input. You will need to click the search icon or on the user itself to be redirected to their profile page, you cannot press `enter`!

Users/admins can both search for other users/admins and checkout their profile pages to see which events they will attend or which fandoms they're interested in!


#### Calendar
This page displays a calendar showing how many events you(the user/admin) will attend and on which dates. It will also display the events and some of the event's information such as total attendence, name, date and time, etc.

A user/admin can see how many events they will attend on a particular date. If the user/admin clicks on the date (the date number), it will open a modal window of all the events that the user/admin will attend on that date. If you click one of the events, you will be redirected to the `event details` page giving you more information about that event.


#### Events
This page will display all the events listed in order of most recent to oldest start dates. The events display a brief description, which user/admin posted it, the fandom type, the name, location, date and time, and how many users are attending. 

For a user/admin to access more details about the event, they can click the name of the event. If you click the username it will redirect you to that user's profile, if you click the fandom name, it will redirect you to the fandom's discussion board. Users/admins can create their own events by giving valid information, if information is missing or invalid, the form will display a validation message and disable the `Create` button. 

If you click the event name, it will redirect you to that event's page where more information will be provided such as reviews from other users, a full description of the event, the overall rating from all the reviews given. Notice that the user/admin who created the event is the only person who can edit or delete the event, but admins can edit or delete all events whether or not they created them.

A user/admin is allowed to write a review once on each event. Only the user/admin that wrote the review can edit or delete the review, but admins can delete all reviews whether or not they created them. The user/admin can click the `Add Review` button, which open a form that has validation messages if information entered is invalid. If the information is valid then the `Add` button will be enable, otherwise disabled (Same as all the other forms on the site). Reviews are also sorted by recent first.

To navigate back to all events, you can use the breadcrumb on the top left corner of the page or the browser's back button.


#### Fandoms
This page is split into categories and fandoms. For each fandom users can post discussions and comments to spark interest!

A user/admin can navigate to a specfic fandom by selecting it's category then the fandom itself.\
**Note**: Only admins are allowed to add more categories, but both users and admins can add fandoms.

When a user/admin is on the fandom page, they have the ability to join the fandom by clicking `Join Fandom`. For a user/admin to post, they must join the fandom first. When a user/admin posts, they cannot edit or delete their post. A user/admin can like or dislike a post or comment, by clicking the "Thumbs up" or "Thumbs down" on the individual posts.\
**Note**: Currently everytime you click like or dislike, it will update the counter, of course there should be constraints and those will be added in Phase 2 with the help of the backend.

Notice, for each fandom on it's page on the right side, it displays all the events for that fandom. By clicking an event in that box you can navigate to that event's detail page. 


## API Routes
**IMPORTANT:** ***The tables below do not contain all the routes and endpoints we used, they just show the structure of our routes so when testing you get a better idea of how we did things. For the full list of endpoints we have exported our list of endpoints from Postman and put them in the following directory: `team09/src/postman-endpoints` please download that file and import it to Postman.***

**URI**: `http://localhost:5000/api/`\
**Note:** The following table shows the responses returned for status code `200`, any other status code would result in some sort of an error message explaining what went wrong. Also all these endpoints require a header field called `Authorization` whose value is the token returned by the signin or signup endpoint in the form  of `"JWT {token}"`.

**Note:** Anywhere in the tables below if you see the format `{something}`, this means it should be replaced with the correct field and value from the database, for example; `{eventId}` means replace it with an actual event id from the database. The request bodies and responses are just examples, when testing expect to see different results for different values inputed for the fields.

**Note:** All the examples below are for _user1_.

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
  
</td>

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
  
  `POST`
<td> 
  
  `/users/reset-password-email` 
  <br>
  <br>
  Sends a reset password email to a user
</td>
<td>
  
```json
{
    "username": "prof_mark",
    "email": "professor_mark@gmail.ca"
}
```

</td>
<td>
  
Status code of `200`

</td>
</tr>
<tr>
<td> 
  
  `POST`
  
<td> 
  
  `/users/reset-password` 
  <br>
  <br>
  Resets user's password
</td>
<td>
  
```json
{
    "verificationCode": "999999",
    "password": "Prof_m@rk987",
    "username": "prof_mark",
    "email": "professor_mark@gmail.ca"
}
```

</td>
<td>
  
Status code of `200`

</td>
</tr>
<tr>
<td> 
  
  `PATCH`

<td> 
  
  `/users/{username}` 
  <br>
  <br>
  Updates an user's profile information
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
  
  `PATCH`

<td> 
  
  `/users/{userId}/update-ban` 
  <br>
  <br>
  This endpoint can only be used by an Admin, so you will need the Admin's token for the `Authorization` Header
  <br>
  <br>
  Toggles user's ban
</td>
<td>
  N/A
</td>
<td>
  
Status code of `200`

</td>
</tr>
<tr>
<td> 
  
  `DELETE`

<td> 
  
  `/users/{username}` 
  <br>
  <br>
  Deletes a user
</td>
<td> N/A </td>
<td> 
  
Status code of `200` 

</td>
</tr>
<tr>
<td> 
  
  `GET`
  
</td>
<td> 
  
  `/users` 
  <br>
  <br>
  Get all users
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
<td> 
  
  `GET`
  
</td>
<td> 
  
  `/users/{username}` 
  <br>
  <br>
  Get a user with username
</td> 
<td> 
  
  N/A 
  
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
    "username": "user1",
    "createdAt": "2021-04-09T13:08:51.261Z"
}
 ```
</td>
</tr>
<tr>
<td> 
  
  `GET`
  
</td>
<td> 
  
  `/users/{username}/events` 
  <br>
  <br>
  Get a user's events
</td> 
<td> 
  
  N/A 
  
</td>
<td> 
  
 ```json
[
    {
        "_id": "607051e3f4587500516bf1b4",
        "name": "World Expo",
        "description": "Our once-in-a-lifetime celebration – the largest event ever staged in the Arab world – is set to welcome 190 participating countries, and millions of visitors from across the globe. Here they will experience warm Emirati hospitality at its finest, as well as the UAE’s values of inclusion, tolerance and cooperation. Youth are at the heart of our World Expo. That’s why Expo 2020 aspires to create a meaningful legacy that will benefit generations to come, both locally and globally, spanning everything from innovations and architecture to friendships and business opportunities.",
        "location": "Dubai, UAE",
        "startDate": "2021-06-12T00:00:00.000Z",
        "endDate": "2021-06-14T00:00:00.000Z",
        "totalAttendance": 2
    },
    {
        "_id": "607051e3f4587500516bf1b3",
        "name": "Comic Con",
        "description": "A comic book convention or comic con is an event with a primary focus on comic books and comic book culture, in which comic book fans gather to meet creators, experts, and each other. Commonly, comic conventions are multi-day events hosted at convention centers, hotels, or college campuses.",
        "location": "Toronto, Ontario, Canada",
        "startDate": "2021-11-12T00:00:00.000Z",
        "endDate": "2021-11-14T00:00:00.000Z",
        "totalAttendance": 1
    },
    {
        "_id": "607051e3f4587500516bf1b7",
        "name": "J.K Rowling Meet & Greet",
        "description": "Harry Potter is a series of seven fantasy novels written by British author, J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
        "location": "Vancouver, British Columbia, Canada",
        "startDate": "2021-10-12T00:00:00.000Z",
        "endDate": "2021-10-15T00:00:00.000Z",
        "totalAttendance": 1
    }
]
 ```
</td>
</tr>
<tr>
<td> 
  
  `GET`
  
</td>
<td> 
  
  `/users/{username}/fandoms` 
  <br>
  <br>
  Get a user's fandoms
</td> 
<td> 
  
  N/A 
  
</td>
<td> 
  
 ```json
[
    {
        "backgroundURL": "https://wallpaperaccess.com/full/311206.jpg",
        "_id": "607051e3f4587500516bf19a",
        "name": "avengers",
        "category": {
            "backgroundURL": "https://i.pinimg.com/originals/51/c2/2e/51c22e9f59f506d283c1b07fa92e9a93.jpg",
            "_id": "607051e3f4587500516bf193",
            "createdBy": "607051e3f4587500516bf192",
            "name": "movies"
        },
        "createdBy": "607051e3f4587500516bf190",
        "createdAt": "2021-04-09T13:08:51.466Z"
    },
    {
        "backgroundURL": "https://wallpaperaccess.com/full/1117133.jpg",
        "_id": "607051e3f4587500516bf19c",
        "name": "avengers age of ultron",
        "category": {
            "backgroundURL": "https://i.pinimg.com/originals/51/c2/2e/51c22e9f59f506d283c1b07fa92e9a93.jpg",
            "_id": "607051e3f4587500516bf193",
            "createdBy": "607051e3f4587500516bf192",
            "name": "movies"
        },
        "createdBy": "607051e3f4587500516bf190",
        "createdAt": "2021-04-09T13:08:51.471Z"
    },
    {
        "backgroundURL": "https://wallpapercave.com/wp/wp1826730.jpg",
        "_id": "607051e3f4587500516bf19f",
        "name": "divergent",
        "category": {
            "backgroundURL": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80",
            "_id": "607051e3f4587500516bf194",
            "createdBy": "607051e3f4587500516bf192",
            "name": "books"
        },
        "createdBy": "607051e3f4587500516bf191",
        "createdAt": "2021-04-09T13:08:51.477Z"
    },
    {
        "backgroundURL": "https://images2.alphacoders.com/805/805700.jpg",
        "_id": "607051e3f4587500516bf19e",
        "name": "journey to the mysterious island",
        "category": {
            "backgroundURL": "https://i.pinimg.com/originals/51/c2/2e/51c22e9f59f506d283c1b07fa92e9a93.jpg",
            "_id": "607051e3f4587500516bf193",
            "createdBy": "607051e3f4587500516bf192",
            "name": "movies"
        },
        "createdBy": "607051e3f4587500516bf190",
        "createdAt": "2021-04-09T13:08:51.475Z"
    }
]
 ```
</td>
</tr>
</table>


### FANDOM Endpoints
<table>
<tr>
<td> Method </td> <td> Route </td> <td> Body </td> <td> Response </td>
</tr>
<tr>
<td> 
  
  `POST`
  
</td> 
<td> 
  
  `/fandoms/categories` 
  <br>
  <br>
  This endpoint can only be used by an Admin, so you will need the Admin's token for the `Authorization` Header
  <br>
  <br>
  Add a category
</td>
<td>
  
```json
{
    "name": "Testing_POST_Fandom_Category",
    "backgroundURL": "https://starwarsblog.starwars.com/wp-content/uploads/2020/04/star-wars-backgrounds-25.jpg"
}
```

</td>
<td>
  
```json
{
    "backgroundURL": "https://starwarsblog.starwars.com/wp-content/uploads/2020/04/star-wars-backgrounds-25.jpg",
    "_id": "60706e79f4587500516bf234",
    "name": "testing post category"
}
```

</td>
</tr>
<tr>
<td> 
  
  `POST`
  
</td> 
<td> 
  
  `/fandoms/{fandomId}/join` 
  <br>
  <br>
  Join a fandom
</td>
<td>
  
N/A

</td>
<td>
  
Status code of `200`

</td>
</tr>
<tr>
<td> 
  
  `POST`
  
</td> 
<td> 
  
  `/fandoms/likes` 
  <br>
  <br>
  Toggles like for a post or a comment or both
</td>
<td>
  
```json
{
    "fandomPost": "607051e3f4587500516bf1c3",
    "fandomComment": "607051e3f4587500516bf1c6",
    "isLike": true
}
```
"fandomPost" is a post id which can be obtained from the database.
"fandomComment" is a comment id which can be obtained from the database.
Note: You need either one or the other
</td>
<td>
  
Status code of `200`

</td>
</tr>
<tr>
<td> 
  
  `POST`
  
</td> 
<td> 
  
  `/fandoms` 
  <br>
  <br>
  Add a fandom
</td>
<td>
  
```json
{
    "name": "Testing POST Fandom",
    "backgroundURL": "https://starwarsblog.starwars.com/wp-content/uploads/2020/04/star-wars-backgrounds-25.jpg",
    "category": "607051e3f4587500516bf193"
}
```
<br>
"category" is a category id from the database
</td>
<td>
  
```json
{
    "backgroundURL": "https://starwarsblog.starwars.com/wp-content/uploads/2020/04/star-wars-backgrounds-25.jpg",
    "_id": "60706ef5f4587500516bf235",
    "name": "testing post fandom",
    "category": "607051e3f4587500516bf193",
    "createdAt": "2021-04-09T15:12:53.092Z"
}
```

</td>
</tr>
<tr>
<td> 
  
  `PATCH`

<td> 
  
  `/fandoms/categories/{categoryId}` 
  <br>
  <br>
  This endpoint can only be used by an Admin, so you will need the Admin's token for the `Authorization` Header.
  <br>
  <br>
  Update a category
</td>
<td>
  
```json
{
    "name": "Testing Patch Category",
    "backgroundURL": "https://www.sait.ca/images/News%20and%20Events/2021/Pride%20-%20Zoom%20background.jpg"
}
```

</td>
<td>
  
```json
{
    "backgroundURL": "https://www.sait.ca/images/News%20and%20Events/2021/Pride%20-%20Zoom%20background.jpg",
    "_id": "607051e3f4587500516bf193",
    "name": "testing patch category"
}
```

</td>
</tr>
<tr>
<td> 
  
  `PATCH`

<td> 
  
  `/fandoms/{fandomId}` 
  <br>
  <br>
  Update a fandom
</td>
<td>
  
```json
{
    "name": "Testing PATCH Fandom",
    "backgroundURL": "https://starwarsblog.starwars.com/wp-content/uploads/2020/04/star-wars-backgrounds-25.jpg",
    "category": "607051e3f4587500516bf193"
}
```

</td>
<td>
  
```json
{
    "backgroundURL": "https://starwarsblog.starwars.com/wp-content/uploads/2020/04/star-wars-backgrounds-25.jpg",
    "_id": "607051e3f4587500516bf1a2",
    "name": "testing patch fandom",
    "category": "607051e3f4587500516bf194",
    "createdAt": "2021-04-09T13:08:51.482Z"
}
```

</td>
</tr>
<tr>
<td> 
  
  `DELETE`

<td> 
  
  `/fandoms/categories/{categoryId}` 
  <br>
  <br>
  This endpoint can only be used by an Admin, so you will need the Admin's token for the `Authorization` Header.
  <br>
  <br>
  Delete a category
</td>
<td> N/A </td>
<td> 
  
  Status code of `200` 
  
</td>
</tr>
<tr>
<td> 
  
  `DELETE`

<td> 
  
  `/fandoms/{fandomId}` 
  <br>
  <br>
  Delete a fandom
</td>
<td> N/A </td>
<td> 
  
  Status code of `200` 
  
</td>
</tr>
<tr>
<td> 
  
  `GET`
  
</td>
<td> 
  
  `/fandoms/categories` 
  <br>
  <br>
  Get all categories
</td>
<td> N/A </td>
<td> 
  
 ```json
 [
    {
        "backgroundURL": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80",
        "_id": "607051e3f4587500516bf194",
        "name": "books"
    },
    {
        "backgroundURL": "https://www.canvasandwall.co.za/wp-content/uploads/2020/04/TV-Background-3D-wallpaper.jpg",
        "_id": "607051e3f4587500516bf195",
        "name": "shows"
    },
    {
        "backgroundURL": "https://cdn.wallpapersafari.com/28/72/eMnp5F.jpg",
        "_id": "607051e3f4587500516bf196",
        "name": "anime"
    },
    {
        "backgroundURL": "https://wallpaperaccess.com/full/242347.jpg",
        "_id": "607051e3f4587500516bf197",
        "name": "games"
    },
    {
        "backgroundURL": "https://wallpaperaccess.com/full/552032.jpg",
        "_id": "607051e3f4587500516bf198",
        "name": "sports"
    },
    {
        "backgroundURL": "https://wallpaperaccess.com/full/249743.png",
        "_id": "607051e3f4587500516bf199",
        "name": "technology"
    },
    {
        "backgroundURL": "https://starwarsblog.starwars.com/wp-content/uploads/2020/04/star-wars-backgrounds-25.jpg",
        "_id": "60706e79f4587500516bf234",
        "name": "testing post category"
    }
]
 ```
</td>
</tr>
<tr>
<td> 
  
  `GET`
  
</td>
<td> 
  
  `/fandoms/categories/{categoryName}` 
  <br>
  <br>
  Get all fandoms of a category
</td> 
<td> 
  
  N/A 
  
</td>
<td> 
  
 ```json
{
    "fandoms": [
        {
            "backgroundURL": "https://i.pinimg.com/originals/dc/eb/80/dceb80db40569f060a1197d7f8c58916.jpg",
            "_id": "607051e3f4587500516bf1ad",
            "name": "basketball",
            "category": "607051e3f4587500516bf198",
            "createdAt": "2021-04-09T13:08:51.505Z"
        },
        {
            "backgroundURL": "https://wallpapercave.com/wp/4dqP3rn.jpg",
            "_id": "607051e3f4587500516bf1ae",
            "name": "soccer",
            "category": "607051e3f4587500516bf198",
            "createdAt": "2021-04-09T13:08:51.507Z"
        },
        {
            "backgroundURL": "https://cdn.hipwallpaper.com/i/91/94/rFjELC.jpg",
            "_id": "607051e3f4587500516bf1af",
            "name": "golf",
            "category": "607051e3f4587500516bf198",
            "createdAt": "2021-04-09T13:08:51.510Z"
        },
        {
            "backgroundURL": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Y3JpY2tldHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
            "_id": "607051e3f4587500516bf1b0",
            "name": "cricket",
            "category": "607051e3f4587500516bf198",
            "createdAt": "2021-04-09T13:08:51.512Z"
        }
    ],
    "category": {
        "backgroundURL": "https://wallpaperaccess.com/full/552032.jpg",
        "_id": "607051e3f4587500516bf198",
        "createdBy": "607051e3f4587500516bf192",
        "name": "sports"
    }
}
 ```
</td>
</tr>
<tr>
<td> 
  
  `GET`
  
</td>
<td> 
  
  `/fandoms/{fandomId}/hasJoined` 
  <br>
  <br>
  Get if user has joined fandom
</td> 
<td> 
  
  N/A 
  
</td>
<td> 
  
 ```json
true
 ```
</td>
</tr>
</table>


### EVENTS Endpoints
<table>
<tr>
<td> Method </td> <td> Route </td> <td> Body </td> <td> Response </td>
</tr>
<tr>
<td> 
  
  `POST`
  
</td> 
<td> 
  
  `/events` 
  <br>
  This endpoint can only be used by an Admin, so you will need the Admin's token for the `Authorization` Header
</td>
<td>
  
```json
{
    "name": "testing_POST_event",
    "description": "testing description",
    "location": "testing loc",
    "startDate": "2021-11-12T00:00:00.000+00:00",
    "endDate": "2021-11-12T00:00:00.000+00:00",
    "fandom": "607051e3f4587500516bf19f"
}
```
<br>
"fandom" takes in a fandom id from the database
</td>
<td>
  
```json
{
    "_id": "60707b8a167f3c00a143dbc3",
    "name": "testing_POST_event",
    "description": "testing description",
    "location": "testing loc",
    "startDate": "2021-11-12T00:00:00.000Z",
    "endDate": "2021-11-12T00:00:00.000Z",
    "fandom": {
        "_id": "607051e3f4587500516bf19f",
        "backgroundURL": "https://wallpapercave.com/wp/wp1826730.jpg",
        "name": "divergent",
        "category": {
            "_id": "607051e3f4587500516bf194",
            "backgroundURL": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80",
            "createdBy": "607051e3f4587500516bf192",
            "name": "books"
        },
        "createdBy": "607051e3f4587500516bf191",
        "createdAt": "2021-04-09T13:08:51.477Z"
    },
    "postedBy": {
        "profileURL": "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
        "username": "user1"
    },
    "totalAttendance": 0
}
```

</td>
</tr>
<tr>
<td> 
  
  `PATCH`

<td> 
  
  `/events/{eventId}` 
  
</td>
<td>
  
```json
{
    "name": "testing_PATCH_event",
    "description": "testing new description",
    "location": "testing new loc",
    "startDate": "2021-08-12T00:00:00.000+00:00",
    "endDate": "2021-10-12T00:00:00.000+00:00",
    "fandom": "607051e3f4587500516bf19f"
}
```
<br>

"fandom" takes in a fandom id from the database

</td>
<td>
  
```json
{
    "_id": "60707b8a167f3c00a143dbc3",
    "name": "testing_PATCH_event",
    "description": "testing new description",
    "location": "testing new loc",
    "startDate": "2021-08-12T00:00:00.000Z",
    "endDate": "2021-10-12T00:00:00.000Z",
    "fandom": {
        "_id": "607051e3f4587500516bf19f",
        "backgroundURL": "https://wallpapercave.com/wp/wp1826730.jpg",
        "name": "divergent",
        "category": {
            "_id": "607051e3f4587500516bf194",
            "backgroundURL": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80",
            "createdBy": "607051e3f4587500516bf192",
            "name": "books"
        },
        "createdBy": "607051e3f4587500516bf191",
        "createdAt": "2021-04-09T13:08:51.477Z"
    },
    "postedBy": {
        "profileURL": "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
        "username": "user1"
    },
    "totalAttendance": 0
}
```

</td>
</tr>
<tr>
<td> 
  
  `DELETE`

<td> 
  
  `/event{eventId}` 

</td>
<td> N/A </td>
<td> 
  
  Status code of `200` 
  
</td>
</tr>
<tr>
<td> 
  
  `GET`
  
</td>
<td> 
  
  `/events` 
  
</td>
<td> N/A </td>
<td> 
  
 ```json
[
    {
        "_id": "607051e3f4587500516bf1b6",
        "name": "Sony Game Release",
        "description": "God of War is an action-adventure game franchise created by David Jaffe at Sony's Santa Monica Studio. It began in 2005 on the PlayStation 2 video game console, and has become a flagship title for the PlayStation brand, consisting of eight games across multiple platforms with a ninth currently in development.",
        "location": "Los Angeles, California, USA",
        "postedBy": {
            "profileURL": "https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg",
            "username": "user2"
        },
        "startDate": "2021-05-08T00:00:00.000Z",
        "endDate": "2021-05-11T00:00:00.000Z",
        "fandom": {
            "_id": "607051e3f4587500516bf1aa",
            "backgroundURL": "https://wallpapercave.com/wp/T4xxWSN.jpg",
            "name": "god of war",
            "category": {
                "_id": "607051e3f4587500516bf197",
                "backgroundURL": "https://wallpaperaccess.com/full/242347.jpg",
                "createdBy": "607051e3f4587500516bf192",
                "name": "games"
            },
            "createdBy": "607051e3f4587500516bf191",
            "createdAt": "2021-04-09T13:08:51.499Z"
        },
        "totalAttendance": 0
    },
    {
        "_id": "607051e3f4587500516bf1b4",
        "name": "World Expo",
        "description": "Our once-in-a-lifetime celebration – the largest event ever staged in the Arab world – is set to welcome 190 participating countries, and millions of visitors from across the globe. Here they will experience warm Emirati hospitality at its finest, as well as the UAE’s values of inclusion, tolerance and cooperation. Youth are at the heart of our World Expo. That’s why Expo 2020 aspires to create a meaningful legacy that will benefit generations to come, both locally and globally, spanning everything from innovations and architecture to friendships and business opportunities.",
        "location": "Dubai, UAE",
        "postedBy": {
            "profileURL": "https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg",
            "username": "user2"
        },
        "startDate": "2021-06-12T00:00:00.000Z",
        "endDate": "2021-06-14T00:00:00.000Z",
        "fandom": {
            "_id": "607051e3f4587500516bf1b1",
            "backgroundURL": "https://wallpapercave.com/wp/8duz5Ir.jpg",
            "name": "apple",
            "category": {
                "_id": "607051e3f4587500516bf199",
                "backgroundURL": "https://wallpaperaccess.com/full/249743.png",
                "createdBy": "607051e3f4587500516bf192",
                "name": "technology"
            },
            "createdBy": "607051e3f4587500516bf190",
            "createdAt": "2021-04-09T13:08:51.515Z"
        },
        "totalAttendance": 2
    },
    {
        "_id": "60707b8a167f3c00a143dbc3",
        "name": "testing_PATCH_event",
        "description": "testing new description",
        "location": "testing new loc",
        "startDate": "2021-08-12T00:00:00.000Z",
        "endDate": "2021-10-12T00:00:00.000Z",
        "fandom": {
            "_id": "607051e3f4587500516bf19f",
            "backgroundURL": "https://wallpapercave.com/wp/wp1826730.jpg",
            "name": "divergent",
            "category": {
                "_id": "607051e3f4587500516bf194",
                "backgroundURL": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80",
                "createdBy": "607051e3f4587500516bf192",
                "name": "books"
            },
            "createdBy": "607051e3f4587500516bf191",
            "createdAt": "2021-04-09T13:08:51.477Z"
        },
        "postedBy": {
            "profileURL": "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
            "username": "user1"
        },
        "totalAttendance": 0
    },
    {
        "_id": "607051e3f4587500516bf1b8",
        "name": "Anime-Fest",
        "description": "One-Punch Man is a Japanese superhero franchise created by the artist ONE. It tells the story of Saitama, a superhero who can defeat any opponent with a single punch but seeks to find a worthy opponent after growing bored by a lack of challenge due to his overwhelming strength.",
        "location": "New York City, New York, USA",
        "postedBy": {
            "profileURL": "https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg",
            "username": "user2"
        },
        "startDate": "2021-08-30T00:00:00.000Z",
        "endDate": "2021-09-01T00:00:00.000Z",
        "fandom": {
            "_id": "607051e3f4587500516bf1a7",
            "backgroundURL": "https://cdn.wallpapersafari.com/51/10/9A6JeS.jpg",
            "name": "one punch man",
            "category": {
                "_id": "607051e3f4587500516bf196",
                "backgroundURL": "https://cdn.wallpapersafari.com/28/72/eMnp5F.jpg",
                "createdBy": "607051e3f4587500516bf192",
                "name": "anime"
            },
            "createdBy": "607051e3f4587500516bf190",
            "createdAt": "2021-04-09T13:08:51.492Z"
        },
        "totalAttendance": 0
    },
    {
        "_id": "607051e3f4587500516bf1b9",
        "name": "FIFA World Cup Party",
        "description": "The FIFA World Cup, often simply called the World Cup, is an international association football competition contested by the senior men's national teams of the members of the Fédération Internationale de Football Association, the sport's global governing body.",
        "location": "Westminister, London, United Kingdom",
        "postedBy": {
            "profileURL": "https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg",
            "username": "user2"
        },
        "startDate": "2021-12-03T00:00:00.000Z",
        "endDate": "2021-12-08T00:00:00.000Z",
        "fandom": {
            "_id": "607051e3f4587500516bf1ae",
            "backgroundURL": "https://wallpapercave.com/wp/4dqP3rn.jpg",
            "name": "soccer",
            "category": {
                "_id": "607051e3f4587500516bf198",
                "backgroundURL": "https://wallpaperaccess.com/full/552032.jpg",
                "createdBy": "607051e3f4587500516bf192",
                "name": "sports"
            },
            "createdBy": "607051e3f4587500516bf190",
            "createdAt": "2021-04-09T13:08:51.507Z"
        },
        "totalAttendance": 1
    },
    {
        "_id": "607051e3f4587500516bf1ba",
        "name": "New HBO Show Press Release",
        "description": "Home Box Office is an American pay television network owned by WarnerMedia Studios & Networks and the flagship property of parent subsidiary Home Box Office, Inc.",
        "location": "Seattle, Washington, USA",
        "postedBy": {
            "profileURL": "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
            "username": "user1"
        },
        "startDate": "2022-01-10T00:00:00.000Z",
        "endDate": "2022-01-13T00:00:00.000Z",
        "fandom": {
            "_id": "607051e3f4587500516bf1a3",
            "backgroundURL": "https://cdn.wallpapersafari.com/26/33/Fbx3ci.jpg",
            "name": "game of thrones",
            "category": {
                "_id": "607051e3f4587500516bf195",
                "backgroundURL": "https://www.canvasandwall.co.za/wp-content/uploads/2020/04/TV-Background-3D-wallpaper.jpg",
                "createdBy": "607051e3f4587500516bf192",
                "name": "shows"
            },
            "createdBy": "607051e3f4587500516bf191",
            "createdAt": "2021-04-09T13:08:51.484Z"
        },
        "totalAttendance": 0
    }
]
 ```
</td>
</tr>
<tr>
<td> 
  
  `GET`
  
</td>
<td> 
  
  `/events/{categoryName}/{fandomName}` <br>
  Category and Fandom names must be seperated by dashes and not spaces, for example: _"harry potter"_ should be _"harry-potter"_.
</td> 
<td> 
  
  N/A 
  
</td>
<td> 
  
 ```json
[
    {
        "_id": "607051e3f4587500516bf1b4",
        "name": "World Expo",
        "description": "Our once-in-a-lifetime celebration – the largest event ever staged in the Arab world – is set to welcome 190 participating countries, and millions of visitors from across the globe. Here they will experience warm Emirati hospitality at its finest, as well as the UAE’s values of inclusion, tolerance and cooperation. Youth are at the heart of our World Expo. That’s why Expo 2020 aspires to create a meaningful legacy that will benefit generations to come, both locally and globally, spanning everything from innovations and architecture to friendships and business opportunities.",
        "location": "Dubai, UAE",
        "startDate": "2021-06-12T00:00:00.000Z",
        "endDate": "2021-06-14T00:00:00.000Z",
        "totalAttendance": 2
    }
]
 ``` 
 <br>
 Category: Technology, Fandom: Apple
</td>
</tr>
<tr>
<td> 
  
  `GET`
  
</td>
<td> 
  
  `/events/{eventId}` 
  
</td> 
<td> 
  
  N/A 
  
</td>
<td> 
  
 ```json
{
    "_id": "607051e3f4587500516bf1b4",
    "name": "World Expo",
    "description": "Our once-in-a-lifetime celebration – the largest event ever staged in the Arab world – is set to welcome 190 participating countries, and millions of visitors from across the globe. Here they will experience warm Emirati hospitality at its finest, as well as the UAE’s values of inclusion, tolerance and cooperation. Youth are at the heart of our World Expo. That’s why Expo 2020 aspires to create a meaningful legacy that will benefit generations to come, both locally and globally, spanning everything from innovations and architecture to friendships and business opportunities.",
    "location": "Dubai, UAE",
    "postedBy": {
        "profileURL": "https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg",
        "username": "user2"
    },
    "startDate": "2021-06-12T00:00:00.000Z",
    "endDate": "2021-06-14T00:00:00.000Z",
    "fandom": {
        "_id": "607051e3f4587500516bf1b1",
        "backgroundURL": "https://wallpapercave.com/wp/8duz5Ir.jpg",
        "name": "apple",
        "category": {
            "_id": "607051e3f4587500516bf199",
            "backgroundURL": "https://wallpaperaccess.com/full/249743.png",
            "createdBy": "607051e3f4587500516bf192",
            "name": "technology"
        },
        "createdBy": "607051e3f4587500516bf190",
        "createdAt": "2021-04-09T13:08:51.515Z"
    },
    "totalAttendance": 2
}
 ```

</td>
</tr>
</table>


### EVENT REVIEWS Endpoints
<table>
<tr>
<td> Method </td> <td> Route </td> <td> Body </td> <td> Response </td>
</tr>
<tr>
<td> 
  
  `POST`
  
</td> 
<td> 
  
  `/events/{eventId}/reviews` 
  
</td>
<td>
  
```json
{
    "title": "Testing_POST_review",
    "content": "Test adding review to event",
    "rating": 3,
    "event": "6064b6d3399a41013ef8ce98"
}
```
<br>
"event" takes in the event id (same as the event id in the URI) which is obtained from the database.
</td>
<td>
  
```json
{
    "review": {
        "_id": "607086b0167f3c00a143dbc4",
        "title": "Testing_POST_review",
        "content": "Test adding review to event",
        "rating": 3,
        "postedBy": {
            "profileURL": "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
            "username": "user1"
        },
        "createdAt": "2021-04-09T16:54:08.765Z",
        "updatedAt": "2021-04-09T16:54:08.765Z"
    },
    "reviewSummary": {
        "avgRating": 3,
        "totalRating": 3,
        "totalReviews": 1,
        "numOfEachRating": {
            "1": 0,
            "2": 0,
            "3": 1,
            "4": 0,
            "5": 0
        }
    }
}
```

</td>
</tr>
<tr>
<td> 
  
  `PATCH`

<td> 
  
  `/events/reviews/{reviewId}` 
  
</td>
<td>
  
```json
{
    "title": "Testing_PATCH_review",
    "content": "Test updating review",
    "rating": 5,
    "event": "6064b6d3399a41013ef8ce98"
}
```
<br>
"event" takes in the event id which is obtained from the database.

</td>
<td>
  
```json
{
    "updatedReview": {
        "_id": "607086b0167f3c00a143dbc4",
        "title": "Testing_PATCH_review",
        "content": "Test updating review",
        "rating": 5,
        "postedBy": {
            "profileURL": "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
            "username": "user1"
        },
        "createdAt": "2021-04-09T16:54:08.765Z",
        "updatedAt": "2021-04-09T16:56:40.126Z"
    },
    "updatedSummary": {
        "avgRating": 5,
        "totalRating": 5,
        "totalReviews": 1,
        "numOfEachRating": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 1
        }
    }
}
```

</td>
</tr>
<tr>
<td> 
  
  `DELETE`

<td> 
  
  `/event/reviews/{reviewId}` 

</td>
<td> N/A </td>
<td> 
  
```json
  {
    "avgRating": 0,
    "numOfEachRating": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
    }
}
```
  
</td>
</tr>
<tr>
<td> 
  
  `DELETE`

<td> 
  
  `/event/{eventId}/reviews` 

</td>
<td> N/A </td>
<td> 
  
Status code of `200`
  
</td>
</tr>
<tr>
<td> 
  
  `GET`
  
</td>
<td> 
  
  `/events/{eventId}/reviews` 
  
</td>
<td> N/A </td>
<td> 
  
 ```json
{
    "reviews": [
        {
            "_id": "607051e3f4587500516bf1bb",
            "title": "Great Event",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Congue nisi vitae suscipit tellus mauris a diam maecenas.",
            "rating": 4,
            "postedBy": {
                "profileURL": "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
                "username": "user1"
            },
            "createdAt": "2021-02-15T00:00:00.000Z",
            "updatedAt": "2021-02-15T00:00:00.000Z"
        },
        {
            "_id": "607051e3f4587500516bf1bc",
            "title": "Amazing, Lot's of fun",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Congue nisi vitae suscipit tellus mauris a diam maecenas.",
            "rating": 5,
            "postedBy": {
                "profileURL": "https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg",
                "username": "user2"
            },
            "createdAt": "2021-02-15T00:00:00.000Z",
            "updatedAt": "2021-02-15T00:00:00.000Z"
        }
    ],
    "summary": {
        "avgRating": 4.5,
        "totalRating": 9,
        "totalReviews": 2,
        "numOfEachRating": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 1,
            "5": 1
        }
    }
}
 ```
</td>
</tr>
</table>


### EVENT ATTENDANCE Endpoints
<table>
<tr>
<td> Method </td> <td> Route </td> <td> Body </td> <td> Response </td>
</tr>
<tr>
<td> 
  
  `POST`
  
</td> 
<td> 
  
  `/events/{eventId}/attends` 
  
</td>
<td>
  
```json
{
    "event": "60707b62167f3c00a143dbc2",
    "user": "607051e3f4587500516bf190"
}
```
<br>
"event" takes in the event id (same as the event id in the URI) which can be obtained from the database. <br>
"user" takes in the user id which can be obtained from the database.
</td>
<td>
  Status code of `200`
</td>
</tr>
<tr>
<td> 
  
  `DELETE`

<td> 
  
  `/event/attends/{attendeeId}` 

</td>
<td> N/A </td>
<td> 
  
Status code of `200`
  
</td>
</tr>
<tr>
<td> 
  
  `DELETE`

<td> 
  
  `/event/attends/{eventId}` 

</td>
<td> N/A </td>
<td> 
  
Status code of `200`
  
</td>
</tr>
<tr>
<td> 
  
  `GET`
  
</td>
<td> 
  
  `/events/{eventId}/is-attending` 
  <br>
  Returns a boolean variable if current signed in user is attending or not
</td>
<td> N/A </td>
<td> 
  
 ```json
true
 ```
</td>
</tr>
</table>
