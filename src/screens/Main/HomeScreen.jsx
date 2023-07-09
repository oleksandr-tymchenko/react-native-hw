import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostScreen";
import ProfileScreen from "./ProfileScreen";
import { useRoute } from "@react-navigation/native";

const MainTab = createBottomTabNavigator();

// const HomeScreen = () => {
//   <Tabs.Navigator
//   // screenOptions={({ route }) => ({
//   //   tabBarIcon: ({ focused, color, size }) => {
//   //     let iconName;

//   //     if (route.name === "Posts") {
//   //       iconName = focused
//   //         ? "ios-information-circle"
//   //         : "ios-information-circle-outline";
//   //     } else if (route.name === "CreatePosts") {
//   //       iconName = focused ? "ios-list-box" : "ios-list";
//   //     } else if (route.name === "Profile") {
//   //       iconName = focused ? "ios-list-box" : "ios-list";
//   //     }
//   //     return <Ionicons name={iconName} size={size} color={color} />;
//   //   },
//   // })}
//   // tabBarOptions={{
//   //   activeTintColor: "tomato",
//   //   inactiveTintColor: "gray",
//   // }}
//   >
//     <Tabs.Screen name="Posts" component={PostsScreen} />
//     <Tabs.Screen name="CreatePosts" component={CreatePostScreen} />

//     <Tabs.Screen name="Profile" component={ProfileScreen} />
//   </Tabs.Navigator>;
// };
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// // });
// export default HomeScreen;

// !!!!!!!!!!!!!!!!!
const HomeScreen = () => {
  const route = useRoute();
  // const routeName = route.params;
  // console.log(routeName);
  return (
    <MainTab.Navigator
      // screenOptions={{ tabBarLabel: () => false }}
      screenOptions={({ route }) => ({
        tabBarLabel: () => false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Post") {
            iconName = focused ? "grid-sharp" : "grid-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-sharp" : "person-outline";
          } else if (route.name === "CreatePost") {
            iconName = focused ? "add-circle-sharp" : "add-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <MainTab.Screen
        name="Post"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{ headerShown: false }}
        size="50"
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
