import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchComponent } from './search/search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NavBarComponent, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateToMain() {
    this.router.navigate(['/']);
  }
}
