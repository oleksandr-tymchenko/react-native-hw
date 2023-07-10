import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostScreen";
import ProfileScreen from "./ProfileScreen";
import { useRoute } from "@react-navigation/native";

const MainTab = createBottomTabNavigator();

// !!!!!!!!!!!!!!!!!
const HomeScreen = () => {
  const route = useRoute();

  return (
    <MainTab.Navigator
      // screenOptions={{ tabBarLabel: () => false }}
      screenOptions={({ route }) => ({
        tabBarStyle: { alignItems: "stretch" },
        tabBarLabel: () => false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Post") {
            iconName = focused ? "grid-sharp" : "grid-outline";
          } else if (route.name === "CreatePost") {
            iconName = focused ? "add-circle-sharp" : "add-circle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-sharp" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        // justifyContent: "spa",
        activeTintColor: "#FF6C00",
        inactiveTintColor: "#212121",
      }}
    >
      <MainTab.Screen
        name="Post"
        component={PostsScreen}
        // options={{ headerShown: false }}
        options={{
          title: "Публікації",

          headerRight: () => (
            <View>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                activeOpacity={0.8}
                // onPress={keyboardHide}
                onPress={() => {
                  navigation.navigate("Home");
                }}
              >
                <Ionicons
                  name={"log-out-outline"}
                  style={{ fontSize: 30, color: "#BDBDBD" }} // Змінити розмір іконки на 30
                />
                {/* <Text style={styles.btnTitle}>Увійти</Text> */}
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        // options={{ title: "Створити публікацію" }}
        options={{
          title: "Створити публікацію",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "add-circle-sharp" : "add-circle-outline"}
              style={{ fontSize: 40, color: color }} // Змінити розмір іконки на 30
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </MainTab.Navigator>
  );
};

export default HomeScreen;
