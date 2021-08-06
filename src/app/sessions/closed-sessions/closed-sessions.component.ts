import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/customers/customer.model';
import { CustomerService } from 'src/app/customers/customer.service';
import { DateRequest } from '../date-request.model';
import { Sessions } from '../session.model';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-closed-sessions',
  templateUrl: './closed-sessions.component.html',
  styleUrls: ['./closed-sessions.component.scss'],
})
export class ClosedSessionsComponent implements OnInit {
  closed: Sessions[] = [];
  isLoading = false;
  dates: string[] = [];
  customers: Customer[] = [];
  photographers: Customer[] = [];

  constructor(
    private sesServ: SessionService,
    private customerServ: CustomerService
  ) {}

  ngOnInit(): void {
    this.getClosedSessions();
    this.getDates();
    this.getCustomersAndPhotographers();
  }

  onSubmitSort(form: NgForm) {
    const value = form.value;
    const dateRequest = new DateRequest();
    console.log(value.sortDate);
    const splitted = value.sortDate.split('-');
    dateRequest.month = splitted[1];
    dateRequest.year = splitted[0];
    dateRequest.customerName = value.sortClient;
    dateRequest.photographerName = value.sortPhoto;

    if (value.sortDate === 'Выбрать') {
      dateRequest.year = '';
      dateRequest.month = '';
    }
    if (value.sortClient === 'Выбрать') {
      dateRequest.customerName = '';
    }
    if (value.sortPhoto === 'Выбрать') {
      dateRequest.photographerName = '';
    }
    this.sesServ.getSessionsByDate(dateRequest).subscribe(
      (data: Sessions[]) => {
        this.closed = data;
        console.log(data);
      },
      (err: any) => console.log(err)
    );
  }

  onChange(value: string) {
    if (value === 'Выбрать') {
      this.getClosedSessions();
      return;
    }
    const dateRequest = new DateRequest();
    const splitted = value.split('-');
    dateRequest.month = splitted[1];
    dateRequest.year = splitted[0];
    this.sesServ.getSessionsByDate(dateRequest).subscribe(
      (data: Sessions[]) => {
        this.closed = data;
      },
      (err: any) => console.log(err)
    );
  }

  getCustomersAndPhotographers() {
    this.customerServ.getAllCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
      },
      (err: any) => console.log(err)
    );
    this.customerServ.getAllPhotographers().subscribe(
      (data: Customer[]) => {
        this.photographers = data;
      },
      (err: any) => console.log(err)
    );
  }

  getDates(): void {
    this.sesServ.getDate().subscribe(
      (data: string[]) => {
        this.dates = data;
      },
      (err: any) => console.log(err)
    );
  }

  boolConverter(): void {
    this.closed.forEach((o) => {
      o.pricePaid ? (o.priceAnswer = 'Да') : (o.priceAnswer = 'Нет');
      o.depositPaid ? (o.depositAnswer = 'Да') : (o.depositAnswer = 'Нет');
    });
  }

  getClosedSessions() {
    this.isLoading = true;
    this.sesServ.getCurrentClosedSessions().subscribe(
      (data: Sessions[]) => {
        this.isLoading = false;
        this.closed = data;
        this.boolConverter();
      },
      (err: any) => console.log(err)
    );
  }
}
