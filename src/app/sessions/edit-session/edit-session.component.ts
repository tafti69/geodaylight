import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/customers/customer.model';
import { CustomerService } from 'src/app/customers/customer.service';
import { Tariffs } from 'src/app/tariffs/tariffs.model';
import { TariffService } from 'src/app/tariffs/tariffs.service';
import { PayTypesRu, Sessions } from '../session.model';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.scss'],
})
export class EditSessionComponent implements OnInit {
  sessions: Sessions = new Sessions();
  sessionsMassive: Sessions[];
  tariffPack: Tariffs[];
  paymentMethod = PayTypesRu;
  photographers: Customer[] = [];
  successMessage = '';
  success = false;
  deleteMessage: string = '';
  customers: Customer[] = [];
  postSuccess = false;
  postError = false;
  errorMessage = '';

  constructor(
    private sesServ: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private custServ: CustomerService,
    private tariffS: TariffService
  ) {}

  ngOnInit() {
    let sessionId = +this.route.snapshot.params['id'];
    this.sesServ.getSessionById(sessionId).subscribe(
      (data: Sessions) => {
        this.sessions = data;
      },
      (err: any) => console.log(err)
    );

    this.custServ
      .getAllCustomers()
      .subscribe((data: Customer[]) => (this.customers = data));

    this.custServ
      .getAllPhotographers()
      .subscribe((data: Customer[]) => (this.photographers = data));

    this.tariffS
      .getAllTariffs()
      .subscribe((data: Tariffs[]) => (this.tariffPack = data));
  }

  onDeleteSession(id: number): void {
    this.sesServ.deleteSession(id).subscribe(
      (data: void) => {
        let index: number = this.sessionsMassive.findIndex((s) => s.id === id);
        this.sessionsMassive.splice(index, 1);
      },
      (err: any) => console.log(err)
    );
    this.deleteMessage = `Сессия была успешно удалена`;
    setTimeout(() => {
      this.deleteMessage = '';
      this.router.navigate(['/all-sessions']);
    }, 700);
  }

  saveChanges(): void {
    this.sessions.userId = JSON.stringify(localStorage.getItem('id'));
    this.sesServ
      .updateSession(this.sessions)
      .subscribe((err: any) => console.log(err));
    this.success = true;
    this.successMessage = 'Сессия была успешно обновлена!';
    setTimeout(() => {
      this.router.navigate(['/all-sessions']);
    }, 500);
  }
}
