import { signOut } from "firebase/auth";
import React from "react";
import { Button } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { auth } from "../../../firebase/config";
import { authSignOutUser } from "../../../Redux/Auth/authOperations";
import { useDispatch } from "react-redux";

const ProfileScreen = () => {
  // const dispatch = useDispatch();
  // const signOut = () => {
  //   dispatch(authSignOutUser());
  // };
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      {/* <Button title="signOut" onPress={signOut} /> */}
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ProfileScreen;
