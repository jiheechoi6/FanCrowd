"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const auth_guard_1 = require("./core/guards/auth.guard");
const logged_in_guard_1 = require("./core/guards/logged-in.guard");
const login_component_1 = require("./login/login.component");
const routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent,
        canActivate: [logged_in_guard_1.LoggedInGuard],
    },
    {
        path: 'signup',
        loadChildren: () => Promise.resolve().then(() => __importStar(require('./signup/signup.module'))).then((m) => m.SignupModule),
        canActivate: [logged_in_guard_1.LoggedInGuard],
    },
    {
        path: 'forgot-password',
        loadChildren: () => Promise.resolve().then(() => __importStar(require('./forgot-password/forgot-password.module'))).then((m) => m.ForgotPasswordModule),
        canActivate: [logged_in_guard_1.LoggedInGuard],
    },
    {
        path: 'users/:username',
        loadChildren: () => Promise.resolve().then(() => __importStar(require('./user/user.module'))).then((m) => m.UserModule),
        canActivate: [auth_guard_1.AuthGuard],
    },
    {
        path: 'calendar',
        loadChildren: () => Promise.resolve().then(() => __importStar(require('./calendar/calendar.module'))).then((m) => m.CalendarModule),
        canActivate: [auth_guard_1.AuthGuard],
    },
    {
        path: 'fandoms',
        loadChildren: () => Promise.resolve().then(() => __importStar(require('./fandoms/fandoms.module'))).then((m) => m.FandomsModule),
        canActivate: [auth_guard_1.AuthGuard],
    },
    {
        path: 'events',
        loadChildren: () => Promise.resolve().then(() => __importStar(require('./events/events.module'))).then((m) => m.EventsModule),
        canActivate: [auth_guard_1.AuthGuard],
    },
    {
        path: '404',
        loadChildren: () => Promise.resolve().then(() => __importStar(require('./page-not-found/page-not-found.module'))).then((m) => m.PageNotFoundModule),
    },
    { path: '**', redirectTo: '404' },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule],
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
