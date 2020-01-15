import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  usernameOrEmail = '';
  password = '';
  matcher = new MyErrorStateMatcher();
  isLoading = false;
  error = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail : [null, Validators.required],
      password : [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoading = true;
    this.authService.login(form)
      .subscribe(res => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      }, (err) => {
        console.log('error');
        this.error = true;
      }, () => {
        this.isLoading = false;
        this.router.navigate(['in-play']);
      });
  }

  register() {
    this.router.navigate(['register']);
  }
}
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

