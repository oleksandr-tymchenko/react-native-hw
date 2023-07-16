import React, { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
const MapScreen = ({ route }) => {
  console.log("route.params.location", route.params.location);
  const { latitude, longitude, latitudeDelta, longitudeDelta } =
    route.params.location;
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
        style={styles.mapStyle}
        initialRegion={{
          latitude,
          longitude,
          // latitudeDelta: 0.0022,
          // longitudeDelta: 0.00421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="travel photo" />
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
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
export default MapScreen;
