import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { GeocodingAPIService } from '../../shared/services/geocoding-api/geocoding-api.service';
import { WeatherApiService } from '../../shared/services/weather-api/weather-api.service';
import { InputAutocompleteComponent } from './components/input-autocomplete/input-autocomplete.component';
import { map, tap } from 'rxjs';
import { GeolocationInfoModel } from '../../shared/services/geocoding-api/geolocation-info.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WeatherCardsListComponent } from './components/weather-cards-list/weather-cards-list.component';
import { CurrentWeatherModel } from '../../shared/services/weather-api/current-weather.model';
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';

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
export class WeatherDashboardComponent implements OnInit {


  dataOptionsCities = signal<GeolocationInfoModel[]>([]);
  currentCitiesWeather = signal<CurrentWeatherModel[]>([]);

  private geocodingService = inject(GeocodingAPIService);
  private weatherApiService = inject(WeatherApiService);
  private localStorageService = inject(LocalStorageService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.init();
  }

  public onInputChange(inputValue: string | null) {
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

  public onOptionSelect(cityData: GeolocationInfoModel) {
    this.weatherApiService.getCurrentWeather({ lat: cityData.lat, lon: cityData.lon })
      .pipe(
        map(val => {
          if (this.currentCitiesWeather().some((card: CurrentWeatherModel) => card.id === val.id)) {
            // TODO: show pop-up 'City already added'
            return;
          }

          this.currentCitiesWeather.update(curr => [val, ...curr])
        }),
        tap(() => this.localStorageService.setItem('currentCitiesWeatherList', JSON.stringify(this.currentCitiesWeather()))),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
  }

  public onCardRemove(cardId: number): void {
    this.currentCitiesWeather.update(
      (curr: CurrentWeatherModel[]): CurrentWeatherModel[] => curr.filter((card: CurrentWeatherModel) => card.id !== cardId))

    this.localStorageService.setItem('currentCitiesWeatherList', JSON.stringify(this.currentCitiesWeather()));
  }

  private init() {
    const storedCities = this.localStorageService.getItem('currentCitiesWeatherList');

    if (storedCities) {
      this.currentCitiesWeather.set(JSON.parse(storedCities));
    }
  }
}
