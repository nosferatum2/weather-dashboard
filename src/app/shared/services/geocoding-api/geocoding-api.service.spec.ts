import { TestBed } from '@angular/core/testing';

import { GEOCODING_BASE_PATH, GeocodingAPIService } from './geocoding-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpinnerService } from '../spinner/spinner.service';
import { environment } from '../../../../environments/environment';
import { INPUT_AUTOCOMPLETE_LOADING_COMPONENT } from '../../../pages/weather-dashboard/components/input-autocomplete/input-autocomplete.component';
import { GeolocationInfoModel } from './geolocation-info.model';
import { mockGeolocationDataList } from '../../mock/mock-geolocation-data-list';
import { HttpErrorResponse } from '@angular/common/http';

describe('GeocodingAPIService', () => {
  const BASE_API_URL: string = environment.BASE_API_URL;
  const GEOCODING_PATH: string = GEOCODING_BASE_PATH;
  const MOCK_DATA_OPTIONS_CITIES: GeolocationInfoModel[] = mockGeolocationDataList;
  let httpMock: HttpTestingController;
  let geocodingServiceMock: GeocodingAPIService;
  let spinnerServiceSpyMock: jasmine.SpyObj<SpinnerService>;

  beforeEach(() => {
    spinnerServiceSpyMock = jasmine.createSpyObj('SpinnerService', ['setLoading']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GeocodingAPIService,
        { provide: SpinnerService, useValue: spinnerServiceSpyMock }
      ]
    });

    geocodingServiceMock = TestBed.inject(GeocodingAPIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(geocodingServiceMock).toBeTruthy();
  });

  it('should call the API with the correct parameters', () => {
    const cityName = 'asd';
    const expectedUrl = `${BASE_API_URL}${GEOCODING_PATH}?q=${cityName}&limit=5`;

    geocodingServiceMock.getLocationByCityName(cityName).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA_OPTIONS_CITIES);

    expect(spinnerServiceSpyMock.setLoading).toHaveBeenCalledWith(true, INPUT_AUTOCOMPLETE_LOADING_COMPONENT);
    expect(spinnerServiceSpyMock.setLoading).toHaveBeenCalledWith(false, INPUT_AUTOCOMPLETE_LOADING_COMPONENT);
  });

  it('should return the data from the API', () => {
    const cityName = 'asd';
    const expectedData: GeolocationInfoModel[] = MOCK_DATA_OPTIONS_CITIES;

    geocodingServiceMock.getLocationByCityName(cityName).subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne(`${BASE_API_URL}${GEOCODING_PATH}?q=${cityName}&limit=5`);
    req.flush(expectedData);

    expect(spinnerServiceSpyMock.setLoading).toHaveBeenCalledWith(true, INPUT_AUTOCOMPLETE_LOADING_COMPONENT);
    expect(spinnerServiceSpyMock.setLoading).toHaveBeenCalledWith(false, INPUT_AUTOCOMPLETE_LOADING_COMPONENT);
  });

  it('should handle errors from the API', () => {
    const cityName = ',';
    const errorResponse = new HttpErrorResponse({
      error: 'Test error',
      status: 400,
      statusText: 'Bad Request',
    });

    geocodingServiceMock.getLocationByCityName(cityName).subscribe({
      next: () => fail('Expected an error, but got a successful response'),
      error: (err) => {
        expect(err).toBeInstanceOf(HttpErrorResponse);
        spinnerServiceSpyMock.setLoading(false, INPUT_AUTOCOMPLETE_LOADING_COMPONENT);
      },
    });

    const req = httpMock.expectOne(`${BASE_API_URL}${GEOCODING_PATH}?q=${cityName}&limit=5`);
    req.flush(errorResponse.error, { status: errorResponse.status, statusText: errorResponse.statusText });

    expect(spinnerServiceSpyMock.setLoading).toHaveBeenCalledWith(true, INPUT_AUTOCOMPLETE_LOADING_COMPONENT);
    expect(spinnerServiceSpyMock.setLoading).toHaveBeenCalledWith(false, INPUT_AUTOCOMPLETE_LOADING_COMPONENT);
  });
});
