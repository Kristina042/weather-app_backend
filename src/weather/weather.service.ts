import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OpenWeatherCurrentResponse, OpenWeatherForecastResponse, OpenWeatherUvResponse } from 'src/types/OpenWeatherTypes';
import { ShortForecastDto, UvIndexDto } from 'src/types/WeatherResponseTypes';
import { ForecastDto } from 'src/types/WeatherResponseTypes';
import { mapCurrentWeather, mapto5Dayforecast, mapToShortForecast, mapUVIndex } from './mappers/weather.mapper';

@Injectable()
export class WeatherService {
    private readonly apiKey = process.env.OPENWEATHER_API_KEY
    private readonly baseUrl = 'https://api.openweathermap.org/data/2.5'

    constructor(private readonly httpService: HttpService) {}

    async getShortForecast(city: string): Promise<ShortForecastDto> {
        const forecast = await this.get5DayForecast(city);
        return mapToShortForecast(forecast)
    }

    async getCurrentWeather(city: string) {
        const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
        const response = await firstValueFrom(this.httpService.get<OpenWeatherCurrentResponse>(url))
        const data = response.data

        return mapCurrentWeather(data);
    }

    async get5DayForecast(city: string) {
        const url = `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
        const response = await firstValueFrom(this.httpService.get<OpenWeatherForecastResponse>(url));
        const data = response.data;

        return mapto5Dayforecast(data);
    }

    async getUVIndex(lat: number, lon: number) {
        const url = `${this.baseUrl}/uvi?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
        const response = await firstValueFrom(this.httpService.get<OpenWeatherUvResponse>(url));
        const data = response.data

        return mapUVIndex(data);
    }
}
