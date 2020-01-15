import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PaymentService} from '../_services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  submitted: boolean;
  formProcess: boolean;
  message: string;
  paymentForm: FormGroup;

  constructor(private paymentService: PaymentService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      cardNumber : [null, Validators.required],
      expMonth : [null, Validators.required],
      expYear : [null, Validators.required],
      cvc : [null, [Validators.required, Validators.max(999), Validators.min(100)]]
    });
    this.submitted = false;
    this.formProcess = false;
  }

  chargeCreditCard() {
    this.submitted = true;
    console.log(this.paymentForm.controls);

    if (this.paymentForm.valid) {
      console.log(this.paymentForm.controls);
      (window as any).Stripe.card.createToken({
        number: this.paymentForm.controls.cardNumber.value.toString(),
        exp_month: this.paymentForm.controls.expMonth.value.toString(),
        exp_year: this.paymentForm.controls.expYear.value.toString(),
        cvc: this.paymentForm.controls.cvc.value
      }, (status: number, response: any) => {
        if (status === 200) {
          const token = response.id;
          this.chargeCard(token);
        } else {
          console.log(response);
        }
      });
    }
  }



  chargeCard(token: string) {
      let headers = new HttpHeaders();
      headers = headers.append('token', token);
      headers = headers.append('amount', '200');
      this.paymentService.doPayment(headers);
  }

  cancel() {

  }
}
