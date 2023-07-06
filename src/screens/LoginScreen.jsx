// import React, { useState } from "react";
// import {
//   View,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   KeyboardAvoidingView,
//   Keyboard,
// } from "react-native";
// import background from "../../assets/images/background.jpg";
// const MyForm = () => {
//   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
//   const keyboardHide = () => {
//     setIsShowKeyboard(false);
//     // метод для закр клавиат по клику
//     Keyboard.dismiss();
//   };
//   return (
//     <KeyboardAvoidingView style={styles.container} behavior="padding">
//       <Image source={background} style={styles.backgroundImage} />
//       <View style={styles.formContainer}>
//         <View>
//           <Text style={styles.inputTitle}>EMAIL ADDRES</Text>
//           <TextInput
//             style={styles.input}
//             textAlign={"center"}
//             onFocus={() => setIsShowKeyboard(true)}
//           />
//         </View>
//         <View style={{ marginTop: 20 }}>
//           <Text style={styles.inputTitle}>PASSWORD</Text>
//           <TextInput
//             style={styles.input}
//             textAlign={"center"}
//             secureTextEntry={true}
//             onFocus={() => setIsShowKeyboard(true)}
//           />
//         </View>
//         {/* <Button title="SIGN IN" /> */}
//         <TouchableOpacity
//           style={styles.btn}
//           activeOpacity={0.8}
//           onPress={keyboardHide}
//         >
//           <Text style={styles.btnTitle}>SIGN ON</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // position: "relative",
//   },
//   backgroundImage: {
//     resizeMode: "cover",
//     // flex: 2,
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   formContainer: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     justifyContent: "flex-end",
//     // position: "absolute",
//     // bottom: 0,
//     // left: 0,
//     // right: 0,
//     // height: "66.67%",
//     // backgroundColor: "white",
//     // paddingHorizontal: 20,
//     // paddingBottom: 20,
//   },
// });

// export default MyForm;
