import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { OpenWeatherService } from './openweather.service';
import { WeatherRepository } from './weather.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [WeatherService, OpenWeatherService, WeatherRepository],
  controllers: [WeatherController]
})
export class WeatherModule {}
