# Voxloud Weather Dashboard

Voxloud Homework Assignment: Weather Dashboard

## Objective

Build a simple weather dashboard application that displays detailed weather information for multiple cities.

Deployed at: https://voxloud-weather.vercel.app/

---

## Features

- **Add Cities:** Enter a city name and add it to your dashboard.
- **Weather Cards:** Each city card displays:
  - City name
  - Current temperature
  - Weather condition (e.g., sunny, rainy)
  - Option to remove the city from the dashboard
  - Option to see forecast
- **Responsive Design:** Styled with CSS/Sass, works on all devices.
- **Loading Indicator:** Shows while fetching weather data and forecast data.
- **Error Handling:** Displays not found in autocomplete if a city is not found.
- **RxJS:** Used for API requests and data management.
- **Unit Tests:** Written with Jasmine/Karma for components.

### Optional Features

- **Persistence:** Cities are saved in service as well as localstorage and persist across page refreshes.
- **Forecast:** View the weather forecast for the next few hours for each city.
- **Animations:** Smooth UI animations for a better user experience.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Angular CLI](https://angular.dev/tools/cli) (v19+)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sehbanalam/voxloud-weather
   cd voxloud-weather
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **API Key Setup:**
   - This app uses the [OpenWeatherMap API](https://openweathermap.org/api).
   - Register for a free API key.
   - Create a file named `.env` in the project root and add:
     ```
     weatherApiKey: 'YOUR_API_KEY',
     ```
   - Alternatively, update `environment.ts` with your API key.

4. **Start the development server:**
   ```bash
   ng serve
   ```
   Open [http://localhost:4200](http://localhost:4200) in your browser.

---

## Scripts

- **Start Dev Server:**  
  `ng serve`
- **Build for Production:**  
  `ng build`
- **Run Unit Tests:**  
  `ng test`
- **Run End-to-End Tests:**  
  `ng e2e`

---

## Project Structure

```
voxloud-weather/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   └── components/
│   │   │       ├── footer/
│   │   │       ├── header/
│   │   │       ├── landing/
│   │   │       ├── not-found/
│   │   │       └── page-loader/
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   └── forecast/
│   │   │       ├── interfaces/
│   │   │       └── services/
│   │   │           └── forecast.service.ts
│   │   │       ├── forecast.component.ts
│   │   │       ├── forecast.component.html
│   │   │       ├── forecast.component.scss
│   │   │       └── forecast.component.spec.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.server.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   ├── environments/
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── index.html
│   ├── main.server.ts
│   ├── main.ts
│   ├── server.ts
│   └── styles.scss
├── angular.json                 # Angular CLI configuration
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

### Directory Details

- **core/components/**: Shared UI components (footer, header, landing, not-found, page-loader).
- **pages/dashboard/**: Dashboard page for listing and managing cities.
- **pages/forecast/**: Forecast page and related logic.
  - **interfaces/**: TypeScript interfaces for forecast data.
  - **services/**: Services for fetching forecast data.
- **app.component.\***: Root Angular component files.
- **environments/**: Environment-specific configuration.
- **styles.scss**: Global styles.

---

## Notes

- **API Usage:** Be mindful of OpenWeatherMap's free tier limits.
- **Testing:** Unit tests are located alongside their respective components/services.

---

## Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [RxJS Documentation](https://rxjs.dev/)

---

## License

This project is for educational purposes as part of the Voxloud Homework Assignment.
