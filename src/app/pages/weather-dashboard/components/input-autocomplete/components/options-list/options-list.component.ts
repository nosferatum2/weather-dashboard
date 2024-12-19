import { Component, input, output } from '@angular/core';
import { GeolocationInfoModel } from '../../../../../../shared/services/geocoding-api/geolocation-info.model';

@Component({
  selector: 'app-options-list',
  standalone: true,
  imports: [],
  templateUrl: './options-list.component.html',
  styleUrl: './options-list.component.scss'
})
export class OptionsListComponent {

  public dataOptionsInput = input.required<GeolocationInfoModel[]>();
  public optionSelected = output<GeolocationInfoModel>();

  protected readonly Boolean = Boolean;

  public selectOption(option: GeolocationInfoModel): void {
    this.optionSelected.emit(option);
  }

  public trackByCoord(option: GeolocationInfoModel): number {
    return option.lat + option.lon;
  }
}
