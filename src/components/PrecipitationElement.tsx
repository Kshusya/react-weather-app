import WeatherElement from "./WeatherElement"
import { CurrentWeather } from "./WeatherInformation"

export default function (props: {currentWeather: CurrentWeather}) {

    return (
        <WeatherElement
        value={`${props.currentWeather.precipitationProbability}%`}
        icon='/static-icons/raindrops.svg'
        title={'precipitation'} />
    )
}