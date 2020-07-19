import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, LoginUser } from '../models/user.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // UserSubject = new Subject<User>();
  isConnected: boolean;
  user: User;
  isLoading: boolean = false;

  constructor(private client: HttpClient,
    private router: Router
    
  ) { }

  login(url : string, loginUser: LoginUser) : Observable<User> {
    this.client.post<User>(url, loginUser).subscribe(x => {
      this.user = x;
    });

    return this.client.post<User>(url, loginUser);
  }

  logout(){
    this.isConnected = false;
    // localStorage.connectedUser = null;
    // this.emitUser();
    // this.router.navigateByUrl("/login");
  }

  // emitUser(){

  //   console.log(localStorage.connectedUser);
  //   this.UserSubject.next(localStorage.connectedUser);
  // }
}
