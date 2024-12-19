import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { GeolocationInfoModel } from './geolocation-info.model';
import { SpinnerService } from '../spinner/spinner.service';
import { INPUT_AUTOCOMPLETE_LOADING_COMPONENT } from '../../../pages/weather-dashboard/components/input-autocomplete/input-autocomplete.component';

export const GEOCODING_BASE_PATH = '/geo/1.0/direct';

@Injectable({
  providedIn: 'root'
})
export class GeocodingAPIService {

  private readonly baseUrl = environment.BASE_API_URL;

  private httpClient = inject(HttpClient);
  private spinnerService = inject(SpinnerService);

  public getLocationByCityName(cityName: string): Observable<GeolocationInfoModel[]> {
    this.spinnerService.setLoading(true, INPUT_AUTOCOMPLETE_LOADING_COMPONENT);

    const params = {
      q: cityName,
      limit: 5 // without limit returns only first item
    }
    return this.httpClient.get<GeolocationInfoModel[]>(`${this.baseUrl}${GEOCODING_BASE_PATH}`, { params: params })
      .pipe(
        tap(() => this.spinnerService.setLoading(false, INPUT_AUTOCOMPLETE_LOADING_COMPONENT)),
      );
  }
}
