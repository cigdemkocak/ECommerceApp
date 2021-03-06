import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.creteSignUpForm();
  }

  creteSignUpForm(): void {
    this.signupForm = this.fb.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      role: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    });
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res: any) => {
      if (res) {
        this.signupForm.reset();
        this.router.navigate(['login']);
      }
    });
  }
}



