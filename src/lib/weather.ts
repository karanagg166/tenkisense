import toast from "react-hot-toast";

export const getWeatherData = async (city: string) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    if (!apiKey) {
        toast.error("API key not found");
        throw new Error("API key not found");
    }
    const res = await fetch(url);
    console.log(res);
    if (!res.ok) {
        toast.error("Failed to fetch weather data");
        throw new Error("Failed to fetch weather data");
    }
    const data = await res.json();
    return data;

}