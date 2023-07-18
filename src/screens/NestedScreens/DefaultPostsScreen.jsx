import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import user from "../../../assets/images/User.jpg";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../../../GlobalStyles";

const DefaultPostsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { nickName } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const getAllPosts = async () => {
    const postsData = await onSnapshot(
      collection(db, "posts"),
      (queryPosts) => {
        const comments = queryPosts.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(comments);
        // console.log("posts", posts);
      }
    );
  };

  // * рефакторим юсеффект
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View
      style={{
        ...GlobalStyles.container,
        paddingHorizontal: 16,

        paddingTop: 32,
      }}
    >
      <View style={styles.userWrap}>
        <Image style={styles.userImg} source={user} />
        <View>
          <Text style={styles.userName}>{nickName}</Text>
          {/* <Text style={styles.userEmail}>{email}</Text> */}
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginTop: 32,
              marginBottom: 10,
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 360, height: 240, borderRadius: 8 }}
            />
            <Text syle={{ fontFamily: "Roboto-Medium", fontSize: 16 }}>
              {item.photoName}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                // justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={styles.navLink}
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
                activeOpacity={0.5}
              >
                <Ionicons
                  name={"chatbubble-outline"}
                  style={{ fontSize: 24, color: "#BDBDBD" }} // Змінити розмір іконки на 30
                />
                {/* <Text style={styles.navLinkText}>
          Немає акаунту? <Text style={{ color: `#0000cd` }}>Comments</Text>
        </Text> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.navLink, marginLeft: 48 }}
                onPress={() =>
                  navigation.navigate("Map", {
                    location: item.location,
                  })
                }
                activeOpacity={0.5}
              >
                <Ionicons
                  name={"location-outline"}
                  style={{ fontSize: 24, color: "#BDBDBD" }} // Змінити розмір іконки на 30
                />
                {/* <Text style={styles.navLinkText}>
          Немає акаунту? <Text style={{ color: `#0000cd` }}>Map</Text>
        </Text> */}
                <Text>{item.placeMarker}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default DefaultPostsScreen;

styles = StyleSheet.create({
  // postsScreenContainer: {
  //   flex: 1,
  //   backgroundColor: "#FFFFFF",
  paddingHorizontal: 16,

  paddingTop: 32,
  // },
  userWrap: {
    flexDirection: "row",
    // justifyContent: "center",
    paddingBottom: 10,
    alignItems: "center",
  },
  // userInfo: {
  //   flexDirection: "column",
  // },
  userImg: {
    width: 60,
    marginRight: 10,
  },

  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  // userEmail: {
  //   fontFamily: "Roboto-Regular",
  //   fontSize: 11,
  // },
  navLink: {
    flexDirection: "row",
    marginTop: 16,
  },
});
