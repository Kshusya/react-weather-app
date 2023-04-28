import { CurrentWeather, DailyWeather } from "./WeatherInformation"

export default function (props: {currentWeather: CurrentWeather, dailyWeather: DailyWeather}) {
    return (
        <div>
            <h1>{props.currentWeather.temperature}°C</h1>
            <div>Feels like {props.currentWeather.apparentTemperature}°C</div>
            <div className="flex-center">
                <div>Min {props.dailyWeather.minTemperature}°C</div>
                <div>Max {props.dailyWeather.maxTemperature}°C</div>
            </div>
        </div>
    )
}