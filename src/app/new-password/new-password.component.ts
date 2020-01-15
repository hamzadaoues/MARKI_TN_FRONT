import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ResetpasswordService} from '../_services/resetpassword.service';
import {ErrorStateMatcher} from '@angular/material';
import {NewPasswordDto} from './new-password-dto';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  password = '';
  error;
  disabled = false;
  matcher = new MyErrorStateMatcher();
  isLoading = false;
  response = false;
  passwordDto: NewPasswordDto;

  constructor(private formBuilder: FormBuilder, private router: Router, private resetPasswordService: ResetpasswordService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.newPasswordForm = this.formBuilder.group({
      password: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoading = true ;
    const token = this.route.snapshot.paramMap.get('token');
    this.passwordDto = new NewPasswordDto(this.password, token);
    console.log(this.newPasswordForm);
    this.resetPasswordService.newPassword(this.passwordDto)
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
          this.disabled = true;
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
