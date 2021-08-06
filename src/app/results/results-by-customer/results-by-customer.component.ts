import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/customers/customer.model';
import { CustomerService } from 'src/app/customers/customer.service';
import { ResultsService } from '../results-summary/results.service';
import { CusResult } from './cus-result.model';
import { CustomerResultByDate } from './customer-result-by-date.model';
import { CustomerResultByDateRequest } from './cus-by-date-res.model';
import { ResultByCustomerName } from './res-by-cus-name.model';
import { ResultByCustomerNameReq } from './res-by-cus-name-req.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results-by-customer',
  templateUrl: './results-by-customer.component.html',
  styleUrls: ['./results-by-customer.component.scss'],
})
export class ResultsByCustomerComponent implements OnInit {
  nameApply = false;
  msgVisible = false;
  msg = '';
  currentResults: CusResult;
  customerRes: ResultByCustomerName[] = [];
  photographers: Customer[] = [];
  years: string[] = [];
  months: string[] = [];
  isLoading = false;
  routeArg: string;

  constructor(
    private resultService: ResultsService,
    private customerServ: CustomerService,
    private route: ActivatedRoute
  ) {}

  onSelectClient(value: any) {
    console.log(value);
  }

  ngOnInit(): void {
    this.getCustomersAndPhotographers();
    this.getYears();
    this.getMonths();
    this.routeArg = this.route.snapshot.params['name'];
    if (
      this.routeArg === '' ||
      this.routeArg === undefined ||
      this.routeArg === null
    ) {
      this.routeArg = 'Выбрать';
      this.handleCurrentResults('not');
    } else {
      const res = new ResultByCustomerNameReq();
      res.name = this.routeArg;
      res.filter = '';
      this.nameApply = true;
      this.isLoading = true;
      this.resultService.getResultsByCustomerName(res).subscribe(
        (data: ResultByCustomerName[]) => {
          this.customerRes = data;
          this.isLoading = false;
        },
        (err: any) => console.log(err)
      );
    }
    this.isLoading = false;
    console.log(this.isLoading);
    console.log(this.customerRes.length);
    console.log(this.msgVisible);
  }

  handleCurrentResults(arg: string) {
    this.isLoading = true;
    this.msgVisible = true;
    this.resultService.getCurrentResults(arg).subscribe((data: CusResult) => {
      this.currentResults = data;
      this.isLoading = false;
      this.msgVisible = false;
      this.msgVisible = this.currentResults.results.length > 0;
    });
    this.isLoading = false;
  }

  onSubmitSortHours(form: NgForm) {
    const value = form.value;
    const req = new CustomerResultByDateRequest();
    req.month = value.sortMonth;
    req.year = value.sortYear;
    this.nameApply = false;

    if (value.sortName !== 'Выбрать' && value.sortName !== '') {
      const res = new ResultByCustomerNameReq();
      res.name = value.sortName;
      res.filter = '';
      this.nameApply = true;
      this.isLoading = true;
      this.msgVisible = true;
      this.resultService.getResultsByCustomerName(res).subscribe(
        (data: ResultByCustomerName[]) => {
          this.customerRes = data;
          this.isLoading = false;
          if (data.length <= 0) {
            this.msgVisible = true;
          } else {
            this.msgVisible = false;
          }
          this.msg = 'Нет результатов по выбранным параметрам!';
        },
        (err: any) => console.log(err)
      );
      return;
    } else {
      this.nameApply = false;
    }

    if (value.sortMonth === 'Выбрать' || value.sortMonth === '') {
      req.month = '';
    }
    if (value.sortYear === 'Выбрать' || value.sortYear === '') {
      req.year = '';
    }
    if (req.month === '' && req.year === '') {
      this.handleCurrentResults('not');
      return;
    }
    this.isLoading = true;
    this.resultService.getResultsByDateRequest(req).subscribe(
      (data: CusResult) => {
        this.currentResults = data;
        this.isLoading = false;
        this.msgVisible = data.results.length > 0;
      },
      (err: any) => console.log(err)
    );
    this.isLoading = false;
  }

  onSubmitSortMoney(form: NgForm) {
    const value = form.value;
    const req = new CustomerResultByDateRequest();
    req.month = value.sortMonth;
    req.year = value.sortYear;
    req.filter = 'diagen';
    this.nameApply = false;
    if (value.sortName !== 'Выбрать' && value.sortName !== '') {
      const res = new ResultByCustomerNameReq();
      res.name = value.sortName;
      res.filter = 'diagen';
      this.nameApply = true;
      this.isLoading = true;
      this.resultService.getResultsByCustomerName(res).subscribe(
        (data: ResultByCustomerName[]) => {
          this.customerRes = data;
          this.isLoading = false;
          this.msgVisible = false;
          this.msgVisible = data.length > 0;
        },
        (err: any) => console.log(err)
      );
      return;
    } else {
      this.nameApply = false;
    }

    if (value.sortMonth === 'Выбрать' || value.sortMonth === '') {
      req.month = '';
    }
    if (value.sortYear === 'Выбрать' || value.sortYear === '') {
      req.year = '';
    }
    if (req.month === '' && req.year === '') {
      this.handleCurrentResults('filter');
      return;
    }

    this.isLoading = true;
    this.resultService.getResultsByDateRequest(req).subscribe(
      (data: CusResult) => {
        this.currentResults = data;
        this.isLoading = false;
        this.msgVisible = data.results.length > 0;
      },
      (err: any) => console.log(err)
    );
    this.isLoading = false;
  }

  getCustomersAndPhotographers() {
    this.isLoading = true;
    this.customerServ.getAllCustomers().subscribe(
      (data: Customer[]) => {
        this.photographers = data;
        this.isLoading = false;
      },
      (err: any) => console.log(err)
    );
    this.isLoading = false;
  }

  getYears(): void {
    this.resultService.getYears().subscribe(
      (data: string[]) => {
        this.years = data;
      },
      (err: any) => console.log(err)
    );
  }

  getMonths(): void {
    this.resultService.getMonths().subscribe(
      (data: string[]) => {
        this.months = data;
      },
      (err: any) => console.log(err)
    );
  }
}
