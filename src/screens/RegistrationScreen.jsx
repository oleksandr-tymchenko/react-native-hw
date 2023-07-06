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
} from "react-native";
import background from "../../assets/images/background.jpg";
import add from "../../assets/images/add.png";

export default RegistrationScreen = () => {
  // console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    // метод для закр клавиат по клику
    Keyboard.dismiss();
  };
  return (
    // <SafeAreaView style={styles.container}>
    <ImageBackground
      source={background}
      // resizeMode="contain"
      style={styles.image}
    >
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
        {/* <View style={styles.formWrap}> */}
        <View
          style={{
            ...styles.form,
            paddingBottom: isShowKeyboard ? 0 : 45,
            marginTop: isShowKeyboard ? 103 : 0,
          }}
          // style={styles.form}
        >
          <View style={styles.acauntImgWrap}>
            <Image />
          </View>
          <Image style={styles.addImg} source={add} />
          <Text style={styles.formTitle}>РЕЄСТРАЦІЯ</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Логін"
              onFocus={() => setIsShowKeyboard(true)}
            />
          </View>
          <View style={{ marginTop: 16 }}>
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
              onFocus={() => setIsShowKeyboard(true)}
            />
          </View>
          <View style={{ marginTop: 16, position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              secureTextEntry={true}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TouchableOpacity style={styles.showPasswordBtn}>
              <Text style={styles.passwordText}>Показати</Text>
            </TouchableOpacity>
          </View>
          {/* <Button title="SIGN IN" /> */}

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
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   // alignItems: "center",
  //   // justifyContent: "center",
  // },
  // text: {
  //   color: "#fff",
  // },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // width: "100%",
    // justifyContent: "center",

    // alignItems: "center",
    position: "relative",
  },
  // formWrap: {
  //   backgroundColor: "#f0f8ff",
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  // },
  form: {
    // borderTopEndRadius: 10,
    // marginHorizontal: 40,
    // ? це для відступів, коли виїзджає клаватура
    // marginBottom: 100,
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
