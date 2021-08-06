import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuth = false;
  empty = '';

  constructor(private authService: AuthService) {}
  isNavOpened = false;
  collapse = false;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuth = !!user;
    });
  }

  onLogout() {
    this.authService.logout();
    this.isAuth = false;
    localStorage.clear();
  }

  toggleCollapse(): void {
    this.collapse = !this.collapse;
    this.isNavOpened = true;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.authService.logout();
    localStorage.clear();
  }
}
