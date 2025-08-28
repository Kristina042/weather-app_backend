export interface OpenWeatherCurrentResponse {
 coord: {
    lon: number,
    lat: number
  },
  weather:
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }[],
  base: string,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
  },
  visibility: number,
  wind: {
    speed: number,
    deg: 190,
    gust?: number
  },
  clouds: {
    all: number
  },
  dt: number,
  sys: {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
  },
    timezone: number,
    id: number,
    name: string,
    cod: number
}

export interface OpenWeatherUvResponse {
  lat: number,
  lon: number,
  date_iso: string,
  date: number,
  value: number
}

export interface OpenWeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  pop: number; // probability of precipitation
  rain?: {
    "3h": number; // rain volume for last 3 hours
  };
  snow?: {
    "3h": number; // snow volume for last 3 hours
  };
  sys: {
    pod: "d" | "n"; // part of day: day or night
  };
  dt_txt: string; // date/time as string
}