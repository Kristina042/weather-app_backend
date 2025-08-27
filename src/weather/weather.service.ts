import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
    private readonly apiKey = process.env.OPENWEATHER_API_KEY
    private readonly baseUrl = 'https://api.openweathermap.org/data/2.5'

    constructor(private readonly httpService: HttpService) {}

    async getCurrentWeather(city: string) {
        const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
        const response = await firstValueFrom(this.httpService.get(url))
        return response.data;
    }

    async get5DayForecast(city: string) {
        const url = `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
        const response = await firstValueFrom(this.httpService.get(url));
        return response.data;
    }

    async getUVIndex(lat: number, lon: number) {
        const url = `${this.baseUrl}/uvi?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
        const response = await firstValueFrom(this.httpService.get(url));
        return response.data;
    }

}
