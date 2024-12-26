import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDashboardComponent } from './weather-dashboard.component';
import { CurrentWeatherModel } from '../../shared/services/weather-api/current-weather.model';
import { mockCurrentWeatherData } from '../../shared/mock/mock-current-weather-data';
import { GeolocationInfoModel } from '../../shared/services/geocoding-api/geolocation-info.model';
import { mockGeolocationDataList } from '../../shared/mock/mock-geolocation-data-list';
import { GeocodingAPIService } from '../../shared/services/geocoding-api/geocoding-api.service';
import { WeatherApiService } from '../../shared/services/weather-api/weather-api.service';
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';
import { of } from 'rxjs';

describe('WeatherDashboardComponent', () => {
  const MOCK_DATA_OPTIONS_CITIES: GeolocationInfoModel[] = mockGeolocationDataList;
  const MOCK_CURRENT_CITIES_WEATHER_LIST: CurrentWeatherModel[] = [mockCurrentWeatherData];
  let component: WeatherDashboardComponent;
  let fixture: ComponentFixture<WeatherDashboardComponent>;
  let geocodingServiceMock: jasmine.SpyObj<GeocodingAPIService>;
  let weatherApiServiceMock: jasmine.SpyObj<WeatherApiService>;
  let localStorageServiceMock: jasmine.SpyObj<LocalStorageService>;

  beforeEach(async () => {
    geocodingServiceMock = jasmine.createSpyObj('GeocodingAPIService', ['getLocationByCityName']);
    weatherApiServiceMock = jasmine.createSpyObj('WeatherApiService', ['getCurrentWeather']);
    localStorageServiceMock = jasmine.createSpyObj('LocalStorageService', ['getItem', 'setItem']);

    await TestBed.configureTestingModule({
      imports: [WeatherDashboardComponent],
      providers: [
        { provide: GeocodingAPIService, useValue: geocodingServiceMock },
        { provide: WeatherApiService, useValue: weatherApiServiceMock },
        { provide: LocalStorageService, useValue: localStorageServiceMock },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WeatherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInputChange', () => {
    it('should set dataOptionsCities to empty array when inputValue is null', () => {
      component.onInputChange(null);
      expect(component.dataOptionsCities()).toEqual([]);
    });

    it('should call geocodingService.getLocationByCityName when inputValue is not null', () => {
      const inputValue = MOCK_DATA_OPTIONS_CITIES[0].name;
      geocodingServiceMock.getLocationByCityName.and.returnValue(of(MOCK_DATA_OPTIONS_CITIES));
      component.onInputChange(inputValue);
      expect(geocodingServiceMock.getLocationByCityName).toHaveBeenCalledTimes(1);
      expect(geocodingServiceMock.getLocationByCityName).toHaveBeenCalledWith(inputValue);
    });
  });

  describe('onOptionSelect', () => {
    it('should call weatherApiService.getCurrentWeather when cityData is selected', () => {
      const cityData = MOCK_DATA_OPTIONS_CITIES[0];
      weatherApiServiceMock.getCurrentWeather.and.returnValue(of(MOCK_CURRENT_CITIES_WEATHER_LIST[0]));
      component.onOptionSelect(cityData);
      expect(weatherApiServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1);
      expect(weatherApiServiceMock.getCurrentWeather).toHaveBeenCalledWith({ lat: cityData.lat, lon: cityData.lon });
    });

    it('should add current weather to currentCitiesWeather when city is not already added', () => {
      const cityData = MOCK_DATA_OPTIONS_CITIES[0];
      const currentWeather = MOCK_CURRENT_CITIES_WEATHER_LIST[0];
      weatherApiServiceMock.getCurrentWeather.and.returnValue(of(currentWeather));
      component.onOptionSelect(cityData);
      expect(component.currentCitiesWeather()).toEqual([currentWeather]);
    });

    it('should not add current weather to currentCitiesWeather when city is already added', () => {
      const cityData = MOCK_DATA_OPTIONS_CITIES[0];
      const currentWeather = MOCK_CURRENT_CITIES_WEATHER_LIST[0];
      component.currentCitiesWeather.set([currentWeather]);
      weatherApiServiceMock.getCurrentWeather.and.returnValue(of(currentWeather));
      component.onOptionSelect(cityData);
      expect(component.currentCitiesWeather()).toEqual([currentWeather]);
    });
  });

  describe('onCardRemove', () => {
    it('should remove card from currentCitiesWeather when cardId is provided', () => {
      const currentWeather = MOCK_CURRENT_CITIES_WEATHER_LIST[0];
      component.currentCitiesWeather.set([currentWeather]);
      component.onCardRemove(currentWeather.id);
      expect(component.currentCitiesWeather()).toEqual([]);
    });
  });

  describe('init', () => {
    it('should set currentCitiesWeather to empty array when stored cities do not exist', () => {
      localStorageServiceMock.getItem.and.returnValue(null);

      component.ngOnInit();

      expect(component.currentCitiesWeather()).toEqual([]);
      expect(localStorageServiceMock.getItem).toHaveBeenCalledWith('currentCitiesWeatherList');
    });

    it('should set currentCitiesWeather to stored cities when stored cities exist', () => {
      const storedCities = JSON.stringify(MOCK_CURRENT_CITIES_WEATHER_LIST);
      localStorageServiceMock.getItem.and.returnValue(storedCities);

      component.ngOnInit();

      expect(component.currentCitiesWeather()).toEqual(JSON.parse(storedCities));
      expect(localStorageServiceMock.getItem).toHaveBeenCalledWith('currentCitiesWeatherList');
    });
  });

});
