export interface WeatherData {
  id: number;
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface ForecastItem {
  dt_txt: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
};

export interface ForecastData {
  city: {
    name: string;
  };
  list: ForecastItem[];
}