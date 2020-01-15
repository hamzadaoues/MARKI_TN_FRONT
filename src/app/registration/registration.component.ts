import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  error;
  name = '';
  username = '';
  email = '';
  password = '';
  isLoading = false;
  matcher = new MyErrorStateMatcher();
  response = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name : [null, Validators.required],
      username : [null, Validators.required],
      email : [null, Validators.required],
      password : [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoading = true;
    this.authService.register(form)
      .subscribe(res => {
        console.log(form);
      }, (err) => {
        console.log(err);
        alert(err.error);
        this.error = true;
        this.response = true;
      }, () => {
        this.isLoading = false;
        this.response = true;
      });
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}
