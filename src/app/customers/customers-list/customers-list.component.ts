import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit {
  customers: Customer[] = [];
  isLoading = false;
  deleteMessage: string = '';
  imageSrc = '../../../assets/bxs-camera.svg';
  imageSrcNo = '../../../assets/bxs-camera-off.svg';
  imageSrcEmail = '../../../assets/bxs-envelope.svg';
  imageSrcFb = '../../../assets/fb.svg';
  imageSrcInsta = '../../../assets/insta.svg';
  imageSrcNoteOff = '../../../assets/Group 55.svg';
  imageSrcNote = '../../../assets/Vector.svg';

  constructor(private customerServ: CustomerService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.customerServ.getAllCustomers().subscribe((data: Customer[]) => {
      this.isLoading = false;
      this.customers = data;
      this.boolConverter();
      this.emailConverter();
      this.fbConverter();
      this.instaConverter();
      this.msgConverter();
    });
  }

  boolConverter(): void {
    this.customers.forEach((o) => {
      o.photograph
        ? (o.photographAnswer = this.imageSrc)
        : (o.photographAnswer = this.imageSrcNo);
    });
  }

  emailConverter(): void {
    this.customers.forEach((o) => {
      o.email ? (o.emailAnswer = this.imageSrcEmail) : (o.emailAnswer = '');
    });
  }

  fbConverter(): void {
    this.customers.forEach((o) => {
      o.fbName ? (o.fbAnswer = this.imageSrcFb) : (o.fbAnswer = '');
    });
  }

  instaConverter(): void {
    this.customers.forEach((o) => {
      o.instaName ? (o.instaAnswer = this.imageSrcInsta) : (o.instaAnswer = '');
    });
  }

  msgConverter(): void {
    this.customers.forEach((o) => {
      o.notes > 0
        ? (o.notesAnswer = this.imageSrcNote)
        : (o.notesAnswer = this.imageSrcNoteOff);
    });
  }

  onDeleteCustomer(id: number): void {
    this.customerServ.deleteCustomer(id).subscribe(
      (data: void) => {
        let index: number = this.customers.findIndex((c) => c.id === id);
        this.customers.splice(index, 1);
      },
      (err: any) => console.log(err)
    );
    this.deleteMessage = `Посетитель был успешно удален`;
    setTimeout(() => {
      this.deleteMessage = '';
    }, 1000);
  }
}
