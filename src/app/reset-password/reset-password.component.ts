import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {ErrorStateMatcher} from '@angular/material';
import {ResetpasswordService} from '../_services/resetpassword.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPwdLogin: FormGroup;
  email = '';
  error;
  matcher = new MyErrorStateMatcher();
  isLoading = false;
  response = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private resetPassword: ResetpasswordService) {
  }

  ngOnInit() {
    this.resetPwdLogin = this.formBuilder.group({
      email: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoading = true;
    this.resetPassword.resetPassword(form)
      .subscribe(res => {
          console.log(res);
        }, (err) => {
          console.log(err);
          this.error = true;
          this.isLoading = false;
          this.response = true;
        }, () => {
          this.isLoading = false;
          this.response = true;
        }
      );
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}
