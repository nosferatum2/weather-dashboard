import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { CurrentWeatherModel } from '../../../../shared/services/weather-api/current-weather.model';

@Component({
    selector: 'app-weather-cards-list',
    imports: [
        WeatherCardComponent
    ],
    templateUrl: './weather-cards-list.component.html',
    styleUrl: './weather-cards-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherCardsListComponent {

  cardsList = input.required<CurrentWeatherModel[]>();
  cardRemoved = output<number>()

  onCardRemove(id: number) {
    this.cardRemoved.emit(id)
  }
}
