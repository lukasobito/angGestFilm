import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, LoginUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user : FormGroup;
  public model: LoginUser;
  public connectedUser: User;
  public badLogin: string ;


  constructor(
    private builder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private client : HttpClient
  ) { 
  }

  ngOnInit() {
    this.connectedUser = new User();
    if(localStorage.getItem("connectedUser") != "null"){
      this.router.navigateByUrl('/home');
    }
    this.user = this.builder.group({
      login: ['', Validators.required],
      password: ['',Validators.required]
    });
  }

   loadItems(url: string){
    this.authService.login(url, this.model).subscribe(x => {
      this.connectedUser = x;
      // this.authService.emitUser();
      if(this.connectedUser == null){
        this.router.navigateByUrl('/login');
        this.badLogin = "Vous avez entré un mauvais login ou un mauvais mot de passe";
        console.log(this.badLogin);
      }else{
        this.authService.isConnected = true;
        this.router.navigateByUrl('/home');
      }
    });   
  }

  logForm(){
    this.model = {
      Login : this.user.get('login').value,
      Password : this.user.get('password').value
    };

    this.loadItems('http://localhost:53478/api/auth/login');
  }
}
