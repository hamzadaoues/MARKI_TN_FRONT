import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import {NgxSpinnerService} from 'ngx-spinner';

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
  errorMessage: string;
  submitted: boolean;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail : [null, Validators.required],
      password : [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.spinner.show();
    this.isLoading = true;
    this.submitted = true;
    this.authService.login(form)
      .subscribe(res => {
        this.submitted = true;
        console.log(res);
        if (res.accessToken) {
          localStorage.setItem('token', res.accessToken);
        }
      }, (error) => {
        this.errorMessage = error.error.message;
        this.error = true;
        this.spinner.hide();
      }, () => {
        this.isLoading = false;
        this.spinner.hide();
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

