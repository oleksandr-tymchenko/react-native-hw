import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CommentsScreen from "../NestedScreens/CommentsScreen";
import MapScreen from "../NestedScreens/MapScreen";
import DefaultPostsScreen from "../NestedScreens/DefaultPostsScreen";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../../Redux/Auth/authOperations";
// import CreatePostScreen from "./CreatePostScreen";

const nestedStack = createStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <nestedStack.Navigator>
      <nestedStack.Screen
        name="DefaultPosts"
        component={DefaultPostsScreen}
        options={{
          title: "Публікації",
          headerStyle: { borderBottomColor: "#BDBDBD", borderWidth: 1 },
          headerRight: () => (
            <View>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                activeOpacity={0.8}
                onPress={signOut}
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
        // options={{ headerShown: false }}
      />
      <nestedStack.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Карта" }}
        // options={{ tabBarVisible: false }}
      />
      <nestedStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ title: "Коментарі" }}
        // options={{ headerShown: false }}
        // options={{ tabBarVisible: false }}
      />
    </nestedStack.Navigator>
  );
};
export default PostsScreen;

// import React, { useEffect, useState } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import user from "../../../assets/images/User.jpg";
// import { useNavigation, useRoute } from "@react-navigation/native";
// const PostsScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [posts, setPosts] = useState([]);
//   useEffect(() => {
//     if (route.params) {
//       setPosts((pevState) => [...pevState, route.params]);
//     }
//   }, [route.params]);
//   console.log("posts", posts);
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={posts}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View
//             style={{
//               marginBottom: 10,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Image
//               source={{ uri: item.photo }}
//               style={{ width: 350, height: 200 }}
//             />
//           </View>
//         )}
//       />
//       {/* <View style={styles.userWrap}>
//         <Image style={styles.userImg} source={user} />
//         <View>
//           <Text style={styles.userName}>Nataly Shevchenko</Text>
//           <Text style={styles.userEmail}>email@google.com</Text>
//         </View>
//       </View> */}
//       <TouchableOpacity
//         style={styles.navLink}
//         onPress={() => navigation.navigate("Register")}
//         activeOpacity={0.5}
//       >
//         <Text style={styles.navLinkText}>
//           Немає акаунту?{" "}
//           <Text style={{ color: `#0000cd` }}>Зареєструватися</Text>
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     backgroundColor: "#FFFFFF",
//     // backgroundColor: "white",
//     // alignItems: "flex-start",
//   },
//   userWrap: {
//     flexDirection: "row",
//     marginTop: 20,
//     // alignItems: "center",
//   },
//   // userInfo: {
//   //   flexDirection: "column",
//   // },
//   userImg: {
//     width: 60,
//     marginRight: 10,
//   },

//   userName: {
//     fontFamily: "Roboto-Bold",
//     fontSize: 13,
//   },
//   userEmail: {
//     fontFamily: "Roboto-Regular",
//     fontSize: 11,
//   },
//   navLink: {
//     marginTop: 16,
//     alignItems: "center",
//   },
//   navLinkText: {
//     color: "#1B4371",
//     textAlign: "center",
//     fontSize: 16,
//     justifyContent: "center",

//     fontFamily: "Roboto-Regular",
//   },
// });
// export default PostsScreen;
