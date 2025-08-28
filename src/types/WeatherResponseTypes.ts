export type CurrentWeatherDto = {
    city: string,
    country: string,
    timestamp: number,              //UNIX timestamp, frontend will map to hh:mm
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
        sunrise: number,        // UNIX timestamp
        sunset: number          // UNIX timestamp
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

export type ForcastDto = {
    city: string,
    country: string,
    timezone: number,
    list: ForecastEntry[]
}

export type ForecastEntry = {
    date: number,
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
        sunrise: number,        // UNIX timestamp
        sunset: number          // UNIX timestamp
    },
    clouds: number,             //%
    pressure: number,           //hPa
    humidity: number,           //%
    sea_level?: number,         // hPa, optional
    grnd_level?: number         // hPa, optional
}