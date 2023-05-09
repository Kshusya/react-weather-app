import FutureHoursForecast from "./FutureHoursForecast"
import HumidityElement from "./HumidityElement"
import PrecipitationElement from "./PrecipitationElement"
import SunriseElement from "./SunriseElement"
import SunsetElement from "./SunsetElement"
import TemperatureComponent from "./TemperatureComponent"
import UvIndexElement from "./UvIndexElement"
import WeathercodeElement from "./WeathercodeElement"
import WindspeedElement from "./WindspeedElement"

export interface ForecastResponse {
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    timezone: string,
    timezone_abbreviation: string,
    elevation: number,
    hourly: {
        time: string[],
        temperature_2m: number[],
        apparent_temperature: number[],
        weathercode: number[],
        windspeed_10m: number[],
        relativehumidity_2m: number[],
        uv_index: number[],
        precipitation_probability: number[],
    },
    daily: {
        time: string[],
        temperature_2m_max: number[],
        temperature_2m_min: number[],
        sunrise: string[],
        sunset: string[],
    },
}

export interface WeatherInformationProps {
    weatherInfo: ForecastResponse,
    currentHours: number,
}

export interface CurrentWeather {
    temperature: number,
    apparentTemperature: number,
    weatherCode: number,
    windSpeed: number,
    humidity: number,
    uv: number,
    precipitationProbability: number,
}

export interface DailyWeather {
    maxTemperature: number,
    minTemperature: number,
    sunrise: string,
    sunset: string,
}

export default function WeatherInformation(props: WeatherInformationProps) {

    const currentWeather: CurrentWeather = {
        temperature: props.weatherInfo.hourly.temperature_2m[props.currentHours],
        apparentTemperature: props.weatherInfo.hourly.apparent_temperature[props.currentHours],
        weatherCode: props.weatherInfo.hourly.weathercode[props.currentHours],
        windSpeed: props.weatherInfo.hourly.windspeed_10m[props.currentHours],
        humidity: props.weatherInfo.hourly.relativehumidity_2m[props.currentHours],
        uv: props.weatherInfo.hourly.uv_index[props.currentHours],
        precipitationProbability: props.weatherInfo.hourly.precipitation_probability[props.currentHours],
    }

    const dailyWeather: DailyWeather = {
        maxTemperature: props.weatherInfo.daily.temperature_2m_max[0],
        minTemperature: props.weatherInfo.daily.temperature_2m_min[0],
        sunrise: props.weatherInfo.daily.sunrise[0],
        sunset: props.weatherInfo.daily.sunset[0],
    }

    return (
        <div className='weather-info text-center'>
            <WeathercodeElement currentWeather={currentWeather} />
            <TemperatureComponent
                currentWeather={currentWeather}
                dailyWeather={dailyWeather} />
            <FutureHoursForecast weatherInfo={props.weatherInfo} />
            <div className="weather__block">
                <HumidityElement currentWeather={currentWeather} />
                <WindspeedElement currentWeather={currentWeather} />
                <UvIndexElement currentWeather={currentWeather} />
                <PrecipitationElement currentWeather={currentWeather} />
                <SunriseElement dailyWeather={dailyWeather} />
                <SunsetElement dailyWeather={dailyWeather} />
            </div>
        </div>
    )
}