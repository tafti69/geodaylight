import { Component, OnInit } from '@angular/core';
import { ResultsService } from './results.service';
import { SummaryResult } from './summary-result.model';

@Component({
  selector: 'app-results-summary',
  templateUrl: './results-summary.component.html',
  styleUrls: ['./results-summary.component.scss'],
})
export class ResultsSummaryComponent implements OnInit {
  results: SummaryResult[] = [];
  isLoading = false;

  constructor(private resultService: ResultsService) {}

  ngOnInit(): void {
    this.getSummary();
  }

  getSummary() {
    this.isLoading = true;
    this.resultService
      .getSummaryResults()
      .subscribe((data: SummaryResult[]) => {
        this.isLoading = false;
        this.results = data;
      });
  }
}
