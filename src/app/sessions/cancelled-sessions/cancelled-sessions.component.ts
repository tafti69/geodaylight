import { Component, OnInit } from '@angular/core';
import { Sessions } from '../session.model';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-cancelled-sessions',
  templateUrl: './cancelled-sessions.component.html',
  styleUrls: ['./cancelled-sessions.component.scss'],
})
export class CancelledSessionsComponent implements OnInit {
  canceled: Sessions[] = [];
  isLoading = false;

  constructor(private sesServ: SessionService) {}

  ngOnInit(): void {
    this.getCanceledSessions();
  }

  boolConverter(): void {
    this.canceled.forEach((o) => {
      o.pricePaid ? (o.priceAnswer = 'Да') : (o.priceAnswer = 'Нет');
      o.depositPaid ? (o.depositAnswer = 'Да') : (o.depositAnswer = 'Нет');
    });
  }

  getCanceledSessions() {
    this.isLoading = true;
    this.sesServ.getCanceledSessions().subscribe(
      (data: Sessions[]) => {
        this.isLoading = false;
        this.canceled = data;
        this.boolConverter();
      },
      (err: any) => console.log(err)
    );
  }
}
