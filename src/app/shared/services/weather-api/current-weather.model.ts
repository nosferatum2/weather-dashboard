import { CoordModel } from '../../models/coord.model';
import { WeatherModel } from './weather.model';

export interface CurrentWeatherModel extends CoordModel{
  weather: WeatherModel[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust: number
  }
  rain?: {
    [kay: string]: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: Date
    sunset: Date
  }
  timezone: number
  id: number
  name: string
  cod: number
}
