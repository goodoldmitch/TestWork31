'use client';
import Link from 'next/link';
import { useWeatherStore } from '@/store/useWeatherStore';
import { WeatherData } from '@/types/weather';
import styles from '@/styles/components/WeatherCard.module.scss';

export const WeatherCard = ({ weather }: { weather: WeatherData }) => {
  const { favorites, addFavorite, removeFavorite } = useWeatherStore();
  const isFavorite = favorites.some((c) => c.id === weather.id);

  const toggleFavorite = () => {
    isFavorite ? removeFavorite(weather.id) : addFavorite(weather);
  };

  return (
    <div className={`card ${styles.card}`}>
      <div className="card-body">
        <Link href={`/city/${weather.name}`} className="text-decoration-none">
          <h5 className="card-title">{weather.name}</h5>
        </Link>
        <p className="card-text">Температура: {weather.main.temp}°C</p>
        <p className="card-text">{weather.weather[0].description}</p>
        <img
          src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          alt="icon"
        />
        <button
          className={`btn btn-${isFavorite ? 'danger' : 'outline-primary'} mt-2`}
          onClick={toggleFavorite}
        >
          {isFavorite ? 'Удалить из избранного' : 'В избранное'}
        </button>
      </div>
    </div>
  );
};
