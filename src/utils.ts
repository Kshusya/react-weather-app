export default function isDayTime(hours: number): boolean {
    return hours >= 7 && hours <= 18
}

// import { DailyWeather } from "./components/WeatherInformation";

// export default function isDayTime(hours: number, dailyWeather: DailyWeather): boolean {
//   const sunrise = Number.parseFloat(dailyWeather.sunrise);
//   const sunset = Number.parseFloat(dailyWeather.sunset);
//   return sunrise < hours && hours < sunset;
// }
