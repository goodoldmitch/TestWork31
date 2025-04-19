'use client';
import { useWeatherStore } from '@/store/useWeatherStore';
import { WeatherCard } from './WeatherCard';

export const FavoriteList = () => {
  const { favorites } = useWeatherStore();

  if (favorites.length === 0) {
    return <p>Нет избранных городов.</p>;
  }

  return (
    <div className="row">
      {favorites.map((city) => (
        <div key={city.id} className="col-md-4 mb-3">
          <WeatherCard weather={city} />
        </div>
      ))}
    </div>
  );
};