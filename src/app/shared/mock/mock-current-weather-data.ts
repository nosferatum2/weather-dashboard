import { CurrentWeatherModel } from '../services/weather-api/current-weather.model';

export const mockCurrentWeatherData: CurrentWeatherModel = JSON.parse(JSON.stringify({
  "coord": {
    "lon": 70.0735,
    "lat": 38.1067
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": -3.93,
    "feels_like": -8.77,
    "temp_min": -3.93,
    "temp_max": -3.93,
    "pressure": 1022,
    "humidity": 55,
    "sea_level": 1022,
    "grnd_level": 840
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.59,
    "deg": 101,
    "gust": 2.55
  },
  "clouds": {
    "all": 100
  },
  "dt": 1734619361,
  "sys": {
    "type": 1,
    "id": 8989,
    "country": "TJ",
    "sunrise": 1734575486,
    "sunset": 1734609739
  },
  "timezone": 18000,
  "id": 1221091,
  "name": "MOCK Mŭ’minobod",
  "cod": 200
}))
