import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PaymentService} from '../_services/payment.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
declare var $: any;
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
  error = false;
  @Input()
  amount: number;

  constructor(private paymentService: PaymentService,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  ngOnInit() {
    this.error = false;
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
    this.spinner.show();
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
          this.deleteBetSheetFromSessionStorageAfterPayment();
        } else {
          this.deleteBetSheetFromSessionStorageAfterPayment();
          console.log(response);
        }
      });
      $('#modalRegisterForm').remove();
      $('.modal-backdrop').remove();
      this.spinner.hide();
      this.router.navigate(['/my-bet-sheets']);
    } else {
      this.error = true;
      console.log('payment not valid');
      this.spinner.hide();
    }
  }
  deleteBetSheetFromSessionStorageAfterPayment() {
    sessionStorage.clear();
  }



  chargeCard(token: string) {
      let headers = new HttpHeaders();
      headers = headers.append('token', token);
      headers = headers.append('amount', this.amount.toString());
      this.paymentService.doPayment(headers);
  }
  close() {
    console.log('close');
    $('#modalRegisterForm').hide();
    $('.modal-backdrop').hide();
  }
}
