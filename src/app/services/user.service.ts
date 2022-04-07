import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable,  Subject,  } from 'rxjs';
import { EventEmitter,  Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { UserModel } from '../models/userform.model';

export const BASE_API_URL = 'http://localhost:3000/users';

@Injectable(
  {
    providedIn: 'root' 
  }
)
export class UserService {

  userListHandler: EventEmitter<User[]> = new EventEmitter<User[]>();
  users!: User[];
  
  userListSubject: Subject<User[]> = new Subject<User[]>(); 
  userListBehaviorSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {
    this.users = this.getUsers();
  }

  saveUser<T>(data: User | UserModel): Observable<T> {
    return this.http.post<any>(BASE_API_URL, data);
    
  }

  searchByFormControlKey<T>(formControlRef: any, requestOptions?: any): Observable<T> {
    let url = BASE_API_URL;
    let flag = false;

    if (formControlRef) {
      for (let [index, [key, value]] of Object.entries(formControlRef).entries()) {
        if (value) {
          if (index === 0) {
            url += '?';
            flag = true;
          } else {
            url += '&';
          }

          if (typeof value === 'object' && !Array.isArray(value)) {
            for (let [index, [keyRef, valueRef]] of Object.entries(value as any).entries()) {
              url += `${key}.${keyRef}=${valueRef}`
            }
            continue;
          }

          url += `${key}=${value}`
        }
      }
    }

    return this.http.get<T>(url);
  }
  
  getUsers(): User[] {
    return [
      new User("1", 'John', 'Doe', 'admin' ,'john@test.com'),
      new User('2', 'Alex', 'Doe', 'user' ,'alex@test.com'),

    ]
  }
  
  


}

