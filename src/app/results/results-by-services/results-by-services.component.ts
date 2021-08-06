import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerResultByDateRequest } from '../results-by-customer/cus-by-date-res.model';
import { ResultByCustomerNameReq } from '../results-by-customer/res-by-cus-name-req.model';
import { ResultsService } from '../results-summary/results.service';
import { PackResult } from './pack-result.model';
import { ResultByPackName } from './res-by-pack-name.model';

@Component({
  selector: 'app-results-by-services',
  templateUrl: './results-by-services.component.html',
  styleUrls: ['./results-by-services.component.scss'],
})
export class ResultsByServicesComponent implements OnInit {
  currentPackResults: PackResult;
  isLoading = false;
  packRes: ResultByPackName[] = [];
  years: string[] = [];
  months: string[] = [];
  services: string[] = [];
  nameApply = false;

  constructor(private resultService: ResultsService) {}

  ngOnInit(): void {
    this.handleCurrentPackResults('not');
    this.getYears();
    this.getMonths();
    this.getServices();
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
      this.nameApply = true;
      this.isLoading = true;
      this.resultService.getResultsByPackName(res).subscribe(
        (data: ResultByPackName[]) => {
          this.packRes = data;
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
      this.handleCurrentPackResults('not');
      return;
    }
    this.isLoading = true;
    this.resultService.getPackResultsByDateRequest(req).subscribe(
      (data: PackResult) => {
        this.currentPackResults = data;
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
      this.resultService.getResultsByPackName(res).subscribe(
        (data: ResultByPackName[]) => {
          this.packRes = data;
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
      this.handleCurrentPackResults('filter');
      return;
    }
    this.isLoading = true;
    this.resultService.getPackResultsByDateRequest(req).subscribe(
      (data: PackResult) => {
        this.currentPackResults = data;
        this.isLoading = false;
      },
      (err: any) => console.log(err)
    );
  }

  handleCurrentPackResults(arg: string) {
    this.isLoading = true;
    this.resultService
      .getCurrentPackResults(arg)
      .subscribe((data: PackResult) => {
        this.currentPackResults = data;
        this.isLoading = false;
      });
  }

  getServices() {
    this.isLoading = true;
    this.resultService.getServices().subscribe(
      (data: string[]) => {
        this.services = data;
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
