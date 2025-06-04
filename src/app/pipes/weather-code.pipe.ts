import { Pipe, PipeTransform } from '@angular/core';
import { WeatherCode } from '../models';

@Pipe({
  name: 'weatherCodeToString',
  standalone: true,
})
export class WeatherCodeToStringPipe implements PipeTransform {
  transform(value: WeatherCode | undefined): string {
    switch (value) {
      case WeatherCode.ClearSky:
        return 'Klarer Himmel';
      case WeatherCode.MainlyClear:
        return 'Grösstenteils klar';
      case WeatherCode.PartlyCloudy:
        return 'Teilweise bewölkt';
      case WeatherCode.Overcast:
        return 'Bewölkt';
      case WeatherCode.Fog:
        return 'Nebel';
      case WeatherCode.DepositingRimeFog:
        return 'Raureifnebel';
      case WeatherCode.DrizzleLight:
        return 'Leichter Nieselregen';
      case WeatherCode.DrizzleModerate:
        return 'Mässiger Nieselregen';
      case WeatherCode.DrizzleDenseIntensity:
        return 'Dichter Nieselregen';
      case WeatherCode.FreezingDrizzleLight:
        return 'Leichter gefrierender Nieselregen';
      case WeatherCode.FreezingDrizzledenseIntensity:
        return 'Dichter gefrierender Nieselregen';
      case WeatherCode.RainSlight:
        return 'Leichter Regen';
      case WeatherCode.RainModerate:
        return 'Mässiger Regen';
      case WeatherCode.RainHeavyIntensity:
        return 'Starker Regen';
      case WeatherCode.FreezingRainLight:
        return 'Leichter gefrierender Regen';
      case WeatherCode.FreezingRainHeavyIntensity:
        return 'Starker gefrierender Regen';
      case WeatherCode.SnowFallSlight:
        return 'Leichter Schneefall';
      case WeatherCode.SnowFallModerate:
        return 'Mässiger Schneefall';
      case WeatherCode.SnowFallHeavyIntensity:
        return 'Starker Schneefall';
      case WeatherCode.SnowGrains:
        return 'Schneegriesel';
      case WeatherCode.RainShowersSlight:
        return 'Leichte Regenschauer';
      case WeatherCode.RainShowersModerate:
        return 'Mässige Regenschauer';
      case WeatherCode.RainShowersViolent:
        return 'Heftige Regenschauer';
      case WeatherCode.SnowShowersSlight:
        return 'Leichte Schneeschauer';
      case WeatherCode.SnowShowersHeavy:
        return 'Starke Schneeschauer';
      case WeatherCode.Thunderstorm:
        return 'Gewitter';
      case WeatherCode.ThunderstormSlight:
        return 'Leichtes Gewitter';
      case WeatherCode.ThunderstormHeavyHail:
        return 'Starkes Gewitter mit Hagel';

      default:
        return '';
    }
  }
}

@Pipe({
  name: 'weatherCodeToImage',
  standalone: true,
})
export class WeatherCodeToImagePipe implements PipeTransform {
  transform(value: WeatherCode | undefined): string {
    switch (value) {
      case WeatherCode.ClearSky:
      case WeatherCode.MainlyClear:
        return '../../../../assets/images/sun.png';

      case WeatherCode.PartlyCloudy:
        return '../../../../assets/images/cloudy-sun.png';

      case WeatherCode.Overcast:
        return '../../../../assets/images/cloudy.png';

      case WeatherCode.Fog:
      case WeatherCode.DepositingRimeFog:
        return '../../../../assets/images/fog.png';

      case WeatherCode.DrizzleLight:
      case WeatherCode.DrizzleModerate:
      case WeatherCode.DrizzleDenseIntensity:
      case WeatherCode.RainSlight:
      case WeatherCode.RainModerate:
      case WeatherCode.SnowGrains:
      case WeatherCode.RainShowersSlight:
      case WeatherCode.RainShowersModerate:
        return '../../../../assets/images/rainy-day-sun.png';

      case WeatherCode.FreezingDrizzleLight:
      case WeatherCode.FreezingDrizzledenseIntensity:
      case WeatherCode.FreezingRainLight:
      case WeatherCode.FreezingRainHeavyIntensity:
      case WeatherCode.SnowFallSlight:
      case WeatherCode.SnowFallModerate:
      case WeatherCode.SnowFallHeavyIntensity:

      case WeatherCode.SnowShowersSlight:
      case WeatherCode.SnowShowersHeavy:
        return '../../../../assets/images/snowy.png';

      case WeatherCode.RainHeavyIntensity:
      case WeatherCode.RainShowersViolent:
        return '../../../../assets/images/rainy-day.png';

      case WeatherCode.Thunderstorm:
      case WeatherCode.ThunderstormSlight:
      case WeatherCode.ThunderstormHeavyHail:
        return '../../../../assets/images/storm.png';
      default:
        return '../../../../assets/images/cloudy-sun.png';
    }
  }
}
