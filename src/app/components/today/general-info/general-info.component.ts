import { Component, effect, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationService } from '../../../services/communication.service';
import { WeatherCode } from '../../../models';
import { WeatherCodeToStringPipe } from '../../../pipes/weather-code.pipe';
import { WeatherCodeToImagePipe } from '../../../pipes/weather-code.pipe';
import moment from 'moment';
import 'moment/locale/de';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { GoogleApiService } from '../../../services/google-api.service';

@Component({
  selector: 'app-general-info',
  imports: [CommonModule, WeatherCodeToStringPipe, WeatherCodeToImagePipe],
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss',
})
export class GeneralInfoComponent implements OnInit {
  currentDate: string = '';
  temperature: number | undefined = undefined;
  weatherCode: WeatherCode | undefined = WeatherCode.ClearSky;

  cityName: string = '';
  cityPhoto: string = '';

  @ViewChild('search') searchElementRef: any;

  constructor(
    public communicationService: CommunicationService,
    private googleApiService: GoogleApiService
  ) {
    toObservable(this.communicationService.geometricData)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (value) => {
          if (!value) return;
          this.fetchData();
        },
      });

    effect(() => {
      this.temperature =
        this.communicationService.generalWeatherInfoData()?.current?.temperature_2m;

      this.weatherCode =
        this.communicationService.generalWeatherInfoData()?.current?.weather_code;

      this.cityName = this.communicationService.cityName();

      if (this.googleApiService.placeResultData()?.utc_offset_minutes) {
        const formattedMoment = moment()
          .utc()
          .utcOffset(
            this.googleApiService.placeResultData()?.utc_offset_minutes! / 60
          );
        const datePart = formattedMoment.format('dddd, DD. MMMM YYYY');
        const timePart = formattedMoment.format('HH:mm [Uhr]');
        this.currentDate = datePart + '\n' + timePart;
      }
    });
  }

  ngOnInit(): void {
    moment.locale('de');

    const formattedMoment = moment();
    const datePart = formattedMoment.format('dddd, DD. MMMM YYYY');
    const timePart = formattedMoment.format('HH:mm [Uhr]');
    this.currentDate = datePart + '\n' + timePart;

    this.updateCurrentDate();
  }

  updateCurrentDate(): void {
    setInterval(() => {
      const formattedMoment = moment();
      const datePart = formattedMoment.format('dddd, DD. MMMM YYYY');
      const timePart = formattedMoment.format('HH:mm [Uhr]');
      this.currentDate = datePart + '\n' + timePart;
    }, 60000);
  }

  fetchData() {
    this.communicationService.getGeneralWeatherInfo().subscribe();
  }

  getCityPhotoUrl() {
    return this.communicationService.cityPhoto();
  }
}
