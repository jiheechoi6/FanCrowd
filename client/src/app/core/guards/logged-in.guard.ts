import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this._authService.currentUser.pipe(
      take(1),
      map((user) => {
        if(user && this._authService.checkTokenExpired()){
          return this._router.createUrlTree(['/users', user.username]);
        }else{
          return true;
        }

        // return user
        //   ? this._router.createUrlTree(['/users', user.username])
        //   : true;
      })
    );
  }
}
