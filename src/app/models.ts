export interface GeneralWeatherInfo {
  current: CurrentGeneralWeatherInfo;
  daily: DailyGeneralWeatherInfo;
}

export interface DailyGeneralWeatherInfo {
  uv_index_max: number[];
  sunrise: { [key: number]: string };
  sunset: { [key: number]: string };
  weather_code: number[];
  time: { [key: number]: string };
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface CurrentGeneralWeatherInfo {
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
  visibility: number;
  uv_index_max: number[];
  european_aqi: number;
}

export enum WeatherCode {
  ClearSky = 0,
  MainlyClear = 1,
  PartlyCloudy = 2,
  Overcast = 3,
  Fog = 45,
  DepositingRimeFog = 48,
  DrizzleLight = 51,
  DrizzleModerate = 53,
  DrizzleDenseIntensity = 55,
  FreezingDrizzleLight = 56,
  FreezingDrizzledenseIntensity = 57,
  RainSlight = 61,
  RainModerate = 63,
  RainHeavyIntensity = 65,
  FreezingRainLight = 66,
  FreezingRainHeavyIntensity = 67,
  SnowFallSlight = 71,
  SnowFallModerate = 73,
  SnowFallHeavyIntensity = 75,
  SnowGrains = 77,
  RainShowersSlight = 80,
  RainShowersModerate = 81,
  RainShowersViolent = 82,
  SnowShowersSlight = 85,
  SnowShowersHeavy = 86,
  Thunderstorm = 95,
  ThunderstormSlight = 96,
  ThunderstormHeavyHail = 99,
}

export interface GeometricData {
  lat: number;
  lng: number;
}
