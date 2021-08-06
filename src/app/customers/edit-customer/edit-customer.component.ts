import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit {
  selectedCustomer: Customer;
  customer: Customer[];
  successMessage = '';
  success = false;
  deleteMessage: string = '';
  existsClient = false;
  exists = '';
  validator: boolean;
  containSessions = false;
  contains = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerServ: CustomerService
  ) {}

  ngOnInit(): void {
    let customerId = +this.route.snapshot.params['id'];
    this.customerServ.getCustomerById(customerId).subscribe(
      (data: Customer) => {
        this.selectedCustomer = data;
      },
      (err: any) => console.log(err)
    );
  }

  onDeleteCustomer(id: number): void {
    this.customerServ.containSession(id).subscribe(
      (data: boolean) => {
        if (data) {
          this.containSessions = true;
          this.contains =
            'Посетитель не может быть удалён, так как зарегистрирован в сессиях!';
          setTimeout(() => {
            this.containSessions = false;
          }, 1000);
        } else {
          this.customerServ.deleteCustomer(id).subscribe((data: void) => {
            let index: number = this.customer.findIndex((c) => c.id === id);
            this.customer.splice(index, 1);
          });
          this.deleteMessage = `Посетитель был успешно удален`;
          setTimeout(() => {
            this.deleteMessage = '';
            this.router.navigate(['/customers-list']);
          }, 1000);
        }
      },
      (err: any) => console.log(err)
    );
  }

  saveUpdate(): void {
    this.customerServ
      .customerExists(this.selectedCustomer)
      .subscribe((data: boolean) => {
        if (data) {
          this.existsClient = true;
          this.exists = 'Посетитель с таким именем существует!';
          setTimeout(() => {
            this.existsClient = false;
          }, 1000);
        } else {
          this.customerServ.updateCustomer(this.selectedCustomer).subscribe(
            () => {
              this.success = true;
              this.successMessage = 'Посетитель был успешно обновлен!';
              setTimeout(() => {
                this.successMessage = '';
                this.router.navigate(['/customers-list']);
              }, 1000);
            },
            (err: any) => console.log(err)
          );
        }
      });
  }
}
