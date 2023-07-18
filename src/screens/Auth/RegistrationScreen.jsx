import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Image,
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
import add from "../../../assets/images/add.png";
import { useNavigation } from "@react-navigation/native";
import {
  authSignInUser,
  authSignUpUser,
  authSignOutUser,
} from "../../../Redux/Auth/authOperations";
import { useDispatch } from "react-redux";
import { GlobalStyles } from "../../../GlobalStyles";

const initialState = {
  nickName: "",
  email: "",
  password: "",
};

export default RegistrationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [secureText, setSecureText] = useState(true);
  const [isFocusedInput, setIsFocusedInput] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    const { nickName, email, password } = state;
    const isValidName = nickName.trim().length >= 4;
    const isValidEmail = validator.isEmail(email);
    const isValidPassword = password.trim().length >= 8;
    // const isValidPassword = validator.isAlphanumeric(password)
    setIsValid(isValidName && isValidEmail && isValidPassword);
  };
  useEffect(() => {
    validateForm();
  }, [state.nickName, state.email, state.password]);
  // const validEmail = (value) => {
  //   const email = validator.isEmail(value);

  //   setIsValidEmail(email);
  // };
  const keyboardHide = () => {
    // if (!isValid && state.email.length > 0) return;
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    // if (state !== initialState) {
    //   console.log(state);
    //   setState(initialState);
    // }
  };
  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    dispatch(authSignUpUser(state));
    setState(initialState);
  };

  const handleFocus = (key) => {
    setIsShowKeyboard(true);
    setIsFocusedInput(key);
  };
  const handleBlur = () => {
    setIsFocusedInput(null);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={GlobalStyles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.backgroundImg}
        >
          <View
            style={{
              ...styles.form,
              paddingBottom: isShowKeyboard ? 120 : 45,
              // marginBottom: isShowKeyboard ? 100 : 0,
            }}
            // style={styles.form}
          >
            <View style={styles.acauntImgWrap}>
              <Image />
            </View>
            <Image style={styles.addImg} source={add} />
            <Text style={styles.formTitle}>Реєстрація</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View>
                <TextInput
                  style={[
                    styles.input,
                    isFocusedInput === "input1" ? styles.focusedInput : null,
                  ]}
                  placeholder="Логін"
                  onFocus={() => handleFocus("input1")}
                  onBlur={handleBlur}
                  value={state.nickName}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, nickName: value }))
                  }
                />
                {state.nickName.length > 0 && state.nickName.length < 4 && (
                  <Text style={{ color: `#ff0000` }}>
                    Логін має містити не менше 4 символів
                  </Text>
                )}
              </View>
              <View style={{ marginTop: 16 }}>
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
                    // validEmail(value);
                  }}
                />
                {state.email.length > 0 && !validator.isEmail(state.email) && (
                  <Text style={{ color: `#ff0000` }}>
                    Поле Email заповнено не коректно
                  </Text>
                )}
              </View>
              <View style={{ marginTop: 16, position: "relative" }}>
                <TextInput
                  style={[
                    styles.input,
                    isFocusedInput === "input3" ? styles.focusedInput : null,
                  ]}
                  placeholder="Пароль"
                  secureTextEntry={secureText}
                  onFocus={() => handleFocus("input3")}
                  onBlur={handleBlur}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity style={styles.showPasswordBtn}>
                  <Text
                    style={styles.passwordText}
                    onPress={() => setSecureText(!secureText)}
                  >
                    Показати
                  </Text>
                </TouchableOpacity>
                {state.password.length < 8 && state.password.length > 0 && (
                  <Text style={{ color: `#ff0000` }}>
                    Пароль має містити не менше 8 символів
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={[
                  styles.btn,
                  { backgroundColor: !isValid ? "#F6F6F6" : "#FF6C00" },
                ]}
                activeOpacity={0.8}
                disabled={!isValid}
                onPress={handleSubmit}
                // onPress={() => {
                //   console.log(state);
                //   navigation.navigate("Home", {
                //     screen: "Posts",
                //     params: { userId: `${state.email}` },
                //   });
                // }}
              >
                <Text
                  style={[
                    styles.btnTitle,
                    { color: !isValid ? "#BDBDBD" : "#FFFFFF" },
                  ]}
                >
                  Зареєструватися
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navLink}
                onPress={() => navigation.navigate("Login")}
                activeOpacity={0.5}
              >
                <Text style={styles.navLinkText}>
                  Вже є акаунт?
                  <Text style={{ color: `#0000cd` }}> Увійти</Text>
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
          {/* </View> */}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  // },
  backgroundImg: {
    flex: 1,
    // resizeMode: "cover",
    justifyContent: "flex-end",
    // width: "100%",
    // justifyContent: "center",

    // alignItems: "center",
  },

  form: {
    // borderTopEndRadius: 10,
    // marginHorizontal: 40,
    // ? це для відступів, коли виїзджає клаватура
    // paddingBottom: 45,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 93,
    // paddingBottom: 45,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  acauntImgWrap: {
    position: "absolute",
    top: -60,
    left: 140,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  addImg: {
    position: "absolute",
    top: 21,
    left: 248,
    width: 25,
    height: 25,
  },
  formTitle: {
    color: "#212121",
    textAlign: "center",

    justifyContent: "center",
    marginBottom: 32,
    fontSize: 30,
    fontFamily: "Roboto-Medium",
  },
  // formText: {
  //   color: "#212121",
  //   textAlign: "center",

  //   justifyContent: "center",
  //   marginTop: 16,
  //   fontFamily: "Roboto-Regular",
  // },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#f0f8ff",

    borderRadius: 5,
    height: 50,
    // marginHorizontal: 40,
    // paddingHorizontal: 10,
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
  passwordText: {},

  btn: {
    height: 50,
    borderRadius: 100,
    marginTop: 43,
    padding: 16,
    // borderWidth: 1,
    backgroundColor: "#FF6C00",
    alignItems: "center",

    // ...Platform.select({
    //   ios: {
    //     backgroundColor: "transparent",
    //     borderColor: "#f0f8ff",
    //   },
    //   android: {
    //     backgroundColor: "#6495ed",
    //     borderColor: "transparent",
    //   },
    // }),
  },
  btnTitle: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    // fontSize: 16,

    // color: Platform.OS === "ios" ? "#0000ff" : "#f0f8ff",
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
