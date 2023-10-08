import React, { useState } from 'react'
// import dotenv from 'dotenv'
import { TextField, Button, Typography, Box } from '@mui/material'
import './App.css'

// dotenv.config()
const apiKey = '54aeb2509b680e9b0d6c2b242e1ff9a4' // Get your API key from OpenWeatherMap

function App() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [isCelsius, setIsCelsius] = useState(true)

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius)
  }
  const searchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      setWeatherData('null')
    }
  }
  let iconUrl
  if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
    iconUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
  }

  return (
    <div className='App'>
      <header>
        <Typography variant='h4' gutterBottom color='green'>
          Weather Dashboard
        </Typography>
      </header>
      <main className='main-content'>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          gap='1rem'
          margin='2rem 0'
        >
          <TextField
            label='Enter city name'
            variant='outlined'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ marginRight: 2 }}
          />
          <Button variant='contained' onClick={searchWeather}>
            Search
          </Button>
        </Box>
        {weatherData &&
        weatherData.name &&
        weatherData.weather &&
        weatherData.weather[0] ? (
          <div className='weather-info' display='flex'>
            <Box display='flex' flexDirection='column'>
              <Box>
                <Typography variant='h5' gutterBottom>
                  {weatherData.name}
                </Typography>
                <div className='img_container'>
                  <img src={iconUrl} alt={weatherData.weather[0].description} />

                  <Typography variant='body1' color=' green' gutterBottom>
                    {weatherData.weather[0].description}
                  </Typography>
                </div>
              </Box>
              <Box
                display='flex'
                gap='1rem'
                margin='0 auto 2rem'
                className='bottom_three'
              >
                <Typography variant='body1' gutterBottom className='box__item'>
                  Temperature:{' '}
                  {isCelsius
                    ? `${(weatherData.main.temp - 273.15).toFixed(2)}°C`
                    : `${((weatherData.main.temp - 273.15) * 1.8 + 32).toFixed(
                        2
                      )}°F`}
                </Typography>

                <Typography variant='body1' gutterBottom className='box__item'>
                  {' '}
                  Humidity: {weatherData.main.humidity}%
                </Typography>
                <Typography variant='body1' gutterBottom className='box__item'>
                  {' '}
                  Wind Speed: {weatherData.wind.speed} m/s
                </Typography>
              </Box>
            </Box>
            <Button variant='contained' onClick={toggleTemperatureUnit}>
              Toggle Temperature Unit
            </Button>
          </div>
        ) : (
          weatherData && (
            <h4 className='error'>City not Found. Please try again.</h4>
          )
        )}
      </main>
      <footer>
        <Typography variant='body2' align='center'>
          © 2023 Weather App. All rights reserved.
        </Typography>
      </footer>
    </div>
  )
}

export default App
