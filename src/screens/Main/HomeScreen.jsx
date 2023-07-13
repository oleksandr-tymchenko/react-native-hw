import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostScreen";
import ProfileScreen from "./ProfileScreen";

const MainTab = createBottomTabNavigator();
// const AddTab = createStackNavigator();
// const CreatePostStack = () => (
//   <AddTab.Navigator>
//     <AddTab.Screen
// name="CreatePost"
// component={CreatePostScreen}
//       options={{ headerShown: false }}
//     />
//   </AddTab.Navigator>
// );
const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <MainTab.Navigator
      // screenOptions={{ tabBarLabel: () => false }}
      screenOptions={({ route }) => ({
        // tabBarStyle: { alignItems: "stretch" },
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "#212121",
        // tabBarItemStyle: { justifyContent: "center" },
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
    >
      <MainTab.Screen
        name="Post"
        component={PostsScreen}
        options={{ headerShown: false }}
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
