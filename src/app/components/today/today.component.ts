import { Component } from '@angular/core';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { DetailsInfoComponent } from './details-info/details-info.component';

@Component({
  selector: 'app-today',
  imports: [GeneralInfoComponent, DetailsInfoComponent],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss',
})
export class TodayComponent {}
