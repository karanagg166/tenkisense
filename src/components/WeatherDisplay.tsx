"use client";

interface WeatherData {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: Array<{
        main: string;
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
    };
    sys: {
        country: string;
    };
}

interface WeatherDisplayProps {
    data: WeatherData | null;
    loading: boolean;
}

export default function WeatherDisplay({ data, loading }: WeatherDisplayProps) {
    if (loading) {
        return (
            <div className="w-full max-w-2xl mx-auto mt-8">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-white/20 rounded w-1/2"></div>
                        <div className="h-24 bg-white/20 rounded"></div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-16 bg-white/20 rounded"></div>
                            <div className="h-16 bg-white/20 rounded"></div>
                            <div className="h-16 bg-white/20 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    const tempCelsius = Math.round(data.main.temp - 273.15);
    const feelsLikeCelsius = Math.round(data.main.feels_like - 273.15);

    return (
        <div className="w-full max-w-2xl mx-auto mt-8 animate-fade-in">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
                {/* Location */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            {data.name}, {data.sys.country}
                        </h2>
                        <p className="text-white/70 capitalize mt-1">
                            {data.weather[0].description}
                        </p>
                    </div>
                    <img
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                        alt={data.weather[0].description}
                        className="w-24 h-24 drop-shadow-lg"
                    />
                </div>

                {/* Temperature */}
                <div className="mb-8">
                    <div className="flex items-start">
                        <span className="text-7xl font-bold text-white">
                            {tempCelsius}
                        </span>
                        <span className="text-4xl font-light text-white/80 mt-2">
                            °C
                        </span>
                    </div>
                    <p className="text-white/60 mt-2">
                        Feels like {feelsLikeCelsius}°C
                    </p>
                </div>

                {/* Weather Details */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                        <p className="text-white/60 text-sm mb-1">Humidity</p>
                        <p className="text-2xl font-semibold text-white">
                            {data.main.humidity}%
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                        <p className="text-white/60 text-sm mb-1">Wind Speed</p>
                        <p className="text-2xl font-semibold text-white">
                            {Math.round(data.wind.speed * 3.6)} km/h
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                        <p className="text-white/60 text-sm mb-1">Pressure</p>
                        <p className="text-2xl font-semibold text-white">
                            {data.main.pressure} hPa
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
