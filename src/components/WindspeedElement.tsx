import WeatherElement from "./WeatherElement";
import { CurrentWeather } from "./WeatherInformation";

export default function (props: {currentWeather: CurrentWeather}) {
    const windspeedMS = (props.currentWeather.windSpeed / 3.6).toFixed(1)

    return (
        <WeatherElement
        value={`${windspeedMS} m/s`}
        icon='/static-icons/wind.svg'
        title={'wind speed'} />
    )
}