import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import MyForm from "./src/screens/LoginScreen";
import PostsScreen from "./src/screens/PostsScreen";

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    // метод для закр клавиат по клику
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        {/* <StatusBar style="auto" /> */}
        <RegistrationScreen />
        {/* <PostsScreen/> */}
        {/* <MyForm /> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

// import { StatusBar } from "expo-status-bar";
// // import { useState } from "react";
// // import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
// import React, { useState } from "react";
// import {
//   ImageBackground,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   KeyboardAvoidingView,
//   Keyboard,
// } from "react-native";
// import background from "./assets/images/background.jpg";
// import RegistrationScreen from "./src/screens/RegistrationScreen";
// import MyForm from "./src/screens/LoginScreen";

// export default function App() {
//   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
//   const keyboardHide = () => {
//     setIsShowKeyboard(false);
//     // метод для закр клавиат по клику
//     Keyboard.dismiss();
//   };
//   return (
//     <View style={styles.container}>
//       {/* <Text>Open up App.js to start working on your app!</Text> */}
//       {/* <StatusBar style="auto" /> */}
//       {/* <RegistrationScreen /> */}
//       {/* <MyForm /> */}
//       <ImageBackground
//         source={background}
//         // resizeMode="contain"
//         style={styles.image}
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//         >
//           {/* <View style={styles.formWrap}> */}
//           <View
//             // style={{ ...styles.form, marginBottom: isShowKeyboard ? 400 : 400 }}
//             style={styles.form}
//           >
//             <View>
//               <Text style={styles.inputTitle}>EMAIL ADDRES</Text>
//               <TextInput
//                 style={styles.input}
//                 textAlign={"center"}
//                 onFocus={() => setIsShowKeyboard(true)}
//               />
//             </View>
//             <View style={{ marginTop: 20 }}>
//               <Text style={styles.inputTitle}>PASSWORD</Text>
//               <TextInput
//                 style={styles.input}
//                 textAlign={"center"}
//                 secureTextEntry={true}
//                 onFocus={() => setIsShowKeyboard(true)}
//               />
//             </View>
//             {/* <Button title="SIGN IN" /> */}
//             <TouchableOpacity
//               style={styles.btn}
//               activeOpacity={0.8}
//               onPress={keyboardHide}
//             >
//               <Text style={styles.btnTitle}>SIGN ON</Text>
//             </TouchableOpacity>
//           </View>
//           {/* </View> */}
//         </KeyboardAvoidingView>
//       </ImageBackground>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     // alignItems: "center",
//     // justifyContent: "center",
//   },
//   image: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "flex-end",
//     // width: "100%",
//     // justifyContent: "center",

//     // alignItems: "center",
//   },
//   // formWrap: {
//   //   backgroundColor: "#f0f8ff",
//   //   borderTopLeftRadius: 20,
//   //   borderTopRightRadius: 20,
//   // },
//   form: {
//     // borderTopEndRadius: 10,
//     // marginHorizontal: 40,
//     // ? це для відступів, коли виїзджає клаватура
//     marginBottom: 100,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#f0f8ff",

//     borderRadius: 5,
//     height: 40,
//     // marginHorizontal: 40,
//     // paddingHorizontal: 10,
//     color: "#f0f8ff",
//   },
//   inputTitle: {
//     color: "#fff",
//     // alignItems: "center",
//     marginBottom: 5,
//     fontSize: 18,
//   },
//   btn: {
//     height: 40,
//     borderRadius: 5,
//     marginTop: 40,
//     padding: 5,
//     borderWidth: 1,
//     marginHorizontal: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     // backgroundColor: Platform.OS === "ios" ? "transparent" : "#6495ed",
//     // // backgroundColor: "#6495ed",
//     // borderColor: Platform.OS === "ios" ? "#f0f8ff" : "transparent",
//     ...Platform.select({
//       ios: {
//         backgroundColor: "transparent",
//         borderColor: "#f0f8ff",
//       },
//       android: {
//         backgroundColor: "#6495ed",
//         borderColor: "transparent",
//       },
//     }),
//   },
//   btnTitle: {
//     // color: "#fff",
//     color: Platform.OS === "ios" ? "#0000ff" : "#f0f8ff",
//   },
// });
