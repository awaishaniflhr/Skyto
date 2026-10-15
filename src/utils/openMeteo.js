const WEATHER_CODES = {
  0: ['Clear', 'clear sky', 800],
  1: ['Clear', 'mainly clear', 801],
  2: ['Clouds', 'partly cloudy', 802],
  3: ['Clouds', 'overcast', 804],
  45: ['Fog', 'fog', 741],
  48: ['Fog', 'depositing rime fog', 741],
  51: ['Drizzle', 'light drizzle', 300],
  53: ['Drizzle', 'moderate drizzle', 301],
  55: ['Drizzle', 'dense drizzle', 302],
  56: ['Drizzle', 'light freezing drizzle', 511],
  57: ['Drizzle', 'dense freezing drizzle', 511],
  61: ['Rain', 'slight rain', 500],
  63: ['Rain', 'moderate rain', 501],
  65: ['Rain', 'heavy rain', 502],
  66: ['Rain', 'light freezing rain', 511],
  67: ['Rain', 'heavy freezing rain', 511],
  71: ['Snow', 'slight snow', 600],
  73: ['Snow', 'moderate snow', 601],
  75: ['Snow', 'heavy snow', 602],
  77: ['Snow', 'snow grains', 600],
  80: ['Rain', 'slight rain showers', 520],
  81: ['Rain', 'moderate rain showers', 521],
  82: ['Rain', 'violent rain showers', 522],
  85: ['Snow', 'slight snow showers', 620],
  86: ['Snow', 'heavy snow showers', 622],
  95: ['Thunderstorm', 'thunderstorm', 211],
  96: ['Thunderstorm', 'thunderstorm with slight hail', 212],
  99: ['Thunderstorm', 'thunderstorm with heavy hail', 212],
};

function toUnixTimestamp(localTime, utcOffsetSeconds) {
  return Math.floor(
    (new Date(`${localTime}Z`).getTime() - utcOffsetSeconds * 1000) / 1000,
  );
}

function describeWeather(code, isDay = true) {
  const [main, description, openWeatherIcon] = WEATHER_CODES[code] || [
    'Clouds',
    'weather conditions',
    803,
  ];
  const iconCodes = {
    211: '11',
    212: '11',
    300: '09',
    301: '09',
    302: '09',
    500: '10',
    501: '10',
    502: '10',
    511: '13',
    520: '09',
    521: '09',
    522: '09',
    600: '13',
    601: '13',
    602: '13',
    620: '13',
    622: '13',
    741: '50',
    800: '01',
    801: '02',
    802: '03',
    803: '04',
    804: '04',
  };

  return {
    main,
    description,
    icon: `${iconCodes[openWeatherIcon] || '03'}${isDay ? 'd' : 'n'}`,
  };
}

function cloudCoverForCode(code) {
  if (code === 0) return 0;
  if (code === 1) return 20;
  if (code === 2) return 50;
  if (code === 3) return 100;
  if (code === 45 || code === 48) return 90;
  return 100;
}

function getAt(values, index, fallback = 0) {
  const value = values?.[index];
  return value == null ? fallback : value;
}

export function normalizeOpenMeteoWeather(response) {
  const offset = response.utc_offset_seconds || 0;
  const current = response.current;
  const hourly = response.hourly;
  const daily = response.daily;
  const isDay = current.is_day === 1;

  return {
    lat: response.latitude,
    lon: response.longitude,
    timezone: response.timezone,
    timezone_offset: offset,
    current: {
      dt: toUnixTimestamp(current.time, offset),
      sunrise: toUnixTimestamp(daily.sunrise[0], offset),
      sunset: toUnixTimestamp(daily.sunset[0], offset),
      temp: current.temperature_2m,
      feels_like: current.apparent_temperature,
      pressure: current.pressure_msl,
      humidity: current.relative_humidity_2m,
      dew_point: current.dew_point_2m,
      uvi: current.uv_index,
      clouds: current.cloud_cover,
      visibility: current.visibility,
      wind_speed: current.wind_speed_10m,
      wind_deg: current.wind_direction_10m,
      wind_gust: current.wind_gusts_10m,
      rain: current.rain || current.precipitation,
      weather: [describeWeather(current.weather_code, isDay)],
    },
    hourly: hourly.time.map((time, index) => {
      const hourlyIsDay = hourly.is_day?.[index] === 1;
      return {
        dt: toUnixTimestamp(time, offset),
        temp: hourly.temperature_2m[index],
        feels_like: hourly.apparent_temperature[index],
        humidity: hourly.relative_humidity_2m[index],
        clouds: hourly.cloud_cover[index],
        visibility: hourly.visibility[index],
        wind_speed: hourly.wind_speed_10m[index],
        wind_deg: hourly.wind_direction_10m[index],
        wind_gust: hourly.wind_gusts_10m[index],
        uvi: hourly.uv_index[index],
        pop: hourly.precipitation_probability[index],
        rain: hourly.rain[index] || hourly.precipitation[index],
        weather: [describeWeather(hourly.weather_code[index], hourlyIsDay)],
      };
    }),
    daily: daily.time.map((time, index) => {
      const code = daily.weather_code[index];
      const high = daily.temperature_2m_max[index];
      const low = daily.temperature_2m_min[index];
      return {
        dt: toUnixTimestamp(`${time}T12:00`, offset),
        sunrise: toUnixTimestamp(daily.sunrise[index], offset),
        sunset: toUnixTimestamp(daily.sunset[index], offset),
        temp: {
          day: high,
          min: low,
          max: high,
          night: low,
          eve: high,
          morn: low,
        },
        feels_like: {day: high, night: low, eve: high, morn: low},
        humidity: getAt(hourly.relative_humidity_2m, index * 24),
        clouds: cloudCoverForCode(code),
        wind_speed: daily.wind_speed_10m_max[index],
        wind_deg: daily.wind_direction_10m_dominant[index],
        wind_gust: daily.wind_gusts_10m_max[index],
        uvi: daily.uv_index_max[index],
        pop: daily.precipitation_probability_max[index],
        rain: daily.rain_sum[index] || daily.precipitation_sum[index],
        weather: [describeWeather(code)],
      };
    }),
  };
}

export async function fetchOpenMeteoWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,dew_point_2m,is_day,precipitation,rain,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m,visibility,uv_index',
    hourly:
      'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m,visibility,uv_index,is_day',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant',
    timezone: 'auto',
    forecast_days: '7',
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
  });
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
  );
  const result = await response.json();

  if (!response.ok || !result.current || !result.hourly || !result.daily) {
    throw new Error(result.reason || 'Weather data is unavailable.');
  }

  return normalizeOpenMeteoWeather(result);
}
