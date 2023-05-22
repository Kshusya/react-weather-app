import isDayTime from "../utils";
import WeatherInformation, { ForecastResponse } from "./WeatherInformation"
import { getImageByWeathercode } from "./WeathercodeElement"

export default function HourlyForecast(props: { weatherInfo: ForecastResponse }) {
    const currentHours = new Date().getHours()
    const futureForecast = props.weatherInfo.hourly.temperature_2m
        .slice(currentHours, currentHours + 10)
        .map((temperature, index) => {
            const time = props.weatherInfo.hourly.time[currentHours + index + 1].substring(11)
            const weathercode = props.weatherInfo.hourly.weathercode[currentHours + index + 1]
            return (
                <div className="future-forecast__column" key={index}>
                    <div>{time}</div>
                    <img src={`./static-icons/${getImageByWeathercode(currentHours + index + 1, weathercode)}.svg`} alt="weather icon" />
                    <div>{temperature}°C</div>
                </div>
            );
        });

    return (
        <div className="weather-info__future-block">
            <div className={`future-forecast ${isDayTime(currentHours) ? 'day' : 'night'}`}>
                {futureForecast}
            </div>
        </div>
    );
}