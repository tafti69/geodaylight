import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/customers/customer.model';
import { CustomerService } from 'src/app/customers/customer.service';
import { Tariffs } from 'src/app/tariffs/tariffs.model';
import { TariffService } from 'src/app/tariffs/tariffs.service';
import { PackTypesRu, PayTypesRu, Sessions } from '../session.model';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-all-sessions',
  templateUrl: './all-sessions.component.html',
  styleUrls: ['./all-sessions.component.scss'],
})
export class AllSessionsComponent implements OnInit {
  sessions: Sessions[] = [];
  customers: Customer[] = [];
  tariffPack: Tariffs[];
  paymentMethod = PayTypesRu;
  photographers: Customer[] = [];
  isLoading = false;
  deleteMessage = '';
  postSuccess = false;
  successMessage = '';
  postError = false;
  errorMessage = '';
  succeded = false;

  constructor(
    private sessionService: SessionService,
    private datePipe: DatePipe,
    private customerS: CustomerService,
    private tariffS: TariffService
  ) {}

  boolConverter(): void {
    this.sessions.forEach((o) => {
      o.pricePaid ? (o.priceAnswer = 'Да') : (o.priceAnswer = 'Нет');
      o.depositPaid ? (o.depositAnswer = 'Да') : (o.depositAnswer = 'Нет');
    });
  }

  ngOnInit(): void {
    this.refreshList();
    this.customerS
      .getAllPhotographers()
      .subscribe((data: Customer[]) => (this.photographers = data));
    this.customerS
      .getAllCustomers()
      .subscribe((data: Customer[]) => (this.customers = data));
    this.tariffS
      .getAllTariffs()
      .subscribe((data: Tariffs[]) => (this.tariffPack = data));
  }

  refreshList() {
    this.isLoading = true;
    this.sessionService.getOpenSessions().subscribe((data: Sessions[]) => {
      this.isLoading = false;
      this.sessions = data;
      this.boolConverter();
    });
  }

  onCreateSession(form: NgForm) {
    const value = form.value;
    value.date = this.datePipe.transform(value.date, 'yyyy-MM-dd');
    const newSession = new Sessions();
    newSession.date = value.date;
    newSession.start = value.start.toString();
    newSession.finish = value.finish.toString();
    newSession.deposit = value.deposit;
    newSession.customerName = value.customerName;
    newSession.photographerName = value.photographerName;
    newSession.packType = value.packType;
    newSession.payType = value.payType;
    newSession.depositPaid = value.depositPaid;
    newSession.pricePaid = value.pricePaid;
    newSession.price = value.price;
    newSession.userId = JSON.stringify(localStorage.getItem('id'));

    if (value.depositPaid === '' || value.depositPaid === null) {
      newSession.depositPaid = false;
    }

    if (value.pricePaid === '' || value.pricePaid === null) {
      newSession.pricePaid = false;
    }

    if (value.deposit === null || value.deposit === '' || value.deposit < 0) {
      newSession.deposit = 0;
    }

    if (value.price === null || value.price === '' || value.price < 0) {
      newSession.price = 0;
    }

    if (form.valid) {
      this.sessionService.createSession(newSession, this.succeded).subscribe(
        (session: Sessions[]) => {
          this.sessions.push(...session);
        },
        (err: any) => console.log(err)
      );
      this.postSuccess = true;
      this.successMessage = 'Сессия была успешно создана!';
      setTimeout(() => {
        window.location.reload();
      }, 700);
      this.resetFormData(form);
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
    this.errorMessage = 'Ошибка! Сессия не создана.';
    setTimeout(() => {
      this.postError = false;
    }, 2000);
  }
}
