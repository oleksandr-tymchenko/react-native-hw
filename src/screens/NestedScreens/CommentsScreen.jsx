import {
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { db, storage } from "../../../firebase/config";
// import { Button, TextInput, TouchableOpacity } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
// import { getDownloadURL, ref } from "firebase/storage";

// import {  } from "react-native-gesture-handler";

const CommentsScreen = ({ route }) => {
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { postId } = route.params;
  const { nickName } = useSelector((state) => state.auth);
  const [photoUrl, setPhotoUrl] = useState(null);

  const getPhotoFromFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const post = querySnapshot.docs.find((doc) => doc.id === postId);
    setPhotoUrl(post.data().photo);
  };

  useEffect(() => {
    getPhotoFromFirestore();
  }, []);
  const createPost = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
        comment,
        nickName,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };
  const getAllPosts = async () => {
    // використ метод onSnapShot для моментального отримання даних
    const postsData = await onSnapshot(
      collection(db, "posts", postId, "comments"),
      (queryPosts) => {
        const comments = queryPosts.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAllComments(comments);
      }
    );

    return postsData;
  };

  useEffect(() => {
    getAllPosts();

    // Очистити підписку при виході зі сторінки
    // return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photoUrl }}
        style={{
          width: "auto",
          height: 240,
          borderRadius: 8,
          marginHorizontal: 16,
        }}
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          contentContainerStyle={{ alignItems: "flex-end" }}
          data={allComments}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 24,
                marginRight: 16,
              }}
            >
              <Text>{item.nickName}</Text>

              <View style={styles.commentContainer}>
                <Text>{item.comment}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={styles.input}
          placeholder="Коментувати..."
          onChangeText={setComment}
        />

        <TouchableOpacity
          style={styles.onPublicBtn}
          // style={[
          //   styles.onPublicBtn,
          //   { backgroundColor: !isPhotoTaken ? "#F6F6F6" : "#FF6C00" },
          // ]}
          activeOpacity={0.8}
          // onPress={keyboardHide}
          onPress={createPost}
          // disabled={!isPhotoTaken}
        >
          <Ionicons style={styles.onPublicBtnIcon} name="arrow-up-outline" />
          {/* <Text
            style={[
              styles.onPublicBtnTitle,
              {
                color: !isPhotoTaken ? "#BDBDBD" : "#FFFFFF",
              },
            ]}
          > */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 20,
    // justifyContent: "flex-end",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  commentContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#E8E8E8",
    borderRadius: 6,
    borderTopLeftRadius: 0,
    marginLeft: 5,
    // flexGrow: 1,
    width: 299,
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginHorizontal: 16,
  },
  input: {
    flex: 1,

    borderColor: "transparent",
    borderRadius: 100,
    paddingLeft: 15,
    paddingRight: 50,
    height: 50,
    // borderWidth: 1,
    backgroundColor: "#E8E8E8",
    // borderRadius: 5,

    fontFamily: "Roboto-Regular",
    color: "#212121",
    // backgroundColor: "#E8E8E8",
  },
  onPublicBtn: {
    position: "absolute",
    top: 8,
    right: 10,
    height: 34,
    width: 34,
    borderRadius: 100,

    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
  onPublicBtnIcon: {
    color: "#FFFFFF",

    alignSelf: "center",
    fontSize: 20,
    flexWrap: "wrap",
  },
});
export default CommentsScreen;
