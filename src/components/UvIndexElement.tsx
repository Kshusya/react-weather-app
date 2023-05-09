import WeatherElement from "./WeatherElement";
import { CurrentWeather } from "./WeatherInformation";

export default function (props: {currentWeather: CurrentWeather}) {
    return (
        <WeatherElement
        value={`${props.currentWeather.uv}`}
        icon='/static-icons/clear-day.svg'
        title={'uv index'} />
    )
}