import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  activeRoute: string = '';

  @ViewChild('toggleButton') toggleButton: ElementRef;

  constructor(private router: Router, private renderer: Renderer2) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });

    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        document
          .getElementById('navbarSupportedContent')!
          .classList.contains('show')
      ) {
        this.toggleButton.nativeElement.click();
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
