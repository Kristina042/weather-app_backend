import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OpenWeatherCurrentResponse, OpenWeatherForecastResponse, OpenWeatherUvResponse } from 'src/types/OpenWeatherTypes';
import { CurrentWeatherDto, ForcastDto, UvIndexDto } from 'src/types/WeatherResponseTypes';

@Injectable()
export class WeatherService {
    private readonly apiKey = process.env.OPENWEATHER_API_KEY
    private readonly baseUrl = 'https://api.openweathermap.org/data/2.5'

    constructor(private readonly httpService: HttpService) {}

    async getCurrentWeather(city: string) {
        const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
        const response = await firstValueFrom(this.httpService.get<OpenWeatherCurrentResponse>(url))
        const data = response.data

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

    async get5DayForecast(city: string) {
        const url = `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
        const response = await firstValueFrom(this.httpService.get<OpenWeatherForecastResponse>(url))

        const data = response.data

        const mappedResponse: ForcastDto = {
            city: data.city.name,
            country: data.city.country,
            timezone: data.city.timezone,
            list: data.list.map(item => ({
                date: item.dt,
                weather: {
                    main: item.weather[0].main ,
                    description: item.weather[0].description,
                },
                temp: {
                    temp: item.main.temp,
                    feels_like: item.main.feels_like,
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max
                },
                wind: {
                    speed: item.wind.speed,
                    deg: item.wind.deg,
                    gust: item.wind.gust
                },
                sun: {
                    sunrise: data.city.sunrise,
                    sunset: data.city.sunset
                },
                clouds: item.clouds.all,
                pressure: item.main.pressure,
                humidity: item.main.humidity,
                sea_level: item.main.sea_level,
                grnd_level: item.main.grnd_level
            }))
        }

        return mappedResponse
    }

    async getUVIndex(lat: number, lon: number) {
        const url = `${this.baseUrl}/uvi?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
        const response = await firstValueFrom(this.httpService.get<OpenWeatherUvResponse>(url));
        const data = response.data

        const mappedResponse: UvIndexDto = {
            date: data.date,
            value: data.value
        }
        return mappedResponse;
    }

}
