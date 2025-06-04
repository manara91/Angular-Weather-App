import { Component, Input } from '@angular/core';
import moment from 'moment';
import { WeatherCodeToImagePipe } from '../../pipes/weather-code.pipe';

@Component({
  selector: 'app-card',
  imports: [WeatherCodeToImagePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  dateValue: string | undefined;
  @Input('date') set date(value: string | undefined) {
    this.dateValue = moment(value).format('ddd DD/MM');
  }
  @Input() weatherCode: number | undefined;
  @Input() minTemperature: number | undefined;
  @Input() maxTemperature: number | undefined;
}
