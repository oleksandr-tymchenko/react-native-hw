import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { db, storage } from "../../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";

export default function CreatePostScreen() {
  const navigation = useNavigation();
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState("");
  const [comment, setComment] = useState("");
  const [placeMarker, setPlaceMarker] = useState("");
  const [location, setLocation] = useState(null);

  const { userId, nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      // console.log("status", status);

      if (status !== "granted") {
        console.log("Permission to access location was denied");
        // setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const takePhoto = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    console.log("comment", comment);
    console.log("placeMarker", placeMarker);
    console.log("location", location);
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
      setIsPhotoTaken(true);
    }
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      const docRef = await addDoc(collection(db, "posts"), {
        photo,
        placeMarker,
        comment,
        location: location.coords,
        userId,
        nickName,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };
  const uploadPhotoToServer = async () => {
    try {
      // Створіть посилання на об'єкт зображення в Firebase Storage
      const uniquePostId = Date.now().toString();

      // const fileName = "MyPhoto.png";

      const storageRef = ref(storage, `PostImage/${uniquePostId}`);
      const response = await fetch(photo);
      const blob = await response.blob();
      // Відправте зображення на сервер Firebase Storage
      await uploadBytes(storageRef, blob);
      // console.log("Зображення успішно відправлено!");

      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
      // console.log("downloadURL", downloadURL);
      // Поверніть URL-адресу зображення або інші дані, які вам потрібні
    } catch (error) {
      console.error("Помилка під час відправки зображення:", error);
      // Обробка помилки
    }
  };

  // const uploadPhotoToServer = async () => {
  //   console.log("photo", photo);
  //   const response = await fetch(photo);
  //   console.log("response", response);
  //   // ! певодім фотографию в формат blob()(ето нужно для файрбейс)
  //   const file = await response.blob();
  //   console.log("file", file);
  //   const uniquePostId = nanoid();

  //   // // db;
  //   const data = await storage().ref(`postImage/${uniquePostId}`).put(file);
  //   console.log("data", data);
  // };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("DefaultPosts");
  };
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={type} ref={setCameraRef}>
          <View style={styles.photoView}>
            {photo && (
              <View style={styles.takenPhotoContainer}>
                <Image
                  source={{ uri: photo }}
                  style={{
                    height: 220,
                    width: 360,
                    borderRadius: 10,
                  }}
                />
              </View>
            )}

            <TouchableOpacity style={styles.takePhotoBtn} onPress={takePhoto}>
              <View style={styles.takePhotoCont}>
                <Ionicons
                  name={"camera-sharp"}
                  style={{ fontSize: 24, color: "#BDBDBD" }} // Змінити розмір іконки на 30
                />
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
        <TouchableOpacity>
          {!isPhotoTaken ? (
            <Text style={styles.cameraTitle}>Завантажте фото</Text>
          ) : (
            <Text style={styles.cameraTitle}>Редагувати фото</Text>
          )}
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View>
          <TextInput
            style={styles.input}
            placeholder="...Назва"
            onChangeText={setComment}
          />
        </View>
        <View style={{ marginTop: 16, position: "relative" }}>
          <TextInput
            style={styles.input}
            placeholder="     Місцевість"
            onChangeText={setPlaceMarker}
            // inlineImageLeft="location-outline"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.onPublicBtn,
            { backgroundColor: !isPhotoTaken ? "#F6F6F6" : "#FF6C00" },
          ]}
          activeOpacity={0.8}
          // onPress={keyboardHide}
          onPress={sendPhoto}
          disabled={!isPhotoTaken}
        >
          <Text
            style={[
              styles.onPublicBtnTitle,
              {
                color: !isPhotoTaken ? "#BDBDBD" : "#FFFFFF",
              },
            ]}
          >
            Опублікувати
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.delPhoto}
          onPress={() => {}}
          activeOpacity={0.5}
        >
          <Ionicons
            name={"trash-outline"}
            style={{ fontSize: 24, color: "#BDBDBD" }}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },

  cameraContainer: {
    height: 267,
    marginBottom: 32,
  },
  camera: {
    // flex: 1,
    height: 240,
    borderRadius: 10,
  },
  cameraTitle: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  photoView: {
    flex: 1,
    // backgroundColor: "transparent",
    justifyContent: "center",
    // borderRadius: 10,
  },
  takenPhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
  },

  // flipContainer: {
  //   flex: 0.1,
  //   alignSelf: "flex-end",
  // },

  takePhotoBtn: { alignItems: "center", justifyContent: "center" },

  takePhotoCont: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    backgroundColor: "#FFFFFF",
    opacity: 0.5,
    borderRadius: 50,
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
    // backgroundColor: "#FF6C00",
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
  delPhoto: {
    backgroundColor: "#F6F6F6",
    width: 70,
    height: 40,
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
});

// import React, { useEffect, useState } from "react";
// import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { Camera } from "expo-camera";
// import { MediaLibrary } from "expo-media-library";
// import * as Location from "expo-location";
// import { useNavigation } from "@react-navigation/native";

