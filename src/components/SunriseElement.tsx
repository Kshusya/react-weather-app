import WeatherElement from "./WeatherElement"
import { DailyWeather } from "./WeatherInformation"

export default function (props: {dailyWeather: DailyWeather}) {
    const sunrise = props.dailyWeather.sunrise.substring(11)
    

    return (
        <WeatherElement
        value={`${sunrise}`}
        icon='/static-icons/sunrise.svg'
        title={'sunrise'} />
    )
}