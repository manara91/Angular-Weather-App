import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  activeRoute: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });
  }
  isActive(route: string): boolean {
    return this.activeRoute === route;
  }
  navigateToWeek() {
    this.router.navigate(['/week']);
  }

  navigateToMain() {
    this.router.navigate(['/']);
  }
}
