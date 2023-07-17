import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Text, FlatList, Image, View, StyleSheet } from "react-native";
import { auth, db } from "../../../firebase/config";
import { authSignOutUser } from "../../../Redux/Auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);

  // const getUserPosts = async () => {
  //   await onSnapshot(
  //     where(collection(db, "posts", "userId", "==", userId), (queryPosts) => {
  //       const comments = queryPosts.docs.map((doc) => ({
  //         ...doc.data(),
  //         // id: doc.id,
  //       }));
  //       console.log("comments", comments);
  //     })
  //   );
  // };
  const getUserPosts = async () => {
    const queryPosts = await query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );

    const unsubscribe = await onSnapshot(queryPosts, (snapshot) => {
      const comments = snapshot.docs.map((doc) => ({
        // id: doc.id,
        ...doc.data(),
      }));
      setUserPosts(comments);
    });

    // Optionally, you can return the unsubscribe function if you need to detach the listener later
    // return unsubscribe;
  };
  useEffect(() => {
    getUserPosts();
  }, []);
  // const dispatch = useDispatch();
  // const signOut = () => {
  //   dispatch(authSignOutUser());
  // };
  return (
    <View style={styles.container}>
      <FlatList
        data={userPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginTop: 32,
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 380, height: 200, borderRadius: 8 }}
            />

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                // justifyContent: "space-between",
              }}
            ></View>
          </View>
        )}
      />
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
