// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// export default App = () => (
//   <View style={styles.container}>
//     <Text style={styles.title}>React Native</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 2,
//     padding: 24,
//     backgroundColor: "#eaeaea",
//   },
//   title: {
//     marginTop: 16,
//     paddingVertical: 8,
//     borderWidth: 4,
//     borderColor: "#20232a",
//     borderRadius: 6,
//     backgroundColor: "#61dafb",
//     color: "#20232a",
//     textAlign: "center",
//     fontSize: 30,
//     fontWeight: "bold",
//   },
// });

// const COURSES = [
//   {
//     id: "45k6-j54k-4jth",
//     title: "HTML",
//   },
//   {
//     id: "4116-jfk5-43rh",
//     title: "JavaScript",
//   },
//   {
//     id: "4d16-5tt5-4j55",
//     title: "React",
//   },
//   {
//     id: "LG16-ant5-0J25",
//     title: "React Native",
//   },
// ];

// export default function App() {
//   const [courses, setCourses] = useState(COURSES);

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         {courses.map((course) => (
//           <Text key={course.id}>{course.title}</Text>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#ecf0f1",

//     paddingTop: 50,
//   },
// });
// import React, { useState } from "react";
// import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

// const PositionLayout = () => {
//   const [position, setPosition] = useState("relative");

//   return (
//     <PreviewLayout
//       label="position"
//       selectedValue={position}
//       values={["relative", "absolute"]}
//       setSelectedValue={setPosition}
//     >
//       <View
//         style={[
//           styles.box,
//           {
//             top: 25,
//             left: 25,
//             position,
//             backgroundColor: "powderblue",
//           },
//         ]}
//       />
//       <View
//         style={[
//           styles.box,
//           {
//             top: 50,
//             left: 50,
//             position,
//             backgroundColor: "skyblue",
//           },
//         ]}
//       />
//       <View
//         style={[
//           styles.box,
//           {
//             top: 75,
//             left: 75,
//             position,
//             backgroundColor: "steelblue",
//           },
//         ]}
//       />
//     </PreviewLayout>
//   );
// };

// const PreviewLayout = ({
//   label,
//   children,
//   values,
//   selectedValue,
//   setSelectedValue,
// }) => (
//   <View style={{ padding: 10, flex: 1 }}>
//     <Text style={styles.label}>{label}</Text>
//     <View style={styles.row}>
//       {values.map((value) => (
//         <TouchableOpacity
//           key={value}
//           onPress={() => setSelectedValue(value)}
//           style={[styles.button, selectedValue === value && styles.selected]}
//         >
//           <Text
//             style={[
//               styles.buttonLabel,
//               selectedValue === value && styles.selectedLabel,
//             ]}
//           >
//             {value}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//     <View style={styles.container}>{children}</View>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 8,
//     backgroundColor: "aliceblue",
//     minHeight: 200,
//   },
//   box: {
//     width: 50,
//     height: 50,
//   },
//   row: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   button: {
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     borderRadius: 4,
//     backgroundColor: "oldlace",
//     alignSelf: "flex-start",
//     marginHorizontal: "1%",
//     marginBottom: 6,
//     minWidth: "48%",
//     textAlign: "center",
//   },
//   selected: {
//     backgroundColor: "coral",
//     borderWidth: 0,
//   },
//   buttonLabel: {
//     fontSize: 12,
//     fontWeight: "500",
//     color: "coral",
//   },
//   selectedLabel: {
//     color: "white",
//   },
//   label: {
//     textAlign: "center",
//     marginBottom: 10,
//     fontSize: 24,
//   },
// });

// export default PositionLayout;
// Приклад налаштування хедера в компоненті Home

// import "react-native-gesture-handler";
// import React from "react";
// import { Button } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import Login from "./screens/Login";
// import Register from "./screens/Register";
// import Home from "./screens/Home";

// const MainStack = createStackNavigator();

// export default TestingScreen = () => {
//   return (
//     <NavigationContainer>
//       <MainStack.Navigator initialRouteName="Registration">
//         <MainStack.Screen name="Registration" component={Register} />
//         <MainStack.Screen name="Login" component={Login} />
//         <MainStack.Screen
//           name="Home"
//           component={Home}
//           options={{
//             title: "Home screen",
//             headerStyle: {
//               backgroundColor: "#f4511e",
//             },
//             headerTintColor: "#fff",
//             headerTitleStyle: {
//               fontWeight: "bold",
//               fontSize: 20,
//             },
//             headerRight: () => (
//               <Button
//                 onPress={() => alert("This is a button!")}
//                 title="Press me"
//                 color="#fff"
//               />
//             ),
//           }}
//         />
//       </MainStack.Navigator>
//     </NavigationContainer>
//   );
// };
