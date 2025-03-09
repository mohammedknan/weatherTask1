import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { DetailsStyle } from "../styles/style";
import useResults1 from "../hooks/useResults1";
import { DetailsScreenProps, ForecastItem } from "../types/type";

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { term } = route.params;
  const { searchApi1, results1 } = useResults1();
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    searchApi1(term);
  }, [term]);

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  const filteredData: ForecastItem[] = results1?.list
    ?.filter((item: ForecastItem, index: number, self: ForecastItem[]) => {
      const date: string = item.dt_txt.split(" ")[0];
      return self.findIndex((el: ForecastItem) => el.dt_txt.split(" ")[0] === date) === index;
    })
    .slice(1, 6) || [];

  return (
    <View style={DetailsStyle.container}>
      {results1 ? (
        <>
          <Text style={DetailsStyle.cityName}>{results1.city.name}</Text>

          {showChart && (
            <View>
              <LineChart
                data={{
                  labels: filteredData.map((item: ForecastItem) => item.dt_txt.split(" ")[0]),
                  datasets: [
                    {
                      data: filteredData.map((item: ForecastItem) => item.main.temp_max),
                      color: () => "#FF5733",
                      strokeWidth: 2,
                    },
                    {
                      data: filteredData.map((item: ForecastItem) => item.main.temp_min),
                      color: () => "#3498DB",
                      strokeWidth: 2,
                    },
                  ],
                }}
                width={350}
                height={220}
                yAxisSuffix="°C"
                chartConfig={{
                  backgroundGradientFrom: "#f5f5f5",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: { borderRadius: 16 },
                  propsForDots: {
                    r: "5",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{ marginVertical: 8, borderRadius: 16 }}
              />
            </View>
          )}

          <ScrollView>
            {filteredData.map((item: ForecastItem, index: number) => (
              <View key={index} style={DetailsStyle.card}>
                <Text style={DetailsStyle.date}>{item.dt_txt}</Text>
                <Text style={DetailsStyle.temp}> Temp: <Text style={DetailsStyle.bold}>{item.main.temp}°C</Text></Text>
                <Text>🔼 Max: {item.main.temp_max}°C</Text>
                <Text>🔽 Min: {item.main.temp_min}°C</Text>
              </View>
            ))}
          </ScrollView>

          <Button title={showChart ? "Hide Chart" : "Show Chart"} onPress={toggleChart} />
        </>
      ) : (
        <Text style={DetailsStyle.loading}>Loading data...</Text>
      )}
    </View>
  );
};

export default DetailsScreen;
