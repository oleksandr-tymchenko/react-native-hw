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
import add from "../../assets/images/add.png";

export default RegistrationScreen = ({
  isShowKeyboard,
  setIsShowKeyboard,
  keyboardHide,
}) => {
  const [isFocusedInput, setIsFocusedInput] = useState(null);
  console.log("IsShowKeyboard start", isShowKeyboard);

  const handleFocus = (key) => {
    setIsShowKeyboard(true);
    setIsFocusedInput(key);
  };
  const handleBlur = () => {
    setIsFocusedInput(null);
  };

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.image}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View
          style={{
            ...styles.form,
            paddingBottom: isShowKeyboard ? 150 : 45,
          }}
          // style={styles.form}
        >
          <View style={styles.acauntImgWrap}>
            <Image />
          </View>
          <Image style={styles.addImg} source={add} />
          <Text style={styles.formTitle}>Реєстрація</Text>
          <View>
            <TextInput
              style={[
                styles.input,
                isFocusedInput === "input1" ? styles.focusedInput : null,
              ]}
              placeholder="Логін"
              onFocus={() => handleFocus("input1")}
              onBlur={handleBlur}
            />
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
            <Text style={styles.btnTitle}>Зареєструватися</Text>
          </TouchableOpacity>

          <Text style={styles.formText}>Вже є акаунт? Увійти</Text>
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    // resizeMode: "cover",
    justifyContent: "flex-end",
    // width: "100%",
    // justifyContent: "center",

    // alignItems: "center",
    position: "relative",
  },

  form: {
    // borderTopEndRadius: 10,
    // marginHorizontal: 40,
    // ? це для відступів, коли виїзджає клаватура
    paddingBottom: 150,
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
  },
  formText: {
    color: "#212121",
    textAlign: "center",

    justifyContent: "center",
    marginTop: 16,
  },
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
    // color: Platform.OS === "ios" ? "#0000ff" : "#f0f8ff",
  },
});
