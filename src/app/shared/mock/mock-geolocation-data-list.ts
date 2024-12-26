import { GeolocationInfoModel } from '../services/geocoding-api/geolocation-info.model';

export const mockGeolocationDataList: GeolocationInfoModel[] = JSON.parse(
  JSON.stringify([
    {
      'name': 'MOCK1 asd',
      'lat': 38.106738500000006,
      'lon': 70.0734631418722,
      'country': 'TJ',
      'state': 'Khatlon Region'
    },
    {
      'name': 'MOCK2 Asaad',
      'local_names': {
        'ar': 'اسعد',
        'en': 'Asaad'
      },
      'lat': 30.09560195,
      'lon': 31.244734035806268,
      'country': 'EG',
      'state': 'Cairo'
    },
    {
      'name': 'MOCK3 As`ad',
      'local_names': {
        'en': 'As`ad',
        'ascii': 'As‘ad',
        'feature_name': 'As‘ad',
        'ar': 'أسعد'
      },
      'lat': 15.690128,
      'lon': 43.633634,
      'country': 'YE',
      'state': 'Hajjah Governorate'
    }
  ])
);
