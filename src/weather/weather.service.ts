import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OpenWeatherCurrentResponse, OpenWeatherForecastResponse, OpenWeatherUvResponse } from 'src/types/OpenWeatherTypes';
import { CurrentWeatherDto, ShortForecastDto, UvIndexDto } from 'src/types/WeatherResponseTypes';
import { ForecastDto } from 'src/types/WeatherResponseTypes';

@Injectable()
export class WeatherService {
    private readonly apiKey = process.env.OPENWEATHER_API_KEY
    private readonly baseUrl = 'https://api.openweathermap.org/data/2.5'

    constructor(private readonly httpService: HttpService) {}

    shortForecast: ShortForecastDto | null = null

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
        const response = await firstValueFrom(
            this.httpService.get<OpenWeatherForecastResponse>(url)
        );

        const data = response.data;
        const chunkSize = 8 // 8 entries per day
        const totalDays = 5
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        const days = Array.from({ length: totalDays }, (_, dayIndex) => {
            const start = dayIndex * chunkSize
            const end = start + chunkSize
            const entries = data.list.slice(start, end)

            const firstDate = new Date(entries[0].dt * 1000)

            const formattedDate = firstDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            });

            const dayOfWeek = daysOfWeek[firstDate.getDay()];

            return {
            date: formattedDate,
            dayOfWeek,
            data: entries.map((item) => {
                const militaryTime = new Date(item.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                })

                return {
                weather: {
                    main: item.weather[0].main,
                    description: item.weather[0].description,
                },
                temp: {
                    temp: item.main.temp,
                    feels_like: item.main.feels_like,
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max,
                },
                wind: {
                    speed: item.wind.speed,
                    deg: item.wind.deg,
                    gust: item.wind.gust,
                },
                clouds: item.clouds.all,
                pressure: item.main.pressure,
                humidity: item.main.humidity,
                sea_level: item.main.sea_level,
                grnd_level: item.main.grnd_level,
                hour: militaryTime,
                sun: {
                    sunrise: new Date(data.city.sunrise * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    }),
                    sunset: new Date(data.city.sunset * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    }),
                },
                }
            }),
            }
        })

        const mappedResponse: ForecastDto = {
            city: data.city.name,
            country: data.city.country,
            timezone: data.city.timezone,
            days,
        }

        this.shortForecast =  this.mapToShortForecast(mappedResponse)

        return mappedResponse
    }

    mapToShortForecast(longForecast: ForecastDto) {

        const daysOfWeek = longForecast.days.map(item => item.dayOfWeek)

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
                temp_max: maxTemps[i]
            }
        }

        const shortForecast: ShortForecastDto = {
            city: longForecast.city,
            days: shortForecastDays
        }

        return shortForecast
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
