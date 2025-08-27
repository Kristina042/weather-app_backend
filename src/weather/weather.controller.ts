import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {

    constructor(private readonly weatherService: WeatherService) {}

    @Get()
    async getCurrentWeather(@Query('city') city: string) {
        return this.weatherService.getCurrentWeather(city);
    }

    @Get('forecast')
    async getForecast(@Query('city') city: string) {
        return this.weatherService.get5DayForecast(city)
    }

    @Get('uv')
    getUVIndex(@Query('lat') lat: string, @Query('lon') lon: string) {
        return this.weatherService.getUVIndex(Number(lat), Number(lon));
    }
}
