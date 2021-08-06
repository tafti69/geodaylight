import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer, CustomerKastil } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  postSuccess = false;
  successMessage = '';
  postError = false;
  errorMessage = '';
  existsClient = false;
  exists = '';
  validator: boolean;

  constructor(private customerServ: CustomerService) {}

  ngOnInit(): void {}

  onCreate(form: NgForm) {
    const value = form.value;
    const newCustomer = new Customer();

    newCustomer.name = value.name;
    newCustomer.nickName = value.nickName;
    newCustomer.compName = value.compName;
    newCustomer.mobile = value.mobile;
    newCustomer.instaName = value.instaName;
    newCustomer.fbName = value.fbName;
    newCustomer.email = value.email;
    newCustomer.photograph = value.photographer;

    if (value.photographer === null || value.photographer === '') {
      newCustomer.photograph = false;
    }

    if (form.valid) {
      this.customerServ.customerExists(newCustomer).subscribe(
        (data: boolean) => {
          if (data) {
            this.existsClient = true;
            this.exists = 'Посетитель с таким именем существует!';
            setTimeout(() => {
              this.existsClient = false;
            }, 1000);
          } else {
            this.customerServ.createCustomer(newCustomer).subscribe(
              (customer: Customer[]) => {
                this.customers.push(...customer);
              },
              (error: any) => console.log(error)
            );
            this.resetFormData(form);
            this.postSuccess = true;
            this.successMessage = 'Посетитель был успешно создан!';
            setTimeout(() => {
              window.location.reload();
            }, 800);
          }
        },
        (err: any) => console.log(err)
      );
    } else {
      this.handleError();
    }
  }

  resetFormData(form: NgForm) {
    form.resetForm();
  }

  handleError() {
    this.postSuccess = false;
    this.postError = true;
    this.errorMessage = 'Ошибка! Посетитель не был создан.';
    setTimeout(() => {
      this.postError = false;
    }, 3000);
  }
}
