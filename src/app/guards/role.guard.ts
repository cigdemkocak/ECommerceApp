import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private authService:AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return false;
      /*
      if(this.authService.getRole() == 'Admin'){
        this.router.navigate(['admin']);
        return true;
      }else{
        alert("You don't have admin")
        this.router.navigate(['login']);
        return false;

      }*/
      


    /*
    let Role =localStorage.getItem('role')
    console.log(Role)
    if(Role == "Admin"){
      this.router.navigate(['admin']);
      return true;
    }
    alert("You don't have admin")
    this.router.navigate(['login']);
    return false;
    */
   
  }
  
}