// const CreatePostScreen = () => {
//   const navigation = useNavigation();
//   const [camera, setCamera] = useState(null);
//   const [photo, setPhoto] = useState("");

//   const takePhoto = async () => {
//     const photo = await camera.takePictureAsync();
//     const location = await Location.getCurrentPositionAsync();
//     // console.log("location", location);
//     console.log("latitude", location.coords.latitude);
//     console.log("longitude", location.coords.longitude);
//     setPhoto(photo.uri);
//   };
//   const sendPhoto = () => {
//     navigation.navigate("DefaultPosts", { photo });
//   };
// useEffect(() => {
//   (async () => {
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     await MediaLibrary.requestPermissionsAsync();

//     setHasPermission(status === "granted");
//   })();
// }, []);
// useEffect(() => {
//   (async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     console.log("status", status);

//     if (status !== "granted") {
//       setErrorMsg("Permission to access location was denied");
//       return;
//     }
//   })();
// }, []);
//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} ref={setCamera}>
// {
//   photo && (
//     <View style={styles.takenPhotoContainer}>
//       <Image
//         source={{ uri: photo }}
//         style={{ height: 300, width: 200, borderRadius: 10 }}
//       />
//     </View>
//   );
// }

//         <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
//           <Text style={styles.snap}>SNAP</Text>
//         </TouchableOpacity>
//       </Camera>
//       <View>
//         <TouchableOpacity style={styles.sendBtn} onPress={sendPhoto}>
//           <Text style={styles.sendTitle}>SEND</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 32,
//     // justifyContent: "center",
//     // alignItems: "center",
//   },
//   camera: {
//     // flex: 1,
//     height: 240,
//     // backgroundColor: "#E8E8E8",
//     borderRadius: 10,
//     // justifyContent: "flex-end",
//     alignItems: "center",
//   },

//   snapContainer: {
//     justifyContent: "center",
//     alignItems: "center",

//     borderWidth: 1,
//     borderColor: "red",
//     borderRadius: 10,
//     width: 70,
//     height: 70,
//     // marginTop: 200,
//     marginBottom: 20,
//   },
//   snap: {
//     color: "#fff",
//     // padding: 5,
//   },
//   takenPhotoContainer: {
//     position: "absolute",
//     top: 40,
//     left: 10,
//     borderColor: "#fff",
//     borderWidth: 1,
//     borderRadius: 10,
//   },
//   sendBtn: {
//     alignItems: "center",
//     marginHorizontal: 30,
//     borderWidth: 2,
//     borderColor: "#b0e0e6",
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   sendTitle: {
//     color: "#b0e0e6",
//   },
// });
// export default CreatePostScreen;

// const CreatePostScreen = () => {
//   const navigation = useNavigation();
//   const [camera, setCamera] = useState(null);
//   const [photo, setPhoto] = useState("");

//   const takePhoto = async () => {
//     const photo = await camera.takePictureAsync();
//     const location = await Location.getCurrentPositionAsync();
//     // console.log("location", location);
//     console.log("latitude", location.coords.latitude);
//     console.log("longitude", location.coords.longitude);
//     setPhoto(photo.uri);
//   };
//   const sendPhoto = () => {
//     navigation.navigate("DefaultPosts", { photo });
//   };
//   // useEffect(() => {
//   //   (async () => {
//   //     let { status } = await Location.requestForegroundPermissionsAsync();
//   //     console.log("status", status);

//   //     if (status !== "granted") {
//   //       setErrorMsg("Permission to access location was denied");
//   //       return;
//   //     }
//   //   })();
//   // }, []);
//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} ref={setCamera}>
//         {photo && (
//           <View style={styles.takenPhotoContainer}>
//             <Image
//               source={{ uri: photo }}
//               style={{ height: 300, width: 200, borderRadius: 10 }}
//             />
//           </View>
//         )}

//         <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
//           <Text style={styles.snap}>SNAP</Text>
//         </TouchableOpacity>
//       </Camera>
//       <View>
//         <TouchableOpacity style={styles.sendBtn} onPress={sendPhoto}>
//           <Text style={styles.sendTitle}>SEND</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: "center",
//     // alignItems: "center",
//   },
//   camera: {
//     height: "70%",
//     marginHorizontal: 2,
//     // marginTop: 30,
//     borderRadius: 10,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },

//   snapContainer: {
//     justifyContent: "center",
//     alignItems: "center",

//     borderWidth: 1,
//     borderColor: "red",
//     borderRadius: 10,
//     width: 70,
//     height: 70,
//     // marginTop: 200,
//     marginBottom: 20,
//   },
//   snap: {
//     color: "#fff",
//     // padding: 5,
//   },
// takenPhotoContainer: {
//   position: "absolute",
//   top: 40,
//   left: 10,
//   borderColor: "#fff",
//   borderWidth: 1,
//   borderRadius: 10,
// },
//   sendBtn: {
//     alignItems: "center",
//     marginHorizontal: 30,
//     borderWidth: 2,
//     borderColor: "#b0e0e6",
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   sendTitle: {
//     color: "#b0e0e6",
//   },
// });
// export default CreatePostScreen;
