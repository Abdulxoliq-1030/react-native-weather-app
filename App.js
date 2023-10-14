import { Alert, StyleSheet, Text, View } from "react-native";
import Loader from "./components/loader";
import { useEffect, useState } from "react";
import Weather from "./components/weather";
import * as Location from "expo-location";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

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
      setLocation({
        latitude,
        longitude,
      });
    } catch (err) {
      Alert.alert("I can't find your current location, so bad ):");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getLocation();
      setIsLoading(false);
    }, 2000);
  }, []);

  return isLoading ? <Loader /> : <Weather />;
}

const styles = StyleSheet.create({});
