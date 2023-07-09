import React, { useState } from "react";
import {
  ImageBackground,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import validator from "validator";

import background from "../../../assets/images/background.jpg";
import { useNavigation } from "@react-navigation/native";

const initialState = {
  email: "",
  password: "",
};

export default LoginScreen = () => {
  const navigation = useNavigation();

  const [isValid, setIsValid] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocusedInput, setIsFocusedInput] = useState(null);
  const [state, setState] = useState(initialState);
  const validEmail = (value) => {
    const isValidEmail = validator.isEmail(value);
    setIsValid(isValidEmail);
  };
  const keyboardHide = () => {
    if (!isValid && state.email.length > 0) return;

    setIsShowKeyboard(false);

    Keyboard.dismiss();
    if (state !== initialState) {
      console.log(state);
      setState(initialState);
    }
  };

  const handleFocus = (key) => {
    setIsFocusedInput(key);
    setIsShowKeyboard(true);
  };
  const handleBlur = () => {
    setIsFocusedInput(null);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.image}
        >
          <View
            style={{
              ...styles.form,
              paddingBottom: isShowKeyboard ? 120 : 80,
            }}
          >
            <Text style={styles.formTitle}>Увійти</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View>
                <TextInput
                  style={[
                    styles.input,
                    isFocusedInput === "input2" ? styles.focusedInput : null,
                  ]}
                  placeholder="Адреса електронної пошти"
                  onFocus={() => handleFocus("input2")}
                  onBlur={handleBlur}
                  value={state.email}
                  onChangeText={(value) => {
                    setState((prevState) => ({ ...prevState, email: value }));
                    validEmail(value);
                  }}
                />

                {!isValid && state.email.length > 0 && (
                  <Text style={{ color: `#ff0000` }}>Email is not valid</Text>
                )}
              </View>
              <View style={{ marginTop: 16, position: "relative" }}>
                <TextInput
                  style={[
                    styles.input,
                    isFocusedInput === "input3" ? styles.focusedInput : null,
                  ]}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  onFocus={() => handleFocus("input3")}
                  onBlur={handleBlur}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity style={styles.showPasswordBtn}>
                  <Text style={styles.passwordText}>Показати</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                // onPress={keyboardHide}
                onPress={() => {
                  navigation.navigate("Home", {
                    screen: "Posts",
                    params: { userId: `${state.email}` },
                  });
                }}
              >
                <Text style={styles.btnTitle}>Увійти</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navLink}
                onPress={() => navigation.navigate("Register")}
                activeOpacity={0.5}
              >
                <Text style={styles.navLinkText}>
                  Немає акаунту?{" "}
                  <Text style={{ color: `#0000cd` }}>Зареєструватися</Text>
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    // resizeMode: "cover",
    justifyContent: "flex-end",
    position: "relative",
  },
  form: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 32,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    // marginBottom: 150,
    // paddingBottom: 150,
  },

  formTitle: {
    color: "#212121",
    textAlign: "center",

    justifyContent: "center",
    marginBottom: 32,
    fontSize: 30,
    fontFamily: "Roboto-Medium",
  },

  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#f0f8ff",

    borderRadius: 5,
    height: 50,

    color: "#212121",
    backgroundColor: "#E8E8E8",
  },
  focusedInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#f0f8ff",

    borderRadius: 5,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderColor: "#FF6C00",
  },

  showPasswordBtn: {
    position: "absolute",
    top: 15,
    right: 16,
  },

  btn: {
    height: 50,
    borderRadius: 100,
    marginTop: 43,
    padding: 15,
    backgroundColor: "#FF6C00",
    // alignItems: "center",
    // justifyContent: "center",
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    // alignItems: "center",
    // justifyContent: "center",
    alignSelf: "center",
  },
  navLink: {
    marginTop: 16,
    alignItems: "center",
  },
  navLinkText: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
    justifyContent: "center",

    fontFamily: "Roboto-Regular",
  },
});
