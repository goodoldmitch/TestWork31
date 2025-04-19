'use client';
import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { WeatherCard } from '@/components/WeatherCard';
import { fetchCurrentWeather } from '@/utils/api';
import { WeatherData } from '@/types/weather';
import { Loader } from '@/components/Loader';
import { ErrorAlert } from '@/components/ErrorAlert';

export default function HomePage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city: string) => {
    try {
      setError('');
      setLoading(true);
      const response = await fetchCurrentWeather(city);
      setWeather(response.data);
    } catch {
      setError('Город не найден');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-4">
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorAlert message={error} />}
      {weather && <WeatherCard weather={weather} />}
    </main>
  );
}