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
} from "react-native";

import background from "../../assets/images/background.jpg";

const initialState = {
  email: "",
  password: "",
};

export default LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocusedInput, setIsFocusedInput] = useState(null);
  const [state, setState] = useState(initialState);
  const keyboardHide = () => {
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
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
      >
        {/* <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      > */}
        <View
          style={{
            ...styles.form,
            paddingBottom: isShowKeyboard ? 120 : 80,
            //   marginBottom: isShowKeyboard ? 200 : 0,
          }}
          //   style={styles.form}
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
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
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
              onPress={keyboardHide}
            >
              <Text style={styles.btnTitle}>Увійти</Text>
            </TouchableOpacity>

            <Text style={styles.formText}>Немає акаунту? Зареєструватися</Text>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
  formText: {
    color: "#212121",
    textAlign: "center",

    justifyContent: "center",
    marginTop: 16,
    fontFamily: "Roboto-Regular",
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
    padding: 16,
    backgroundColor: "#FF6C00",
    alignItems: "center",
  },
  btnTitle: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
  },
});
