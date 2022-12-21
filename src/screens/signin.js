import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/Ionicons";
import s from "../../styles/mainStyle";
import { useState } from "react";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseconfig";

import { initializeAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const app = initializeApp(firebaseConfig);
  const auth = initializeAuth(app, {});
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // Sign in existing users
  const hanldPressLogin = () => {
    console.log("email", email);
    if (email == "") {
      Alert.alert("Thông báo", "Email không được rỗng");
    } else if (!regexEmail.test(email)) {
      Alert.alert("Thông báo", "Email không đúng định dạng");
    } else if (password == "") {
      Alert.alert("Thông báo", "password không được rỗng");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
          console.log(accessToken);
          setEmail("");
          setpassword("");
          navigation.navigate("MyTabs");
        })
        .catch((error) => {
          Alert.alert(
            "Thông báo",
            "Xảy ra lỗi! \n Mời bạn nhập lại tài khoản và mật khẩu"
          );
        });
    }
  };

  return (
    <View style={styles.viewContent}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? 0 : 0}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={[
              s.alItsCnt,
              s.toCenter,
              { height: "30%" },
              { width: "100%" },
              { alignItems: "center" },
            ]}
          >
            <Text style={[s.f65, s.b, { color: "white" }]}>SignIn</Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={[
            {
              padding: 30,
              width: "100%",
              height: "70%",
              backgroundColor: "white",
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            },
          ]}
        >
          <KeyboardAvoidingView behavior="position">
            <Text style={[s.b, s.f22]}>Login</Text>
            <View
              style={{
                height: "40%",
                justifyContent: "space-between",
                marginTop: 40,
              }}
            >
              <TextInput
                variant="outlined"
                label={email ? "" : "Email"}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                Input
                label={password ? "" : "password"}
                variant="outlined"
                value={password}
                onChangeText={(text) => setpassword(text)}
                trailing={(props) => (
                  <IconButton
                    icon={(props) => <Icon name="eye" {...props} />}
                    {...props}
                  />
                )}
              />
              <TouchableOpacity>
                <Text style={[s.b, s.f15, { color: "blue" }]}>
                  Forget password ?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[s.toCenter, s.alItsCnt, { marginTop: 60 }]}>
              <TouchableOpacity
                onPress={hanldPressLogin}
                style={[
                  s.bgMain,
                  s.toCenter,
                  s.alItsCnt,
                  { width: "100%", height: 60, borderRadius: 20 },
                ]}
              >
                <Text style={[s.b, s.f24, { color: "white" }]}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={[s.b, s.f15, { color: "blue", marginTop: 10 }]}>
                  Create account
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    flex: 1,
    backgroundColor: "#5956E9",
    alignItems: " center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    alignItems: " center",
    justifyContent: "center",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
});
