export interface Weather {
    location: Location
    current: Current
    forecast: Forecast
    alerts: Alerts
    url_city: string
}


export interface Location {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch: number
    localtime: string
}

export interface Current {
    last_updated_epoch: number
    last_updated: string
    temp_c: number
    temp_f: number
    is_day: number
    condition: Condition
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    vis_km: number
    vis_miles: number
    uv: number
    gust_mph: number
    gust_kph: number
    air_quality: AirQuality
}

export interface Condition {
    text: string
    icon: string
    code: number
}

export interface AirQuality {
    co: number
    no2: number
    o3: number
    so2: number
    pm2_5: number
    pm10: number
    "us-epa-index": number
    "gb-defra-index": number
}

export interface Forecast {
    forecastday: Forecastday[]
}

export interface Forecastday {
    date: string
    date_epoch: number
    day: Day
    astro: Astro
    hour: Hour[]
}

export interface Day {
    maxtemp_c: number
    maxtemp_f: number
    mintemp_c: number
    mintemp_f: number
    avgtemp_c: number
    avgtemp_f: number
    maxwind_mph: number
    maxwind_kph: number
    totalprecip_mm: number
    totalprecip_in: number
    avgvis_km: number
    avgvis_miles: number
    avghumidity: number
    daily_will_it_rain: number
    daily_chance_of_rain: number
    daily_will_it_snow: number
    daily_chance_of_snow: number
    condition: Condition2
    uv: number
}

export interface Condition2 {
    text: string
    icon: string
    code: number
}

export interface Astro {
    sunrise: string
    sunset: string
    moonrise: string
    moonset: string
    moon_phase: string
    moon_illumination: string
}

export interface Hour {
    time_epoch: number
    time: string
    temp_c: number
    temp_f: number
    is_day: number
    condition: Condition3
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    windchill_c: number
    windchill_f: number
    heatindex_c: number
    heatindex_f: number
    dewpoint_c: number
    dewpoint_f: number
    will_it_rain: number
    chance_of_rain: number
    will_it_snow: number
    chance_of_snow: number
    vis_km: number
    vis_miles: number
    gust_mph: number
    gust_kph: number
    uv: number
}

export interface Condition3 {
    text: string
    icon: string
    code: number
}

export interface Alerts {
    alert: Alert[]
}

export interface Alert {
    headline: string
    msgtype: any
    severity: any
    urgency: any
    areas: any
    category: string
    certainty: any
    event: string
    note: any
    effective: string
    expires: string
    desc: string
    instruction: string
}
