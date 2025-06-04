import { Component, effect, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';

import moment from 'moment';
import { CardComponent } from '../card/card.component';
import { GeneralWeatherInfo } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-week',
  imports: [CardComponent, CommonModule],
  templateUrl: './week.component.html',
  styleUrl: './week.component.scss',
})
export class WeekComponent implements OnInit {
  generalWeatherInfo: GeneralWeatherInfo | undefined;
  cityName: string = '';

  constructor(private communicationService: CommunicationService) {
    effect(() => {
      this.generalWeatherInfo =
        this.communicationService.generalWeatherInfoData();

      this.cityName = this.communicationService.cityName();
    });
  }

  ngOnInit(): void {
    const startDate = moment().add(1, 'd').format('YYYY-MM-DD');
    const endDate = moment().add(7, 'd').format('YYYY-MM-DD');
    this.communicationService
      .getGeneralWeatherInfo(startDate, endDate)
      .subscribe();
  }
}
