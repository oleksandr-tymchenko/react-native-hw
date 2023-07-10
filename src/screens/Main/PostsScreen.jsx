import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import user from "../../../assets/images/User.jpg";
const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userWrap}>
        <Image style={styles.userImg} source={user} />
        <View>
          <Text style={styles.userName}>Nataly Shevchenko</Text>
          <Text style={styles.userEmail}>email@google.com</Text>
        </View>
      </View>
    </View>
  );
};
styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",

    alignItems: "flex-start",
  },
  userWrap: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "column",
  },
  userImg: {
    width: 60,
    marginRight: 10,
  },

  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
});
export default PostsScreen;
