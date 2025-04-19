import { create } from 'zustand';
import { WeatherData } from '@/types/weather';

interface WeatherState {
  favorites: WeatherData[];
  addFavorite: (city: WeatherData) => void;
  removeFavorite: (id: number) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  favorites: [],
  addFavorite: (city) =>
    set((state) => ({
      favorites: [...state.favorites.filter((c) => c.id !== city.id), city],
    })),
  removeFavorite: (id) =>
    set((state) => ({ favorites: state.favorites.filter((c) => c.id !== id) })),
}));