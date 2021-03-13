"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let AuthService = class AuthService {
    constructor(_http, _emailService, _userService) {
        this._http = _http;
        this._emailService = _emailService;
        this._userService = _userService;
        this.currentUser = new rxjs_1.BehaviorSubject(null);
        this.usernameToPassword = new Map([
            ['user1', 'user1'],
            ['user2', 'user2'],
            ['admin', 'admin'],
        ]);
        this.users = [
            {
                username: 'user1',
                fullName: 'Chandra Panta Chhetri',
                city: 'Toronto',
                country: 'Canada',
                email: 'chandra@gmail.com',
                profileUrl: 'https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg',
                role: 'user',
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                attendingEvents: [
                    {
                        name: 'Comic Con',
                        date: new Date(2021, 10, 12),
                        totalAttending: 2,
                        id: 1,
                    },
                    {
                        name: 'World Expo',
                        date: new Date(2021, 5, 12),
                        totalAttending: 2,
                        id: 2,
                    },
                    {
                        name: 'J.K Rowling Meet & Greet',
                        date: new Date(2021, 9, 12),
                        totalAttending: 3,
                        id: 5,
                    },
                    {
                        name: 'FIFA World Cup Party',
                        date: new Date(2021, 11, 3),
                        totalAttending: 1,
                        id: 7,
                    },
                ],
                fandoms: [
                    {
                        name: 'Avengers',
                        id: 1,
                        activityLevel: 5,
                        category: 'movies',
                    },
                    {
                        name: 'Harry Potter',
                        id: 2,
                        activityLevel: 2,
                        category: 'movies',
                    },
                    {
                        // Books Category
                        name: 'Percy Jackson',
                        id: 10,
                        activityLevel: 1,
                        category: 'books',
                    },
                    {
                        // Games Category
                        name: 'Call of Duty',
                        id: 20,
                        activityLevel: 4,
                        category: 'games',
                    },
                ],
            },
            {
                username: 'user2',
                fullName: 'Raj Patel',
                city: 'Toronto',
                country: 'Canada',
                email: 'raj@gmail.com',
                profileUrl: 'https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg',
                role: 'user',
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                attendingEvents: [
                    {
                        name: 'World Expo',
                        date: new Date(2021, 5, 12),
                        totalAttending: 2,
                        id: 2,
                    },
                ],
                fandoms: [
                    {
                        // Movies Category
                        name: 'Harry Potter',
                        id: 2,
                        activityLevel: 2,
                        category: 'movies',
                    },
                    {
                        // Sports Category
                        name: 'Basketball',
                        id: 25,
                        activityLevel: 3,
                        category: 'sports',
                    },
                    {
                        // Shows Category
                        name: 'The Big Bang Theory',
                        id: 14,
                        activityLevel: 5,
                        category: 'shows',
                    },
                ],
            },
            {
                username: 'admin',
                fullName: 'Jihee',
                city: 'Toronto',
                country: 'Canada',
                email: 'jihee@gmail.com',
                profileUrl: 'https://dummyimage.com/250.jpg',
                role: 'admin',
                bio: '',
                attendingEvents: [],
                fandoms: [],
            },
        ];
    }
    loginUser(username, password) {
        //API request to auth endpoint
        if (!this.usernameToPassword.has(username) ||
            this.usernameToPassword.get(username) !== password) {
            this.currentUser.next(null);
            return null;
        }
        let loggedInUser = null;
        for (let user of this.users) {
            if (user.username === username) {
                loggedInUser = user;
            }
        }
        this.currentUser.next(loggedInUser);
        return loggedInUser;
    }
    getCurrentUser() {
        return this.currentUser;
    }
    createNewUser(newUser) {
        //API request to users endpoint to create new user
        this.usernameToPassword.set(newUser.username, newUser.password);
        const newUserDTO = {
            username: newUser.username,
            fullName: newUser.fullName,
            email: newUser.email,
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            city: 'Toronto',
            country: 'Canada',
            role: 'user',
            fandoms: [],
            attendingEvents: [],
            profileUrl: 'https://dummyimage.com/250.jpg',
        };
        this.users.push(newUserDTO);
        this._userService.users.push(newUserDTO);
        this.currentUser.next(newUserDTO);
        return newUserDTO;
    }
    logOut() {
        this.currentUser.next(null);
    }
    autoLogin() { }
    resetPassword(emailVerficationCodeSentTo, newPassword, verficationCode) {
        //API request to reset password endpoint
        //Only change password for user with email emailVerficationCodeSentTo and matching verficationCode
        //Send password was recently changed email, once successfully changed
        this._emailService.sendPasswordChangedEmail(emailVerficationCodeSentTo);
    }
    getCurrentLoggedInUserEvents() {
        var _a;
        return (_a = this.currentUser.getValue()) === null || _a === void 0 ? void 0 : _a.attendingEvents;
    }
    updateUserEventsByUsername(username, event) {
        // Update user info (Add event to events attending) on server,
        // code below requires server call
        let user = this.currentUser.getValue();
        if (user) {
            let index = user.attendingEvents.findIndex((userEvent) => userEvent.id === event.id);
            if (index < 0) {
                user.attendingEvents.push(event);
            }
        }
    }
    removeEventFromUserEvents(username, eventId) {
        // Update user info (remove event from events attending) on server,
        // code below requires server call
        let user = this.currentUser.getValue();
        if (user) {
            let eventIndex = user.attendingEvents.findIndex((userEvent) => userEvent.id === eventId);
            if (eventIndex >= 0) {
                user.attendingEvents.splice(eventIndex, 1);
            }
        }
    }
    removeEventFromAllUsersEvents(eventId) {
        // Update user info (remove event from events attending) on server,
        // code below requires server call
        this.users.forEach((user) => {
            if (user) {
                let eventIndex = user.attendingEvents.findIndex((userEvent) => userEvent.id === eventId);
                if (eventIndex >= 0) {
                    user.attendingEvents.splice(eventIndex, 1);
                }
            }
        });
    }
};
AuthService = __decorate([
    core_1.Injectable({
        providedIn: 'root',
    })
], AuthService);
exports.AuthService = AuthService;
