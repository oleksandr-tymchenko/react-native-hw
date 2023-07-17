import {
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../../firebase/config";

// import {  } from "react-native-gesture-handler";

const CommentsScreen = ({ route }) => {
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { postId } = route.params;
  const { nickName } = useSelector((state) => state.auth);

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
    // try {
    //   const postsData = await getDocs(
    //     collection(db, "posts", postId, "comments")
    //   );
    //   console.log("postsData", postsData.docs);
    //   // Перевіряємо у консолі отримані дані
    //   // snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
    //   // Записуємо масив обʼєктів у стейт
    //   setAllComments(
    //     postsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //   );
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }
  };

  useEffect(() => {
    getAllPosts();

    // Очистити підписку при виході зі сторінки
    // return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.nickName}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Коментувати..."
          onChangeText={setComment}
        />
      </View>

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
        <Text
          style={[
            styles.onPublicBtnTitle,
            {
              color: !isPhotoTaken ? "#BDBDBD" : "#FFFFFF",
            },
          ]}
        >
          Коментувати...
        </Text>
      </TouchableOpacity>
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 20,
    // justifyContent: "flex-end",
    // // alignItems: "center",
    backgroundColor: "#fff",
  },
  commentContainer: {
    backgroundColor: "#E8E8E8",
    borderRadius: 6,
    borderTopLeftRadius: 0,
    marginLeft: 16,
    marginBottom: 24,
  },
  input: {
    borderColor: "transparent",
    borderBottomColor: "#f0f8ff",
    padding: 10,
    borderWidth: 1,

    // borderRadius: 5,
    height: 50,

    color: "#212121",
    // backgroundColor: "#E8E8E8",
  },
  onPublicBtn: {
    height: 50,
    borderRadius: 100,
    marginTop: 43,
    padding: 15,
    backgroundColor: "#FF6C00",
    // alignItems: "center",
    // justifyContent: "center",
  },
  onPublicBtnTitle: {
    // color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    // alignItems: "center",
    // justifyContent: "center",
    alignSelf: "center",
  },
});
export default CommentsScreen;
