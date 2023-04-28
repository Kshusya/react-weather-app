import axios from 'axios';
import React, { useEffect } from 'react';
import WeatherInformation, { ForecastResponse } from './components/WeatherInformation';
import LoadingIcon from './components/LoadingIcon';
import CityInformation, { GeocodeResponse } from './components/CityInformation';

function App() {

  const [cityInfo, setCityInfo] = React.useState<GeocodeResponse>()

  const [weatherInfo, setWeatherInfo] = React.useState<ForecastResponse>()

  const currentHours = new Date().getHours()

  function isDayTime(hours: number): boolean {
    return hours >= 7 && hours <= 18
  }

  async function getCityInformation(latitude: number, longitude: number) {
    const response = await axios.get<GeocodeResponse>(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`)
    return response.data
  }

  async function successFunction(position: GeolocationPosition) {
    setCityInfo(await getCityInformation(position.coords.latitude, position.coords.longitude))
    setWeatherInfo(await getWeatherInformation(position.coords.latitude, position.coords.longitude))
  }

  async function errorFunction() {
    alert('It appears that Geolocation, which is required for this page, is not available. Please allow geolocation on your device or browser.')
  }

  useEffect(function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction)
    } else {
      alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.')
    }
  }, []);

  async function getWeatherInformation(latitude: number, longitude: number) {
    const timezone = new window.Intl.DateTimeFormat().resolvedOptions().timeZone

    const response = await axios.get<ForecastResponse>(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,uv_index,apparent_temperature,weathercode,windspeed_10m,relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=${timezone}`)
    return response.data
  }

  if (cityInfo === undefined || weatherInfo === undefined) {
    return (
      <LoadingIcon />
    )
  }

  return (
    <div className={`container ${isDayTime(currentHours) ? 'container_day' : 'container_night'}`}>
      <CityInformation cityInfo={cityInfo} />
      <WeatherInformation
        weatherInfo={weatherInfo}
        currentHours={currentHours} />
    </div>
  )
}

export default App;
