'use client';
// import styles from '@/styles/components/WeatherCard.module.scss';
import { WeatherData } from '@/types/weather';
import { useWeatherStore } from '@/store/useWeatherStore';

export const WeatherCard = ({ weather }: { weather: WeatherData }) => {
  const { favorites, addFavorite, removeFavorite } = useWeatherStore();
  const isFavorite = favorites.some((c) => c.id === weather.id);

  const toggleFavorite = () => {
    if (isFavorite) removeFavorite(weather.id);
    else addFavorite(weather);
  };

  return (
    // <div className={`card ${styles.card} mt-3 p-3`}> 
    <div className={`card mt-3 p-3`}> 
      <div className="d-flex justify-content-between align-items-center">
        <h3>{weather.name}</h3>
        <button className="btn btn-outline-primary btn-sm" onClick={toggleFavorite}>
          {isFavorite ? '★ Удалить' : '☆ В избранное'}
        </button>
      </div>
      <p className="fs-4">{Math.round(weather.main.temp)}°C</p>
      <p className="text-capitalize">{weather.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
    </div>
  );
};