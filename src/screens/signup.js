import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/Ionicons";
import s from "../../styles/mainStyle";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseconfig";
import {
  initializeAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [passWordAgain, setPassWordAgain] = useState("");

  const app = initializeApp(firebaseConfig);
  const auth = initializeAuth(app, {});
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // Sign up new users
  const hanldPressRegister = () => {
    if (email == "") {
      Alert.alert("Thông báo", "Email không được rỗng");
    } else {
      if (
        (!regexEmail.test(email) && passWord == passWordAgain) ||
        (!regexEmail.test(email) && passWord != passWordAgain)
      ) {
        Alert.alert("Thông báo", "Email không hợp lệ");
      } else if (regexEmail.test(email) && passWord != passWordAgain) {
        Alert.alert(
          "Thông báo",
          "Mật khẩu xác nhận không giống với mật khẩu trên"
        );
      } else if (regexEmail.test(email) && passWord == "") {
        Alert.alert("Thông báo", "Mời bạn nhập mật khẩu");
      } else {
        createUserWithEmailAndPassword(auth, email, passWord)
          .then(() => {
            signInWithEmailAndPassword(auth, email, passWord).then(() => {
              Alert.alert("Thông báo", "Đăng ký thành công");
              const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
              console.log(accessToken);
              setEmail("");
              setPassWord("");
              setPassWordAgain("");
              navigation.navigate("SignIn");
            });
          })
          .catch((error) => {
            Alert.alert("Thông báo", "Email đã tồn tại");
          });
      }
    }
  };

  return (
    <View
      style={[s.fl1, s.alItsCnt, s.bgMain, { justifyContent: "space-between" }]}
    >
      <View style={[s.alItsCnt, s.toCenter, { height: "20%" }]}>
        <Text style={[s.f65, s.b, { color: "white" }]}>SignUp</Text>
      </View>
      <View
        style={[
          {
            padding: 30,
            width: "100%",
            height: "80%",
            backgroundColor: "white",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
        ]}
      >
        <Text style={[s.b, s.f22]}>Register</Text>
        <View
          style={{
            height: "50%",
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
            label={passWord ? "" : "Password"}
            variant="outlined"
            value={passWord}
            onChangeText={(text) => setPassWord(text)}
            trailing={(props) => (
              <IconButton
                icon={(props) => <Icon name="eye" {...props} />}
                {...props}
              />
            )}
          />
          <TextInput
            Input
            label={passWordAgain ? "" : "Confirm password "}
            variant="outlined"
            value={passWordAgain}
            onChangeText={(text) => setPassWordAgain(text)}
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
            onPress={hanldPressRegister}
            style={[
              s.bgMain,
              s.toCenter,
              s.alItsCnt,
              { width: "100%", height: 60, borderRadius: 20 },
            ]}
          >
            <Text style={[s.b, s.f22, { color: "white" }]}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={[s.b, s.f18, { color: "blue", marginTop: 10 }]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
