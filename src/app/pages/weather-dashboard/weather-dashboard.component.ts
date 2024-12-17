import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { GeocodingAPIService } from '../../shared/services/geocoding-api/geocoding-api.service';
import { WeatherApiService } from '../../shared/services/weather-api/weather-api.service';
import { InputAutocompleteComponent } from './components/input-autocomplete/input-autocomplete.component';
import { map } from 'rxjs';
import { GeolocationInfoModel } from '../../shared/services/geocoding-api/geolocation-info.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WeatherCardsListComponent } from './components/weather-cards-list/weather-cards-list.component';
import { CurrentWeatherModel } from '../../shared/services/weather-api/current-weather.model';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [
    InputAutocompleteComponent,
    WeatherCardsListComponent
  ],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDashboardComponent {

  dataOptionsCities = signal<GeolocationInfoModel[]>([]);
  currentCitiesWeather = signal<CurrentWeatherModel[]>([]);

  private geocodingService = inject(GeocodingAPIService);
  private weatherApiService = inject(WeatherApiService);
  private destroyRef = inject(DestroyRef);

  onInputChange(inputValue: string | null) {
    if (inputValue === null) {
      this.dataOptionsCities.set([]);
      return
    }

    this.geocodingService.getLocationByCityName(inputValue)
      .pipe(
        map(val => this.dataOptionsCities.set(val)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  onOptionSelect(cityData: GeolocationInfoModel) {
    this.weatherApiService.getCurrentWeather({ lat: cityData.lat, lon: cityData.lon })
      .pipe(
        map(val => this.currentCitiesWeather.update(curr => [val, ...curr])),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
  }

  onCardRemove(cardId: number): void {
    this.currentCitiesWeather.update(
      (curr: CurrentWeatherModel[]): CurrentWeatherModel[] => curr.filter((card: CurrentWeatherModel) => card.id !== cardId))
  }
}
