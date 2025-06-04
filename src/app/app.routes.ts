import { Routes } from '@angular/router';
import { TodayComponent } from './components/today/today.component';
import { WeekComponent } from './components/week/week.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TodayComponent,
  },
  {
    path: 'week',
    component: WeekComponent,
  },
];
