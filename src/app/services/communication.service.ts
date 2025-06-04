import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GeneralWeatherInfo, GeometricData } from '../models';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  generalWeatherInfoData = signal<GeneralWeatherInfo | undefined>(undefined);
  airQualityInfoData = signal<GeneralWeatherInfo | undefined>(undefined);
  geometricData = signal<GeometricData>({ lat: 52.52, lng: 13.405 });
  cityPhoto = signal<string>('../../../../assets/images/b.jpg');
  cityName = signal<string>('Berlin');

  constructor(private http: HttpClient) {}

  getGeneralWeatherInfo(
    startDate?: string,
    endDate?: string
  ): Observable<GeneralWeatherInfo> {
    let url =
      environment.apiMeteoUrl +
      'forecast?latitude=' +
      this.geometricData()!.lat +
      '&longitude=' +
      this.geometricData()!.lng +
      '&daily=temperature_2m_max,temperature_2m_min,uv_index_max,sunrise,sunset,weather_code&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,visibility';
    url =
      startDate && endDate
        ? url + '&start_date=' + startDate + '&end_date=' + endDate
        : url;

    return this.http
      .get<GeneralWeatherInfo>(url)
      .pipe(tap((result) => this.generalWeatherInfoData.set(result)));
  }

  getAirQualityInfo(): Observable<GeneralWeatherInfo> {
    const url =
      environment.apiAirQuUrl +
      'air-quality?latitude=' +
      this.geometricData()!.lat +
      '&longitude=' +
      this.geometricData()!.lng +
      '&current=european_aqi';

    return this.http
      .get<GeneralWeatherInfo>(url)
      .pipe(tap((result) => this.airQualityInfoData.set(result)));
  }
}
