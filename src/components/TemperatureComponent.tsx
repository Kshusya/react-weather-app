import { CurrentWeather, DailyWeather } from "./WeatherInformation"

export default function (props: {currentWeather: CurrentWeather, dailyWeather: DailyWeather}) {
    return (
        <div>
            <h1 className="weather-info__temperature">{props.currentWeather.temperature}°C</h1>
            <div className="weather-info__apparent-temperature">Feels like {props.currentWeather.apparentTemperature}°C</div>
            <div className="flex-center" style={{"gap": "16px"}}>
                <div>Min {props.dailyWeather.minTemperature}°C</div>
                <div>Max {props.dailyWeather.maxTemperature}°C</div>
            </div>
        </div>
    )
}