"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const core_1 = require("@angular/core");
let UserService = class UserService {
    constructor(_http) {
        this._http = _http;
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
    getUserByUsername(username) {
        // Get user from server, code below requires server call
        return this.users.find((user) => user.username === username) || null;
    }
    getUserEventsByUsername(username) {
        var _a;
        // Get User's events from server, code below requires server call
        return (((_a = this.users.find((user) => user.username === username)) === null || _a === void 0 ? void 0 : _a.attendingEvents) ||
            []);
    }
    deleteUserByUsername(username) {
        // Delete user from server, code below requires server call
    }
    banUserByUsername(username) {
        // Delete user from server, code below requires server call
    }
    updateUserByUsername(updatedUser, usernameBeforeUpdate) {
        // Update user info on server, code below requires server call
    }
    updateUserEventsByUsername(username, event) {
        // Update user info (Add event to events attending) on server,
        // code below requires server call
        let currentUser = this.users.find((user) => user.username === username);
        if (currentUser) {
            let index = currentUser.attendingEvents.findIndex((userEvent) => userEvent.id === event.id);
            if (index < 0) {
                currentUser.attendingEvents.push(event);
            }
        }
    }
    removeEventFromUserEvents(username, eventId) {
        // Update user info (remove event from events attending) on server,
        // code below requires server call
        let currentUser = this.users.find((user) => user.username === username);
        if (currentUser) {
            let eventIndex = currentUser.attendingEvents.findIndex((userEvent) => userEvent.id === eventId);
            if (eventIndex >= 0) {
                currentUser.attendingEvents.splice(eventIndex, 1);
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
    getUsernameNameMap() {
        let usermap = new Map();
        this.users.forEach((user) => {
            usermap.set(user.fullName, user.username);
        });
        return usermap;
    }
    getUserProfilePhotos() {
        let photos = new Map();
        this.users.forEach((user) => {
            photos.set(user.username, user.profileUrl);
        });
        return photos;
    }
    addFandomToUser(username, fandom) {
        //Add a fandom with id fandomId to Users fandoms, code below requires server call
        if (!fandom)
            return;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].username === username) {
                this.users[i].fandoms.push(this.convertFandomToFandomDTO(fandom));
            }
        }
    }
    convertFandomToFandomDTO(fandom) {
        const fandomDTO = {
            activityLevel: 0,
            category: fandom.category,
            id: fandom.id,
            name: fandom.name,
        };
        return fandomDTO;
    }
    removeFandomFromUser(username, fandomId) {
        //Remove a fandom with id fandomId from Users fandoms, code below requires server call
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].username === username) {
                for (let k = 0; k < this.users[i].fandoms.length; k++) {
                    this.users[i].fandoms = this.users[i].fandoms.filter((fandom) => fandom.id !== fandomId);
                }
            }
        }
    }
    hasUserJoinedFandom(username, fandomName) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].username === username) {
                for (let k = 0; k < this.users[i].fandoms.length; k++) {
                    if (this.users[i].fandoms[k].name.toLowerCase().split(' ').join('-') ===
                        fandomName) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
};
UserService = __decorate([
    core_1.Injectable({
        providedIn: 'root',
    })
], UserService);
exports.UserService = UserService;
