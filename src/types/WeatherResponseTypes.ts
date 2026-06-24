export type CurrentWeatherDto = {
    city: string,
    country: string,
    timestamp: string,              //local time string
    weather: {
        main: string,               //clouds
        description: string,        //brocken clouds
    }
    temp: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
    },
    wind: {
        speed: number,
        deg: number,
        gust ?:number
    },
    sun: {
        sunrise: string,
        sunset: string
    },
    clouds: number,             //%
    pressure: number,           //hPa
    humidity: number,           //%
    sea_level?: number,         // hPa, optional
    grnd_level?: number         // hPa, optional
}

export type UvIndexDto = {
    date: number,
    value: number
}

export type ForecastEntry = {
    hour: string,
    weather: {
        main: string,               //clouds
        description: string,        //broken clouds
    }
    temp: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
    },
    wind: {
        speed: number,
        deg: number,
        gust ?:number
    },
    sun: {
        sunrise: string,
        sunset: string
    },
    clouds: number,             //%
    pressure: number,           //hPa
    humidity: number,           //%
    sea_level?: number,         // hPa, optional
    grnd_level?: number         // hPa, optional
}

export type ForecastDto = {
  city: string;
  country: string;
  timezone: number;
  days: DayForecast[];
};

export type DayForecast = {
  date: string;       // "04/09"
  dayOfWeek: string;  // "Thursday"
  data: ForecastEntry[];
}

export type ShortForecastDto = {
    city: string;
    days: {
        description: string;
        dayOfWeek: string;
        temp_max: number;
        temp_min: number;
    }[]
}
