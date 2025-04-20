'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchForecast } from '@/utils/api';
import { Loader } from '@/components/Loader';
import { ErrorAlert } from '@/components/ErrorAlert';
import { Navbar } from '@/components/NavBar';
import Image from 'next/image';
import { ForecastItem, ForecastData } from '@/types/weather';


export default function CityPage() {
  const params = useParams();
  const cityName = decodeURIComponent(params.name as string);

  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cityName) return;

    setLoading(true);
    fetchForecast(cityName)
      .then((res) => setForecast(res.data))
      .catch(() => setError('Ошибка при загрузке прогноза'))
      .finally(() => setLoading(false));
  }, [cityName]);

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorAlert message={error} />;
  if (!forecast) return null;

  // Группируем по дате
  const groupedByDate = forecast.list.reduce((acc: Record<string, ForecastItem[]>, item: ForecastItem) => {
    const date = item.dt_txt.split(' ')[0]; // YYYY-MM-DD
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const dateKeys = Object.keys(groupedByDate);

  return (
    <div className="container mt-4">
      <Navbar />
      <h2>Прогноз погоды в городе {forecast.city.name}</h2>

      <div className="card mb-4">
        <div className="card-body d-flex align-items-center">
          <Image
            src={`https://openweathermap.org/img/w/${forecast.list[0].weather[0].icon}.png`}
            alt="icon"
            className="me-3"
            width={40}
            height={40}
          />
          <div>
            <h4 className="card-title mb-1">Сейчас в {forecast.city.name}</h4>
            <p className="card-text mb-1">
              Температура: <strong>{Math.round(forecast.list[0].main.temp)}°C</strong>
            </p>
            <p className="card-text text-capitalize">
              {forecast.list[0].weather[0].description}
            </p>
          </div>
        </div>
      </div>

      <div className="accordion mt-4" id="forecastAccordion">
        {dateKeys.map((date, index) => {
          const items = groupedByDate[date];
          const readableDate = new Date(date).toLocaleDateString('ru-RU', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          });
          const collapseId = `collapse-${index}`;
          const headingId = `heading-${index}`;
          const isFirst = index === 0;

          return (
            <div className="accordion-item" key={date}>
              <h2 className="accordion-header" id={headingId}>
                <button
                  className={`accordion-button ${!isFirst ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${collapseId}`}
                  aria-expanded={isFirst}
                  aria-controls={collapseId}
                >
                  {readableDate}
                </button>
              </h2>
              <div
                id={collapseId}
                className={`accordion-collapse collapse ${isFirst ? 'show' : ''}`}
                aria-labelledby={headingId}
                data-bs-parent="#forecastAccordion"
              >
                <div className="accordion-body">
                  <div className="row">
                    {items.map((item: ForecastItem, idx: number) => (
                      <div className="col-md-3 mb-3" key={idx}>
                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-title">
                              {new Date(item.dt_txt).toLocaleTimeString('ru-RU', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </h6>
                            <p className="card-text">Температура: {Math.round(item.main.temp)}°C</p>
                            <p className="card-text">
                              {item.weather[0].description}
                              <Image
                                width={40}
                                height={40}
                                src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                                alt="icon"
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
