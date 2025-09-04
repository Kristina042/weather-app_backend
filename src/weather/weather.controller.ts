import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {

    constructor(private readonly weatherService: WeatherService) {}

    @Get()
    async getCurrentWeather(@Query('city') city: string) {
        return this.weatherService.getCurrentWeather(city);
    }

    @Get('detailedForecast')
    async getForecast(@Query('city') city: string) {
        return this.weatherService.get5DayForecast(city)
    }

    @Get('uv')
    async getUVIndex(@Query('lat') lat: string, @Query('lon') lon: string) {
        return this.weatherService.getUVIndex(Number(lat), Number(lon));
    }

    @Get('shortForecast')
    async getShortForecast() {
        return this.weatherService.shortForecast
    }

}
