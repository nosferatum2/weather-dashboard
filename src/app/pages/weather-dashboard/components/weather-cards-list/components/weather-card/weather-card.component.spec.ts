import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMAGE_BASE_PATH, WeatherCardComponent } from './weather-card.component';
import { mockCurrentWeatherData } from '../../../../../../shared/mock/mock-current-weather-data';
import { WeatherModel } from '../../../../../../shared/services/weather-api/weather.model';
import { environment } from '../../../../../../../environments/environment';
import { CurrentWeatherModel } from '../../../../../../shared/services/weather-api/current-weather.model';

describe('WeatherCardComponent', () => {
  const MOCK_DATA_CARD: CurrentWeatherModel = mockCurrentWeatherData;
  const DOMAIN_URL: string = environment.DOMAIN_URL;
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WeatherCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('card', MOCK_DATA_CARD);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cardRemoved event when cardRemove is called', () => {
    const id = 1;
    spyOn(component.cardRemoved, 'emit');
    component.cardRemove(id);
    expect(component.cardRemoved.emit).toHaveBeenCalledWith(id);
  });

  it('should build and update iconUrl when card input changes', () => {
    const newWeather: WeatherModel[] = [MOCK_DATA_CARD.weather[0]];
    const builtUrl = `${DOMAIN_URL}${IMAGE_BASE_PATH}/${newWeather[0].icon}@4x.png`;

    fixture.detectChanges();
    expect(component.iconUrl()).toBe(builtUrl);
  });
});
