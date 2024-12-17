import { LocaleType } from '../../models/localeType';
import { CoordModel } from '../../models/coord.model';

export interface GeolocationInfoModel extends CoordModel {
  name: string
  lat: number
  lon: number
  local_names: LocaleType
  country: string
  state?: string
}
