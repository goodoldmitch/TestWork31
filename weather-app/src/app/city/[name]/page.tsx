'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchForecast } from '@/utils/api';
import { Loader } from '@/components/Loader';
import { ErrorAlert } from '@/components/ErrorAlert';

export default function CityPage() {
  const { name } = useParams();
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name || typeof name !== 'string') return;
    setLoading(true);
    fetchForecast(name)
      .then((res) => setForecast(res.data))
      .catch((err) => setError('Ошибка при загрузке прогноза'))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <Loader />;
  if (error) return <ErrorAlert message={error} />;
  if (!forecast) return null;

  return (
    <div className="container mt-4">
      <h2>Прогноз погоды для {forecast.city.name}</h2>
      <div className="row">
        {forecast.list.map((item: any, index: number) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.dt_txt}</h5>
                <p className="card-text">Температура: {item.main.temp}°C</p>
                <p className="card-text">{item.weather[0].description}</p>
                <img
                  src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                  alt="icon"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}