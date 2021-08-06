import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/customers/customer.model';
import { CustomerService } from 'src/app/customers/customer.service';
import { CustomerResultByDateRequest } from '../results-by-customer/cus-by-date-res.model';
import { CusResult } from '../results-by-customer/cus-result.model';
import { ResultByCustomerNameReq } from '../results-by-customer/res-by-cus-name-req.model';
import { ResultByCustomerName } from '../results-by-customer/res-by-cus-name.model';
import { ResultsService } from '../results-summary/results.service';

@Component({
  selector: 'app-results-by-photographers',
  templateUrl: './results-by-photographers.component.html',
  styleUrls: ['./results-by-photographers.component.scss'],
})
export class ResultsByPhotographersComponent implements OnInit {
  nameApply = false;
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
      this.resultService.getResultsByCustomerNamep(res).subscribe(
        (data: ResultByCustomerName[]) => {
          this.customerRes = data;
          this.isLoading = false;
        },
        (err: any) => console.log(err)
      );
    }
    console.log(this.routeArg);
  }

  handleCurrentResults(arg: string) {
    this.isLoading = true;
    this.resultService.getCurrentResultsp(arg).subscribe((data: CusResult) => {
      this.currentResults = data;
      this.isLoading = false;
      console.log(data);
    });
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
      this.resultService.getResultsByCustomerNamep(res).subscribe(
        (data: ResultByCustomerName[]) => {
          this.customerRes = data;
          this.isLoading = false;
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
    this.resultService.getResultsByDateRequestp(req).subscribe(
      (data: CusResult) => {
        this.currentResults = data;
        this.isLoading = false;
      },
      (err: any) => console.log(err)
    );
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
      this.resultService.getResultsByCustomerNamep(res).subscribe(
        (data: ResultByCustomerName[]) => {
          this.customerRes = data;
          this.isLoading = false;
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
    this.resultService.getResultsByDateRequestp(req).subscribe(
      (data: CusResult) => {
        this.currentResults = data;
        this.isLoading = false;
      },
      (err: any) => console.log(err)
    );
  }

  getCustomersAndPhotographers() {
    this.isLoading = true;
    this.customerServ.getAllPhotographers().subscribe(
      (data: Customer[]) => {
        this.photographers = data;
        this.isLoading = false;
      },
      (err: any) => console.log(err)
    );
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
