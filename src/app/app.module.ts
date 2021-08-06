import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllSessionsComponent } from './sessions/all-sessions/all-sessions.component';
import { ClosedSessionsComponent } from './sessions/closed-sessions/closed-sessions.component';
import { CancelledSessionsComponent } from './sessions/cancelled-sessions/cancelled-sessions.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { ResultsSummaryComponent } from './results/results-summary/results-summary.component';
import { ResultsByCustomerComponent } from './results/results-by-customer/results-by-customer.component';
import { ResultsByServicesComponent } from './results/results-by-services/results-by-services.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditSessionComponent } from './sessions/edit-session/edit-session.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { TariffsComponent } from './tariffs/tariffs.component';
import { EditTariffComponent } from './tariffs/edit-tariff/edit-tariff.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PhoneFilterPipe } from './phone.pipe';
import { ResultsByPhotographersComponent } from './results/results-by-photographers/results-by-photographers.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    AllSessionsComponent,
    ClosedSessionsComponent,
    CancelledSessionsComponent,
    CustomersListComponent,
    ResultsSummaryComponent,
    ResultsByCustomerComponent,
    ResultsByServicesComponent,
    NotFoundComponent,
    SidebarComponent,
    EditSessionComponent,
    CustomerComponent,
    EditCustomerComponent,
    AuthComponent,
    TariffsComponent,
    EditTariffComponent,
    PhoneFilterPipe,
    ResultsByPhotographersComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
