
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { RouteProp } from "@react-navigation/native";

  export interface DetailsScreenProps {
      route: RouteProp<RootStackParamList, "DetailsScreen">;
    }
    
    export  interface ForecastItem {
        dt_txt: string;
        main: {
          temp: number;
          temp_min: number;
          temp_max: number;
        };
      }
      

    export interface Result {
        navigation: StackNavigationProp<RootStackParamList, "SearchScreen">;
      }

     export interface SearchScreenProps {
        navigation: StackNavigationProp<RootStackParamList, "DetailsScreen">;
        route: RouteProp<RootStackParamList, "SearchScreen">;
      }


      export type SearchProp = {
        term: string;
        onTermChange: (newTerm: string) => void;
        onTermSubmit: () => void;
      };
    


      export interface WeatherData {
        name: string;
        main: {
          temp: number;
          temp_min: number;
          temp_max: number;
          humidity : number;
        };
        wind:{
          speed:number
        }
        
      }
      