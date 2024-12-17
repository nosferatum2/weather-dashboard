import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { GeolocationInfoModel } from './geolocation-info.model';

export const GEOCODING_BASE_PATH = '/geo/1.0/direct';

@Injectable({
  providedIn: 'root'
})
export class GeocodingAPIService {

  private readonly baseUrl = environment.BASE_API_URL;

  private httpClient = inject(HttpClient);

  public getLocationByCityName(cityName: string): Observable<GeolocationInfoModel[]> {
    const params = {
      q: cityName,
      limit: 5 // without limit returns only first item
    }
    return this.httpClient.get<GeolocationInfoModel[]>(`${this.baseUrl}${GEOCODING_BASE_PATH}`, { params: params });
  }
}
