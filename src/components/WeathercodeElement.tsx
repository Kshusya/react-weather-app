import isDayTime from "../utils"
import { CurrentWeather } from "./WeatherInformation"

export function getImageByWeathercode(hours: number, weathercode: number) {
        
    switch (weathercode) {
        default:
        case 0: 
            return isDayTime(hours) ? "day" : "night";

        case 1:
        case 2:
        case 3:
            return "cloudy";

        case 34:
        case 48:
            return "fog";

        case 51:
        case 53:
        case 55:
            return "rainy-4";

        case 56:
        case 57:
        case 66:
        case 67:
            return "sleet";

        case 61:
        case 63:
        case 65:
            return "rainy-5";
        
        case 77:
            return "rainy-7";

        case 80:
        case 81:
        case 82:
            return "rainy-6";
        
        case 85:
        case 86:
            return "snowy-5";

        case 95:
        case 96:
        case 99:
            return "thunder";
    }
}

export default function (props: {currentWeather: CurrentWeather}) {

    const currentHours = new Date().getHours()

    const weathercode = props.currentWeather.weatherCode

    return (
        <div>
            <img width={200} height={200} src={`/animated-icons/${getImageByWeathercode(currentHours, weathercode)}.svg`} alt="" />
        </div>
    )
}