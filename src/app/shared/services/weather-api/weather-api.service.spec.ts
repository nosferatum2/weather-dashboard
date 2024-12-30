import { TestBed } from '@angular/core/testing';

import { CURRENT_WEATHER_BASE_PATH, WeatherApiService } from './weather-api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { mockCurrentWeatherData } from '../../mock/mock-current-weather-data';
import { CoordModel } from '../../models/coord.model';
import { HttpErrorResponse, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CurrentWeatherModel } from './current-weather.model';

describe('WeatherApiService', () => {
  const BASE_API_URL: string = environment.BASE_API_URL;
  const CURRENT_WEATHER_PATH: string = CURRENT_WEATHER_BASE_PATH;
  const MOCK_COORDS: CoordModel = { lat: mockCurrentWeatherData.lat, lon: mockCurrentWeatherData.lon };
  const MOCK_WEATHER_RESPONSE: CurrentWeatherModel = mockCurrentWeatherData;
  let weatherApiService: WeatherApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [WeatherApiService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    weatherApiService = TestBed.inject(WeatherApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(weatherApiService).toBeTruthy();
  });

  describe('getCurrentWeather', () => {
    it('should call the API with correct parameters and return the weather data', () => {
      weatherApiService.getCurrentWeather(MOCK_COORDS).subscribe((data) => {
        expect(data).toEqual(MOCK_WEATHER_RESPONSE);
      });

      const req = httpMock.expectOne(
        `${BASE_API_URL}${CURRENT_WEATHER_PATH}?lat=${MOCK_COORDS.lat}&lon=${MOCK_COORDS.lon}&units=metric`
      );

      expect(req.request.method).toBe('GET');
      req.flush(MOCK_WEATHER_RESPONSE);
    });

    it('should handle errors gracefully', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'Test error',
        status: 500,
        statusText: 'Bad Request',
      });

      weatherApiService.getCurrentWeather(MOCK_COORDS).subscribe({
        next: () => fail('Expected an error, but got a successful response'),
        error: (err) => {
          expect(err).toBeInstanceOf(HttpErrorResponse);
        },
      });

      const req = httpMock.expectOne(
        `${BASE_API_URL}${CURRENT_WEATHER_PATH}?lat=${MOCK_COORDS.lat}&lon=${MOCK_COORDS.lon}&units=metric`
      );

      req.flush(errorResponse.error, { status: errorResponse.status, statusText: errorResponse.statusText });
    });
  });
});
