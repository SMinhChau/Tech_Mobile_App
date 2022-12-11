import React from "react";
import {
  Dimensions,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import s from "../../styles/mainStyle";
import { useEffect, useState } from "react/cjs/react.development";
import apiData from "../../api/getApi";
import Ionicons from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseconfig";

import { initializeAuth, signOut } from "firebase/auth";

const { width, height } = Dimensions.get("window");
export default function Saved() {
  const [saved, setSaved] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = initializeAuth(app, {});

  const getSavedProducts = (url) => {
    apiData(url, "GET")
      .then((json) => {
        setSaved(json);
        setisLoading(false);
      })
      .catch((e) => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    getSavedProducts(`https://fakestoreapi.com/products?limit=5`);
  }, []);

  const signOutUser = () => {
    try {
      signOut(auth);
      navigation.navigate("SignIn");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bgbars.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View
          style={{
            alignItems: "flex-end",
            marginTop: 30,
            marginRight: 30,
            padding: 10,
          }}
        >
          <Ionicons
            name="times"
            size={25}
            color="white"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <View style={{ marginTop: 100, marginLeft: 30 }}>
          <Text style={{ marginTop: 30 }}>
            <Ionicons
              name="user"
              size={20}
              color="white"
              onPress={() => navigation.navigate("Profile")}
            />
            <View style={{ width: 12 }} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                color: "#fff",
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#fff",
                display: "inline-block",
              }}
            >
              Profile
            </Text>
          </Text>

          <Text style={{ marginTop: 30 }}>
            <Ionicons name="shopping-cart" size={20} color="white" />
            <View style={{ width: 10 }} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                color: "#fff",
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#fff",
                display: "inline-block",
              }}
            >
              My orders
            </Text>
          </Text>
          <Text style={{ marginTop: 30 }}>
            <Ionicons name="heart" size={20} color="white" />
            <View style={{ width: 10 }} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                color: "#fff",
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#fff",
                display: "inline-block",
              }}
            >
              Favorites
            </Text>
          </Text>
          <Text style={{ marginTop: 30 }}>
            <Ionicons name="shopping-bag" size={20} color="white" />
            <View style={{ width: 10 }} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                color: "#fff",
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: "#fff",
                display: "inline-block",
              }}
            >
              Delivery
            </Text>
          </Text>
          <Text style={{ marginTop: 30 }}>
            <Icon name="settings" size={20} color="white" />
            <View style={{ width: 10 }} />
            <Text
              style={[
                {
                  marginLeft: 10,
                  fontSize: 20,
                  color: "#fff",
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: "#fff",
                },
              ]}
            >
              Settings
            </Text>
          </Text>

          <TouchableOpacity
            style={[{ marginTop: 220 }, styles.btn]}
            onPress={signOutUser}
          >
            <Ionicons name="sign-out" size={20} color="white" />
            <View style={{ width: 10 }} />
            <Text style={[{ marginLeft: 10, fontSize: 20, color: "#fff" }]}>
              Sign out
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  btn: {
    flexDirection: "row",
  },
});
