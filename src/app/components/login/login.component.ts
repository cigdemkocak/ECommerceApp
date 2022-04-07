import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;
  constructor(private formBuilder: FormBuilder,     public router: Router, public authService: AuthService) { }
  
  ngOnInit() {
    this.createSignInForm();
  }

  createSignInForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      role:['', Validators.required]
      
    });
  }

  loginUser(): void {
    this.authService.logIn(this.loginForm.value);
  }


}


