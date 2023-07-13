import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
const MapScreen = () => {
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      // Виклик створення карти після завершення макету
      // Код картографії
    }, 0);
    return () => {
      clearTimeout(timeOutId);
    };
  }, []);
  return (
    <View style={styles.container}>
      {/* <Text>Map</Text> */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.022,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="travel photo"
        />
      </MapView>
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
export default MapScreen;
