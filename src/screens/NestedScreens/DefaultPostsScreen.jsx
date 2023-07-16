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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

const DefaultPostsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const getAllPosts = async () => {
    try {
      const postsData = await getDocs(collection(db, "posts"));

      // Перевіряємо у консолі отримані дані
      // snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
      // Записуємо масив обʼєктів у стейт
      setPosts(postsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // useEffect(() => {
  //   if (route.params) {
  //     setPosts((pevState) => [...pevState, route.params]);
  //   }
  // }, [route.params]);
  //   console.log("posts", posts);
  // * рефакторим юсеффект
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userWrap}>
        <Image style={styles.userImg} source={user} />
        <View>
          <Text style={styles.userName}>Nataly Shevchenko</Text>
          <Text style={styles.userEmail}>email@google.com</Text>
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
                <Text>Ivano-Frankivs'k Region, Ukraine</Text>
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
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    // backgroundColor: "white",
    // alignItems: "flex-start",
  },
  userWrap: {
    flexDirection: "row",
    // justifyContent:'space-between'
    marginTop: 20,
    // alignItems: "center",
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
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
  navLink: {
    flexDirection: "row",
    marginTop: 16,
    // marginLeft: 16,
    // alignItems: "center",
    // alignItems: 'flex-start',
  },
  // navLinkText: {
  //   color: "#1B4371",
  //   textAlign: "center",
  //   fontSize: 16,
  //   justifyContent: "center",

  //   fontFamily: "Roboto-Regular",
  // },
});
