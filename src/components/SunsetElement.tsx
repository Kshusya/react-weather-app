import WeatherElement from "./WeatherElement"
import { DailyWeather } from "./WeatherInformation"

export default function (props: {dailyWeather: DailyWeather}) {
    const sunset = props.dailyWeather.sunset.substring(11)

    return (
        <WeatherElement
        value={`${sunset}`}
        icon='/static-icons/sunset.svg'
        title={'sunset'} />
    )
}