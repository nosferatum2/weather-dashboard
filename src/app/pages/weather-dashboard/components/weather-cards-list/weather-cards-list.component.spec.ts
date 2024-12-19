import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCardsListComponent } from './weather-cards-list.component';

describe('WeatherCardsListComponent', () => {
  let component: WeatherCardsListComponent;
  let fixture: ComponentFixture<WeatherCardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCardsListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WeatherCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
