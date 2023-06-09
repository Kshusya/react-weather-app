import WeatherElement from "./WeatherElement"
import { CurrentWeather } from "./WeatherInformation"

export default function (props: {currentWeather: CurrentWeather}) {
    return (
        <WeatherElement
        value={`${props.currentWeather.humidity}%`}
        icon='/static-icons/raindrop.svg'
        title={'humidity'} />
    )
}