import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllSessionsComponent } from './sessions/all-sessions/all-sessions.component';
import { CancelledSessionsComponent } from './sessions/cancelled-sessions/cancelled-sessions.component';
import { ClosedSessionsComponent } from './sessions/closed-sessions/closed-sessions.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { ResultsByServicesComponent } from './results/results-by-services/results-by-services.component';
import { ResultsByCustomerComponent } from './results/results-by-customer/results-by-customer.component';
import { ResultsSummaryComponent } from './results/results-summary/results-summary.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditSessionComponent } from './sessions/edit-session/edit-session.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { TariffsComponent } from './tariffs/tariffs.component';
import { EditTariffComponent } from './tariffs/edit-tariff/edit-tariff.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ResultsByPhotographersComponent } from './results/results-by-photographers/results-by-photographers.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'all-sessions',
    component: AllSessionsComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'all-sessions', pathMatch: 'full' },
  {
    path: 'edit-session/:id',
    component: EditSessionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-customer',
    component: CustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers-list',
    component: CustomersListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-customer/:id',
    component: EditCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'closed-sessions',
    component: ClosedSessionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cancelled-sessions',
    component: CancelledSessionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'results-summary',
    component: ResultsSummaryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'results-by-customer',
    component: ResultsByCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'results-by-customer/:name',
    component: ResultsByCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'results-by-services',
    component: ResultsByServicesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'results-by-photographers',
    component: ResultsByPhotographersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'results-by-photographers/:name',
    component: ResultsByPhotographersComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'tariffs',
    component: TariffsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-tariff/:id',
    component: EditTariffComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'messages/:id',
    component: MessagesComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
