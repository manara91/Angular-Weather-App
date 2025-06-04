import { Component, effect, OnInit } from '@angular/core';
import { CommunicationService } from '../../../services/communication.service';
import { CommonModule } from '@angular/common';
import { NgxGaugeModule } from 'ngx-gauge';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import moment from 'moment';
import { GoogleApiService } from '../../../services/google-api.service';

@Component({
  selector: 'app-details-info',
  imports: [CommonModule, NgxGaugeModule],
  templateUrl: './details-info.component.html',
  styleUrl: './details-info.component.scss',
})
export class DetailsInfoComponent implements OnInit {
  lat: number | null = null;
  lng: number | null = null;

  wind_speed_10m: number | undefined = undefined;
  relative_humidity_2m: number | undefined = undefined;
  visibilityKm: number | undefined = undefined;
  uv_index: number | undefined = undefined;
  european_aqi: number | undefined = undefined;

  sunrise: string | undefined = undefined;
  sunset: string | undefined = undefined;

  aqiCategory: string = '';
  aqiColor: string = '';

  gaugeMarkers = {
    0: { color: 'transparent', type: 'line', size: 1, label: '0' },
    12: { color: 'transparent', type: 'line', size: 1, label: '12' },
  };

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
      this.wind_speed_10m =
        this.communicationService.generalWeatherInfoData()?.current?.wind_speed_10m;

      this.relative_humidity_2m =
        communicationService.generalWeatherInfoData()?.current?.relative_humidity_2m;

      const visibility =
        communicationService.generalWeatherInfoData()?.current?.visibility;

      this.visibilityKm =
        visibility !== undefined && typeof visibility === 'number'
          ? Math.round((visibility / 1000) * 10) / 10
          : 20;

      this.uv_index =
        communicationService.generalWeatherInfoData()?.daily?.uv_index_max[0];

      this.european_aqi =
        communicationService.airQualityInfoData()?.current?.european_aqi;
      this.updateAqiDisplay();

      if (
        communicationService.generalWeatherInfoData()?.daily?.sunrise[0] &&
        communicationService.generalWeatherInfoData()?.daily?.sunset[0]
      ) {
        this.sunrise = moment(
          communicationService.generalWeatherInfoData()?.daily?.sunrise[0]
        )
          .add(
            this.googleApiService.placeResultData()?.utc_offset_minutes
              ? this.googleApiService.placeResultData()?.utc_offset_minutes! /
                  60
              : 2,
            'h'
          )
          .format('HH:mm');
        this.sunset = moment(
          communicationService.generalWeatherInfoData()?.daily?.sunset[0]
        )
          .add(
            this.googleApiService.placeResultData()?.utc_offset_minutes
              ? this.googleApiService.placeResultData()?.utc_offset_minutes! /
                  60
              : 2,
            'h'
          )
          .format('HH:mm');
      }
    });
  }

  ngOnInit(): void {}

  fetchData() {
    this.communicationService.getAirQualityInfo().subscribe();
  }

  getGaugeForegroundColor(): string {
    switch (true) {
      case this.uv_index === undefined: {
        return 'black';
      }
      case this.uv_index! < 3: {
        return '#146814';
      }
      case this.uv_index! >= 3 && this.uv_index! < 6: {
        return '#FCE300';
      }
      case this.uv_index! >= 6 && this.uv_index! < 8: {
        return '#FF8200';
      }
      case this.uv_index! >= 8 && this.uv_index! < 11: {
        return '#a20000';
      }
      case this.uv_index! > 11: {
        return '#680168';
      }
      default: {
        return 'black';
      }
    }
  }

  updateAqiDisplay() {
    if (this.european_aqi! >= 0 && this.european_aqi! <= 50) {
      this.aqiCategory = 'Gut';
      this.aqiColor = '#146814';
    } else if (this.european_aqi! >= 51 && this.european_aqi! <= 100) {
      this.aqiCategory = 'Mäßig';
      this.aqiColor = '#FCE300';
    } else if (this.european_aqi! >= 101 && this.european_aqi! <= 150) {
      this.aqiCategory = 'Ungesund für empfindliche Gruppen';
      this.aqiColor = '#FF8200';
    } else if (this.european_aqi! >= 151 && this.european_aqi! <= 200) {
      this.aqiCategory = 'Ungesund';
      this.aqiColor = '#a20000';
    } else if (this.european_aqi! >= 201 && this.european_aqi! <= 300) {
      this.aqiCategory = 'Sehr ungesund';
      this.aqiColor = '#680168';
    } else if (this.european_aqi! >= 301 && this.european_aqi! <= 500) {
      this.aqiCategory = 'Gefährlich';
      this.aqiColor = '#7e0023';
    } else {
      this.aqiCategory = ' nicht verfügbar';
      this.aqiColor = '#808080';
    }
  }
}
