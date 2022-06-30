import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService:AccountService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.currentUser$.pipe(
      map(auth=>{
        if(auth){
          return true
        }
        // if authentication is successful
        // we navigate to 'account/login'
        // and send the prev url from where we get the guard in queryParams
        // we get the prev url from the state
        this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}})
      })
    )
  }
  
}
