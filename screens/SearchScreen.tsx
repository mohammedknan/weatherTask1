import React, { useCallback, useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { debounce } from "lodash";

import Search from "../components/Search";
import useResults from "../hooks/useResults";
import useResults1 from "../hooks/useResults1";
import { RootState, AppDispatch, setCities, addCity } from "../redux/store";
import { searchStyle } from "../styles/style";
import { SearchScreenProps } from "../types/type";

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cities = useSelector((state: RootState) => state.city.city);
  const [term, setTerm] = useState<string>("");

  const { searchApi, results } = useResults();
  const { searchApi1, results1 } = useResults1();

  const termFromParams = route.params?.term ?? "";

  useEffect(() => {
    loadCities();
    if (termFromParams) {
      searchApi(termFromParams);
      searchApi1(termFromParams);
    }
  }, [termFromParams]);

  const loadCities = async () => {
    try {
      const storedCities = await AsyncStorage.getItem("cities");
      if (storedCities) {
        dispatch(setCities(JSON.parse(storedCities)));
      }
    } catch (error) {
      console.error("Error loading cities from AsyncStorage", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm.trim()) return;

      const response = await searchApi(searchTerm);
      await searchApi1(searchTerm);

      if (response?.name) {
        const newCity = { city: searchTerm };

        if (!cities.some((c) => c.city.toLowerCase() === newCity.city.toLowerCase())) {
          const updatedCities = [...cities, newCity];

          try {
            await AsyncStorage.setItem("cities", JSON.stringify(updatedCities));
            dispatch(addCity(newCity));
          } catch (error) {
            console.error("Error saving city to AsyncStorage", error);
          }
        }
      } else {
        console.warn("City not found or invalid");
      }
    }, 5000),
    [cities, dispatch]
  );

  useEffect(() => {
    debouncedSearch(term);
    return () => debouncedSearch.cancel();
  }, [term]);

  return (
    <View style={searchStyle.container}>
      <Search term={term} onTermChange={setTerm} onTermSubmit={() => debouncedSearch(term)} />
      <View style={searchStyle.btn}>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate("DetailsScreen", { term })}
        />
      </View>

      <View>
        <Text style={{ fontSize: 25, alignSelf: "center" }}>{results?.name}</Text>
        <Text style={{ fontSize: 25 }}>Current :</Text>

        {results?.name ? (
          <View style={searchStyle.txt}>
            <Text>Temp: {results?.main?.temp}</Text>
            <Text>Min Temp: {results?.main?.temp_min}</Text>
            <Text>Max Temp: {results?.main?.temp_max}</Text>
            <Text>Humidity: {results?.main?.humidity}</Text>
            <Text>Wind Speed: {results?.wind?.speed}</Text>
          </View>
        ) : (
          <Text>No results</Text>
        )}
      </View>

      <View>
        {results1 ? (
          <>
            <Text style={{ fontSize: 25 }}>Forecast :</Text>
            {results1.list?.length > 0 ? (
              <View style={searchStyle.txt}>
                <Text>Date and Time: {results1.list[0].dt_txt}</Text>
                <Text>Temp: {results1.list[0].main.temp}°C</Text>
                <Text>Date and Time: {results1.list[1].dt_txt}</Text>
                <Text>Temp: {results1.list[1].main.temp}°C</Text>
              </View>
            ) : (
              <Text>No forecast data available</Text>
            )}
          </>
        ) : (
          <Text>Loading data...</Text>
        )}
      </View>
    </View>
  );
};

export default SearchScreen;


{/* <Text>Time: {results1.list[0].dt_txt.split(" ")[1]}</Text> */}
{/* <Text>Time: {results1.list[0].dt_txt.split(" ")[1].slice(0, 5)}</Text> */}
