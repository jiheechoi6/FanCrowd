import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';
import { LoggedInGuard } from './core/services/logged-in.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupModule),
    canActivate: [LoggedInGuard],
  },
  {
    path: 'users/:username',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
    canActivate: [LoggedInGuard],
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./calendar/calendar.module').then((m) => m.CalendarModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'discussion-boards',
    loadChildren: () =>
      import('./discussion-board/discussion-board.module').then(
        (m) => m.DiscussionBoardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./events/events.module').then((m) => m.EventsModule),
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
