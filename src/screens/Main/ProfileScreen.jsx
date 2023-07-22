import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../../firebase/config";
import { authSignOutUser } from "../../../Redux/Auth/authOperations";

import del from "../../../assets/images/del.png";
import background from "../../../assets/images/background.jpg";
import { GlobalStyles } from "../../../GlobalStyles";
const ProfileScreen = () => {
  const navigation = useNavigation();

  const [userPosts, setUserPosts] = useState([]);
  const [like, setLike] = useState(0);
  const { userId, nickName } = useSelector((state) => state.auth);
  // console.log("userPosts", userPosts);
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
  const likeCounter = () => {
    setLike((prev) => prev + 1);
  };
  const getUserPosts = async () => {
    const queryPosts = await query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );

    const unsubscribe = await onSnapshot(queryPosts, (snapshot) => {
      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
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
    <View style={GlobalStyles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.backgroundImg}
      >
        <View style={styles.contentContainer}>
          <View style={styles.acauntImgWrap}>
            <Image />
            <Image style={styles.delImg} source={del} />
          </View>
          <Text style={styles.contentTitle}>{nickName}</Text>
          <FlatList
            data={userPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  marginTop: 32,
                  marginBottom: 10,
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.photo }}
                  style={{ width: 360, height: 200, borderRadius: 8 }}
                />
                <Text syle={{ fontFamily: "Roboto-Medium", fontSize: 16 }}>
                  {item.photoName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    // alignSelf: "flex-start",
                    justifyContent: "space-between",
                    // alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      style={styles.navLink}
                      onPress={() => {
                        navigation.navigate("Comments", { postId: item.id });
                      }}
                      activeOpacity={0.5}
                    >
                      <Ionicons
                        name={
                          userPosts.length > 0
                            ? "chatbubble-sharp"
                            : "chatbubble-outline"
                        }
                        // {/* // {{userPosts}> 0? name={"chatbubble-sharp"}: name={"chatbubble-outline"}} */}
                        style={{ fontSize: 24, color: "#FF6C00" }} // Змінити розмір іконки на 30
                      />
                      {/* <Text style={styles.navLinkText}>
          Немає акаунту? <Text style={{ color: `#0000cd` }}>Comments</Text>
        </Text> */}
                    </TouchableOpacity>
                    <Text style={{ marginRight: 20 }}>{userPosts.length}</Text>
                    <TouchableOpacity
                      style={styles.navLink}
                      onPress={likeCounter}
                      activeOpacity={0.5}
                    >
                      <Ionicons
                        name={"thumbs-up-outline"}
                        style={{ fontSize: 24, color: "#FF6C00" }} // Змінити розмір іконки на 30
                      />
                      {/* <Text style={styles.navLinkText}>
          Немає акаунту? <Text style={{ color: `#0000cd` }}>Comments</Text>
        </Text> */}
                    </TouchableOpacity>
                    <Text>{like}</Text>
                  </View>
                  <View style={{ marginLeft: 50 }}>
                    <TouchableOpacity
                      style={styles.navLink}
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
              </View>
            )}
          />
          {/* <Button title="signOut" onPress={signOut} /> */}
        </View>
      </ImageBackground>
    </View>
  );
};

styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   // justifyContent: "center",
  //   // alignItems: "center",
  // },
  backgroundImg: {
    flex: 1,
    // resizeMode: "cover",
    justifyContent: "flex-end",
    // width: "100%",
    // justifyContent: "center",

    // alignItems: "center",
  },
  contentContainer: {
    position: "relative",
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 92,
    marginTop: 103,
    // paddingBottom: 45,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  acauntImgWrap: {
    position: "absolute",
    top: -60,
    left: 127,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  delImg: {
    position: "absolute",
    top: 80,
    left: 108,
    width: 25,
    height: 25,
  },
  contentTitle: {
    alignSelf: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    paddingBottom: 10,
  },
  navLink: {
    flexDirection: "row",
    marginTop: 16,
    marginRight: 8,
  },
});
export default ProfileScreen;
