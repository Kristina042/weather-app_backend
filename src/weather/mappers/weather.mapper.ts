import {
  CurrentWeatherDto,
  ForecastDto,
  ShortForecastDto,
  UvIndexDto,
} from 'src/types/WeatherResponseTypes';

import {
  OpenWeatherCurrentResponse,
  OpenWeatherForecastResponse,
  OpenWeatherUvResponse,
} from 'src/types/OpenWeatherTypes';

export const mapCurrentWeather = (data: OpenWeatherCurrentResponse) => {
  const mappedResponse: CurrentWeatherDto = {
    city: data.name,
    country: data.sys.country,
    timestamp: data.dt,
    weather: {
      main: data.weather[0].main,
      description:  data.weather[0].description
    },
    temp: {
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
    },
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg,
      gust: data.wind?.gust
    },

    sun: {
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset
    },
    clouds:  data.clouds.all,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    sea_level: data.main.sea_level,
    grnd_level: data.main.grnd_level
  }

  return mappedResponse;
}

export const mapToShortForecast = (longForecast: ForecastDto) => {
  const daysOfWeek = longForecast.days.map(item => item.dayOfWeek)

  const descriptions = longForecast.days.map(day =>
    day.data[4].weather.description
  )

  const minTemps = longForecast.days.map(day =>
    Math.min(
      ...day.data.map(item => item.temp.temp_min)
    )
  )

  const maxTemps = longForecast.days.map(day =>
    Math.max(
      ...day.data.map(item => item.temp.temp_max)
    )
  )

  const shortForecastDays = new Array(5)

  for (let i = 0; i < daysOfWeek.length; i++) {
    shortForecastDays[i] = {
      dayOfWeek: daysOfWeek[i],
      temp_min: minTemps[i],
      temp_max: maxTemps[i],
      description: descriptions[i]
    }
  }

  const shortForecast: ShortForecastDto = {
    city: longForecast.city,
    days: shortForecastDays
  }

  return shortForecast
}