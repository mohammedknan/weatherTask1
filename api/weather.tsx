import axios from "axios";

const API_KEY = "7352b4e8e6f341c198324a814cef5180";

const weatherAPI = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});



export const fetchWeather = async (city: string) => {
  try {
    const response = await weatherAPI.get(`weather`, {
      params: {
        q: city,
        appid: API_KEY,
  
      },
    });
        return response.data;

  } catch (error) {
    console.error("Error fetching weather:", error);
    throw new Error("Failed to fetch weather data");
  }
};






