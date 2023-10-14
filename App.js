import { Alert, StyleSheet } from "react-native";
import Loader from "./components/loader";
import { useEffect, useState } from "react";
import Weather from "./components/weather";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "398881b620ac7e110ce493db6886fe95";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);

  const getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    setLocation(data);
    setIsLoading(false);
  };

  const setWeather = async (query) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
    );
    setLocation(data);
    setIsLoading(false);
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      getWeather(latitude, longitude);
    } catch (err) {
      Alert.alert("I can't find your current location, so bad ):");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Weather
      temp={location.main.temp}
      name={location.name}
      condition={location.weather[0].main}
      setWeather={setWeather}
    />
  );
}

const styles = StyleSheet.create({});
