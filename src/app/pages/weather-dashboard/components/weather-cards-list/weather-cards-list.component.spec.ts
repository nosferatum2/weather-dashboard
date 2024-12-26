import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCardsListComponent } from './weather-cards-list.component';
import { CurrentWeatherModel } from '../../../../shared/services/weather-api/current-weather.model';
import { mockCurrentWeatherData } from '../../../../shared/mock/mock-current-weather-data';

describe('WeatherCardsListComponent', () => {
  const MOCK_CARDS_LIST: CurrentWeatherModel[] = [mockCurrentWeatherData];
  let component: WeatherCardsListComponent;
  let fixture: ComponentFixture<WeatherCardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCardsListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WeatherCardsListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cardsList', MOCK_CARDS_LIST);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cardsList', () => {
    const cardsList = [mockCurrentWeatherData, mockCurrentWeatherData];
    fixture.componentRef.setInput('cardsList', cardsList);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('app-weather-card');
    expect(cards.length).toBe(cardsList.length);
  });

  it('should emit cardRemoved event when onCardRemove is called', () => {
    const id = MOCK_CARDS_LIST[0].id;
    spyOn(component.cardRemoved, 'emit');
    component.onCardRemove(id);
    expect(component.cardRemoved.emit).toHaveBeenCalledWith(id);
  });

});
