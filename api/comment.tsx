
import axios from "axios";

const API_KEY = "7352b4e8e6f341c198324a814cef5180";

const weatherAPI = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});


export const fetchWeather12 = async (city: string) => {
  try {
    if (!city) {
      throw new Error("City name is required");
    }

    console.log("Fetching weather for:", city); 

    const response = await weatherAPI.get("forecast", {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric", 
      },
    });


    return response.data;
  } catch (error: any) {
    console.error("Error fetching weather:", error.response.data || error);
    throw new Error("Failed to fetch weather data");
  }
};








