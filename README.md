# Weather Dashboard

A simple weather dashboard application that displays detailed weather information for multiple cities.

## Setup Instructions

### Prerequisites

* Node.js (	^18.19.1 || ^20.11.1 || ^22.0.0 )
* Angular CLI ([version 19](https://angular.dev/installation))
* OpenWeatherMap API key (sign up for a free account
  at [https://openweathermap.org/api](https://openweathermap.org/api))

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/nosferatum2/weather-dashboard.git
    ```
2. Install dependencies: `npm install`
3. Create a new file named `environment.dev.ts`and `environment.ts` in the [src/environments]()(here you can find
   `environment.example.ts`) directory and add your
   OpenWeatherMap API key:

```typescript
export const environment = {
    production: false,

    DOMAIN_URL: 'https://openweathermap.org',
    BASE_API_URL: "https://api.openweathermap.org",

    /*
    * Your unique API key (you can always find it on your account page under the "API key" tab)
    * https://home.openweathermap.org/api_keys
    *  */
    API_KEY: "YOUR_OPENWEATHERMAP_API_KEY",
};
```

###### Replace YOUR_OPENWEATHERMAP_API_KEY with your actual API key.

#### Running the Application

Start the development server: `ng serve` or `npm run start`
Open your web browser and navigate to http://localhost:4200

#### API Keys Used

OpenWeatherMap API key: used to fetch weather data for cities. You can obtain a free API key by signing up for an
account at https://openweathermap.org/api.

## Requirements:

1. **Application Overview:**

- Create a simple weather dashboard that allows users to add multiple cities and view their current weather conditions.
- Each city's card should display:
    - City name
    - Current temperature
    - Weather condition (e.g., sunny, rainy)
    - Option to remove the city from the dashboard.

2. **Technical Requirements:**

- Use latest **Angular**
- Fetch weather data from a public API (e.g., OpenWeatherMap API).
- Implement the following features:
    - An input field to enter a city name and a button to add it to the dashboard.
    - A display of all added cities, each in its own card.
    - Use **RxJS** to handle API requests and manage the response data.
    - Implement a loading indicator while fetching data.
    - Implement error handling to manage cases where the city is not found.
- Style the dashboard using **CSS** or **Sass**, ensuring a responsive design.
  Using helper style libraries like Tailwind is allowed.
- Write unit tests for components and services using **Jasmine/Karma**.

3. **Additional Features (Optional):**

- Save the list of cities in local storage so that they persist across page refreshes.
- Allow users to view the forecast for the next few days for each city.
- Add some fancy animations

4. **Submission:**

- Use this repo as a starting point for your journey
- Host the code in a public repository (e.g., GitHub) and provide the link.
- Include a README file with setup instructions and details on any API keys used.
