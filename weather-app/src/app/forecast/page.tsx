'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchForecast } from '@/utils/api';
import { Loader } from '@/components/Loader';
import { ErrorAlert } from '@/components/ErrorAlert';

export default function ForecastPage() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city');
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getForecast = async () => {
      if (!city) return;
      setLoading(true);
      try {
        const res = await fetchForecast(city);
        setForecast(res.data.list.slice(0, 5)); // только 5 ближайших записей
      } catch {
        setError('Ошибка при получении прогноза');
      } finally {
        setLoading(false);
      }
    };
    getForecast();
  }, [city]);

  return (
    <main className="container py-4">
      <h1 className="mb-3">Прогноз погоды {city && `для ${city}`}</h1>
      {loading && <Loader />}
      {error && <ErrorAlert message={error} />}
      <div className="row">
        {forecast.map((item, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card p-3">
              <h5>{new Date(item.dt_txt).toLocaleString('ru-RU')}</h5>
              <p className="fs-5">{Math.round(item.main.temp)}°C</p>
              <p className="text-capitalize">{item.weather[0].description}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
