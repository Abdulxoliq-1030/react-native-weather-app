import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box1}></View>
      <View style={styles.box2}></View>
      <View style={styles.box3}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    flex: 1,
    backgroundColor: "yellow",
  },
  box2: {
    flex: 2,
    backgroundColor: "blue",
  },
  box3: {
    flex: 2,
    backgroundColor: "orange",
  },
});
