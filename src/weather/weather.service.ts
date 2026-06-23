import { Injectable } from '@nestjs/common';
import { ShortForecastDto } from 'src/types/WeatherResponseTypes';
import { mapCurrentWeather, mapto5Dayforecast, mapToShortForecast, mapUVIndex } from './mappers/weather.mapper';
import { OpenWeatherService } from './openweather.service';

@Injectable()
export class WeatherService {
    constructor(
        private readonly openWeather: OpenWeatherService
    ) {}

    async getShortForecast(city: string): Promise<ShortForecastDto> {
        const forecast = await this.get5DayForecast(city);
        return mapToShortForecast(forecast)
    }

    async getCurrentWeather(city: string) {
        const data = await this.openWeather.fetchCurrent(city)
        return mapCurrentWeather(data);
    }

    async get5DayForecast(city: string) {
        const data = await this.openWeather.fetch5Day(city);
        return mapto5Dayforecast(data);
    }

    async getUVIndex(lat: number, lon: number) {
        const data = await this.openWeather.fetchUV(lat, lon)

        return mapUVIndex(data);
    }
}
