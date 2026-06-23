import { Injectable } from '@nestjs/common';
import { ShortForecastDto } from 'src/types/WeatherResponseTypes';
import { mapCurrentWeather, mapto5Dayforecast, mapToShortForecast, mapUVIndex } from './mappers/weather.mapper';
import { OpenWeatherService } from './openweather.service';
import { WeatherRepository } from './weather.repository';

@Injectable()
export class WeatherService {
    constructor(
        private readonly openWeather: OpenWeatherService,
        private readonly repo: WeatherRepository
    ) {}

    async getShortForecast(city: string): Promise<ShortForecastDto> {
        const forecast = await this.get5DayForecast(city);
        return mapToShortForecast(forecast)
    }

    async getCurrentWeather(city: string) {
        const key = `current:${city.toLocaleLowerCase()}`
        const cached = await this.repo.get(key);
        if (cached) {
            return cached.data;
        }

        const currentRaw = await this.openWeather.fetchCurrent(city)
        const currentMapped = mapCurrentWeather(currentRaw)

        this.repo.set(key, currentMapped)
        return currentMapped
    }

    async get5DayForecast(city: string) {
        const key = `forecast:${city.toLocaleLowerCase()}`
        const cached = await this.repo.get(key);
        if (cached) {
            return cached.data;
        }

        const forecastRaw = await this.openWeather.fetch5Day(city)
        const forecastMapped = mapto5Dayforecast(forecastRaw)

        this.repo.set(key, forecastMapped)
        return forecastMapped
    }

    async getUVIndex(lat: number, lon: number) {
        const key = `uv:${lat},${lon}`;

        const cached = await this.repo.get(key);
        if (cached) {
            return cached.data;
        }

        const data = await this.openWeather.fetchUV(lat, lon);
        const mappedUV = mapUVIndex(data);

        await this.repo.set(key, mappedUV, 30);

        return mappedUV;
    }
}
