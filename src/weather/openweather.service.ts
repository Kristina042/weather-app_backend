import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { OpenWeatherCurrentResponse, OpenWeatherForecastResponse, OpenWeatherUvResponse } from "src/types/OpenWeatherTypes";

@Injectable()

export class OpenWeatherService {
  private readonly apiKey = process.env.OPENWEATHER_API_KEY;

  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(
    private http: HttpService,
  ) {}

  async fetchCurrent(city: string) {
    const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
    const response = await firstValueFrom(this.http.get<OpenWeatherCurrentResponse>(url))
    return response.data
  }

  async fetch5Day(city: string) {
    const url = `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
    const response = await firstValueFrom(this.http.get<OpenWeatherForecastResponse>(url));
    return response.data
  }

  async fetchUV(lat: number, lon: number) {
    const url = `${this.baseUrl}/uvi?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    const response = await firstValueFrom(this.http.get<OpenWeatherUvResponse>(url));
    return response.data
  }
}