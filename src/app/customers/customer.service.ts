import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Customer, CustomerKastil } from './customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  customerChanged = new Subject<Customer[]>();

  constructor(private http: HttpClient) {}

  createCustomer(customer: Customer): Observable<Customer[]> {
    return this.http.post<Customer[]>(
      'https://webapi.geodaylight.site/customers/CreateCustomer',
      customer
    );
  }

  customerExists(customer: Customer): Observable<boolean> {
    return this.http.post<boolean>(
      'https://webapi.geodaylight.site/customers/CustomerExists',
      customer
    );
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(
      `https://webapi.geodaylight.site/customers/GetCustomer/${id}`
    );
  }

  updateCustomer(updatedCustomer: Customer): Observable<void> {
    return this.http.put<void>(
      `https://webapi.geodaylight.site/customers/UpdateCustomer/${updatedCustomer.id}`,
      updatedCustomer,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(
      `https://webapi.geodaylight.site/customers/DeleteCustomer/${id}`
    );
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      'https://webapi.geodaylight.site/customers/GetAllCustomer'
    );
  }

  getAllPhotographers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      'https://webapi.geodaylight.site/customers/GetAllPhotographer'
    );
  }

  containSession(id: number): Observable<boolean> {
    return this.http.get<boolean>(
      `https://webapi.geodaylight.site/customers/candelete/${id}`
    );
  }
}
