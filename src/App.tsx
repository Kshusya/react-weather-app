import axios from 'axios';
import React, { useEffect } from 'react';
import WeatherInformation, { ForecastResponse } from './components/WeatherInformation';
import LoadingIcon from './components/LoadingIcon';
import CityInformation, { GeocodeResponse } from './components/CityInformation';
import isDayTime from './utils';
import CitySearchForm from './components/CitySearchForm';
import FutureHoursForecast from './components/FutureHoursForecast';

function App() {

  const [cityInfo, setCityInfo] = React.useState<GeocodeResponse>()

  const [weatherInfo, setWeatherInfo] = React.useState<ForecastResponse>()

  const [coords, setCoords] = React.useState<[number, number]>()

  const currentHours = new Date().getHours()

  async function getCityInformation(latitude: number, longitude: number) {
    const response = await axios.get<GeocodeResponse>(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`)
    return response.data
  }

  async function successFunction(position: GeolocationPosition) {
    setCoords([position.coords.latitude, position.coords.longitude])
    // setCityInfo(await getCityInformation(position.coords.latitude, position.coords.longitude))
    // setWeatherInfo(await getWeatherInformation(position.coords.latitude, position.coords.longitude))
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
  }, [])

  useEffect(function () {
    if (coords === undefined) {
      return
    }
    getCityInformation(coords[0], coords[1]).then(function (response) {
      setCityInfo(response)
    })
    getWeatherInformation(coords[0], coords[1]).then(function (response) {
      setWeatherInfo(response)
    })
  }, [coords])

  async function getWeatherInformation(latitude: number, longitude: number) {
    const timezone = new window.Intl.DateTimeFormat().resolvedOptions().timeZone

    const response = await axios.get<ForecastResponse>(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,uv_index,apparent_temperature,weathercode,windspeed_10m,relativehumidity_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=${timezone}`)
    return response.data
  }

  if (cityInfo === undefined || weatherInfo === undefined) {
    return (
      <LoadingIcon />
    )
  }

  return (
    <div className={`wrapper ${isDayTime(currentHours) ? 'wrapper_day' : 'wrapper_night'}`}>
      <div className='container'>
        {/* <FutureHoursForecast weatherInfo={weatherInfo} /> */}
        <div className='flex-center'>
          <CitySearchForm onCoordsChange={setCoords} />
        </div>
        <CityInformation cityInfo={cityInfo} />
        <WeatherInformation
          weatherInfo={weatherInfo}
          currentHours={currentHours} />
      </div>
    </div>
  )
}

export default App;
