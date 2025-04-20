'use client';
import Link from 'next/link';
import { useWeatherStore } from '@/store/useWeatherStore';
import { WeatherData } from '@/types/weather';
import styles from '@/styles/components/WeatherCard.module.scss';
import Image from 'next/image';

export const WeatherCard = ({ weather }: { weather: WeatherData }) => {
  const { favorites, addFavorite, removeFavorite } = useWeatherStore();
  const isFavorite = favorites.some((c) => c.id === weather.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(weather.id);
    } else {
      addFavorite(weather);
    }
  };

  return (
    <div className={`card ${styles.card}`}>
      <div className="card-body">
        <Link href={`/city/${weather.name}`} className="text-decoration-none">
          <h3 className="card-title">{weather.name}</h3>
        </Link>
        <p className="card-text">Температура: {Math.round(weather.main.temp)}°C</p>
        <p className="card-text">
          {weather.weather[0].description}
          <Image
            width={40}
            height={40}
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="icon"
          />
        </p>
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
