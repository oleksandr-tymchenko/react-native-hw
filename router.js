import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./src/screens/Auth/RegistrationScreen";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import HomeScreen from "./src/screens/Main/HomeScreen";
import PostsScreen from "./src/screens/Main/PostsScreen";
import CreatePostScreen from "./src/screens/Main/CreatePostScreen";
import CommentsScreen from "./src/screens/RestedScreens/CommentsScreen";
import MapScreen from "./src/screens/RestedScreens/MapScreen";
import ProfileScreen from "./src/screens/Main/ProfileScreen";
import TestingScreen from "./src/screens/TestingScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};
// return (
//   <MainTab.Navigator screenOptions={{ tabBarLabel: () => false }}>
//     <MainTab.Screen
//       name="Post"
//       component={PostsScreen}
//       options={{ headerShown: false }}
//     />
//     <MainTab.Screen
//       name="CreatePost"
//       component={CreatePostScreen}
//       options={{ headerShown: false }}
//     />
//     <MainTab.Screen
//       name="Profile"
//       component={ProfileScreen}
//       options={{ headerShown: false }}
//     />
{
  /* <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />

      <MainTab.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerShown: false }}
      /> */
}
// </MainTab.Navigator>
//   );
// };

// !1111111111111111111
// export const useRoute = (isAuth) => {
//   if (!isAuth) {
//     return (
//       <AuthStack.Navigator>
//         <AuthStack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{ headerShown: false }}
//         />
//         <AuthStack.Screen
//           name="Register"
//           component={RegistrationScreen}
//           options={{ headerShown: false }}
//         />
//       </AuthStack.Navigator>
//     );
//   }
//   return (
// <MainTab.Navigator screenOptions={{ tabBarLabel: () => false }}>
//   <MainTab.Screen
//     name="Post"
//     component={PostsScreen}
//     options={{ headerShown: false }}
//   />
//   <MainTab.Screen
//     name="CreatePost"
//     component={CreatePostScreen}
//     options={{ headerShown: false }}
//   />
//   <MainTab.Screen
//     name="Profile"
//     component={ProfileScreen}
//     options={{ headerShown: false }}
//   />
//   {/* <MainTab.Screen
//     name="Home"
//     component={HomeScreen}
//     options={{ headerShown: false }}
//   />
//   <MainTab.Screen
//     name="Map"
//     component={MapScreen}
//     options={{ headerShown: false }}
//   />

//   <MainTab.Screen
//     name="Comments"
//     component={CommentsScreen}
//     options={{ headerShown: false }}
//   /> */}
// </MainTab.Navigator>
//   );
// };
