import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersDataService } from '../services/users-data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  constructor(
    private api: UsersDataService,
    private router: Router) { }
  canActivate() {
    if (this.api.isRoleAdmin())
      return true;
    else
      this.router.navigate(['/admin']);
    return false;
  }
  

  
}
