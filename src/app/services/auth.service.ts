import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserModel } from './../models/userform.model';
import { Observable, throwError } from 'rxjs';
import { UserService } from './user.service';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable(
  { providedIn: 'root' }
)
export class AuthService {
  currentUser: UserModel = {
    id: '',
    name: '',
    surname: '',
    role:'',
    email: '',
    password: '',
    token: '',
  };


  constructor(private router: Router, private userService: UserService) { }

  signUp(user: UserModel): Observable<any> {
    return this.userService.saveUser<UserModel>(user).pipe(catchError(this.handleError))
  }

  logIn(logInData: any) {
    return this.userService.searchByFormControlKey<UserModel[]>(logInData).subscribe((user: UserModel[]) => {
      console.log(user);
      localStorage.setItem('access_token', user[0].token);
      localStorage.setItem('role',user[0].role); 
      const jsonFormattedData = JSON.stringify(user);
      localStorage.setItem('UserData', jsonFormattedData )
      this.currentUser = user[0];
      if(user[0].role === 'User'){
        this.router.navigate(['products'])
      }else if(user[0].role === 'Admin'){
        this.router.navigate(['admin'])
      }
      
      
    })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
  /*
  getRole(){
    return localStorage.getItem('role');

  }
  */


  get isLoggedIn(): boolean {
    let authToken = this.getToken();
    return authToken !== null ? true : false;
  }

  logout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  handleError(error: HttpErrorResponse) {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else {
      message = `Error Code: ${error.status} \n Error Message: ${error.message}`
    }

    return throwError(message);
  }
}
