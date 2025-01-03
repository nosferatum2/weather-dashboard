import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef
} from '@angular/core';
import { CurrentWeatherModel } from '../../../../../../shared/services/weather-api/current-weather.model';
import { round } from '@popperjs/core/lib/utils/math';
import { environment } from '../../../../../../../environments/environment';
import { WeatherModel } from '../../../../../../shared/services/weather-api/weather.model';

export const IMAGE_BASE_PATH = '/img/wn';

@Component({
    selector: 'app-weather-card',
    imports: [],
    templateUrl: './weather-card.component.html',
    styleUrl: './weather-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherCardComponent {

  protected readonly round = round;
  private readonly domainUrl = environment.DOMAIN_URL;

  card: InputSignal<CurrentWeatherModel> = input.required<CurrentWeatherModel>()
  cardRemoved: OutputEmitterRef<number> = output<number>()

  iconUrl = computed((): string => this.buildIconUrl(this.card().weather))

  public cardRemove(id: number): void {
    this.cardRemoved.emit(id)
  }

  private buildIconUrl(weather: WeatherModel[]): string {
    return `${this.domainUrl}${IMAGE_BASE_PATH}/${weather[0].icon}@4x.png`
  }
}
