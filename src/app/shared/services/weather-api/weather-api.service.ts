import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CoordModel } from '../../models/coord.model';
import { CurrentWeatherModel } from './current-weather.model';

export const CURRENT_WEATHER_BASE_PATH = '/data/2.5/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  private readonly baseUrl = environment.BASE_API_URL;

  private httpClient = inject(HttpClient);

  getCurrentWeather(coords: CoordModel): Observable<CurrentWeatherModel> {
    const params = {
      ...coords,
      units: 'metric'
    }

    return this.httpClient.get<CurrentWeatherModel>(`${this.baseUrl}${CURRENT_WEATHER_BASE_PATH}`, { params: params });
  }

}
