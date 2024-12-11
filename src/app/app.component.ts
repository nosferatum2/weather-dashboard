import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Example API URL
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d9a0985de8cb79a9c27c212214fe390f
// [{
//   'coord': { 'lon': 36.25, 'lat': 50 },
//   'weather': [{ 'id': 502, 'main': 'Rain', 'description': 'heavy intensity rain', 'icon': '10d' }],
//   'base': 'stations',
//   'main': {
//     'temp': 275.84,
//     'feels_like': 274.19,
//     'temp_min': 275.84,
//     'temp_max': 275.84,
//     'pressure': 1016,
//     'humidity': 96,
//     'sea_level': 1016,
//     'grnd_level': 997
//   },
//   'visibility': 10000,
//   'wind': { 'speed': 1.7, 'deg': 91, 'gust': 5.5 },
//   'rain': { '1h': 4.86 },
//   'clouds': { 'all': 100 },
//   'dt': 1733913899,
//   'sys': { 'country': 'UA', 'sunrise': 1733894624, 'sunset': 1733923993 },
//   'timezone': 7200,
//   'id': 706483,
//   'name': 'Kharkiv',
//   'cod': 200
// }]

// http://api.openweathermap.org/geo/1.0/direct?q=Zmiiv&appid=d9a0985de8cb79a9c27c212214fe390f
// [{
//   'name': 'Zmiiv',
//   'local_names': { 'en': 'Zmiiv', 'pl': 'Zmijiw', 'fr': 'Zmiïv', 'ru': 'Змиёв', 'uk': 'Зміїв', 'de': 'Smijiw' },
//   'lat': 49.6815177,
//   'lon': 36.354776,
//   'country': 'UA',
//   'state': 'Kharkiv Oblast'
// }]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-dashboard';
}
