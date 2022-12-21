import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import carddata from "../../context/card";
import { useEffect, useState } from "react";
import images from "../../assets";
import { RadioButton } from "react-native-paper";

function Checkout({ navigation, route }) {
  const total = route.params?.total;

  const name = "Rosina Doe";
  const address = "43 Oxford Road M13 4GR Manchester, UK";
  const phone = "+234 9011039271";

  const [card, setListCard] = useState([]);
  const [value, setValue] = useState("visa");
  const [choneCard, SetChoseCard] = useState();
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    setListCard(carddata);
  }, [card]);

  const handleConfirm = () => {
    // Alert.alert("Thông báo", "Đã đặt hàng thành công");
    // navigation.navigate("Home");
    Alert.alert("Messgae", "Payment confirmation?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);
  };

  const handleChangeCard = (newValue) => {
    setValue(newValue);
    setChecked(false);
    SetChoseCard(newValue);
  };
  const Item = ({ item }) => {
    return (
      <View style={styles.card_item}>
        <View style={styles.info_box_card}>
          <RadioButton value={item.value} />
        </View>
        <View style={styles.view_logo}>
          <Image style={styles.logo_bank} source={item.icon} />
        </View>
        <Text style={styles.item_number}>{item.number}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => navigation.goBack()}>
        <View style={styles.content_center}>
          <View style={styles.center_title}>
            <Text style={styles.title}>Checkout</Text>
          </View>
        </View>
      </Header>

      <View style={styles.cotent}>
        <Text style={[styles.title_info]}>Shipping information</Text>
        <TouchableOpacity>
          <Text style={[styles.change_txt]}>change</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cotent_info}>
        <View style={styles.info_box}>
          <Ionicons style={[styles]} name="person-outline" size={24} />
          <Text style={styles.info_name}>{name}</Text>
        </View>

        <View style={styles.info_box}>
          <Ionicons style={[styles]} name="location-outline" size={24} />
          <Text style={styles.info_name}>{address}</Text>
        </View>

        <View style={styles.info_box}>
          <Ionicons style={[styles]} name="call-outline" size={24} />
          <Text style={styles.info_name}>{phone}</Text>
        </View>
      </View>

      {/* Card */}
      <View style={styles.cotent_card}>
        <RadioButton.Group
          onValueChange={(newValue) => {
            handleChangeCard(newValue);
          }}
          value={value}
        >
          <FlatList
            data={card}
            renderItem={Item}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
          />
        </RadioButton.Group>
      </View>

      {/* Total */}
      <View style={styles.conten_total}>
        <Text style={[styles.title_price]}>Total: </Text>
        <Text style={[styles.price]}>${total}</Text>
      </View>

      <TouchableOpacity
        style={checked ? styles.btn_disable : styles.btn}
        onPress={handleConfirm}
        disabled={checked}
      >
        <Text style={styles.btn_title}>Confirm and pay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Checkout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  content_center: {
    width: "85%",
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  center_title: {
    width: "65%",
  },
  end_icon: {
    width: "10%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  cotent: {
    width: "80%",
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title_info: {
    fontSize: 20,
  },
  change_txt: {
    fontSize: 18,
    color: "#5956E9",
    fontWeight: "500",
  },
  cotent_info: {
    width: "80%",
    height: 200,
    flexDirection: "column",
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    shadowColor: "#F5F5F5",
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.2,
  },
  info_box: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: 60,
  },
  info_name: {
    fontSize: 20,
    paddingLeft: 20,
  },
  //
  conten_total: {
    marginTop: 30,
    paddingVertical: 20,
    width: "80%",
    alignItems: "center",

    justifyContent: "space-between",
    flexDirection: "row",
  },
  title_price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5956E9",
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5956E9",
  },

  btn: {
    marginTop: 20,
    backgroundColor: "#5956E9",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_disable: {
    marginTop: 20,
    backgroundColor: "#5956E9",
    opacity: 0.5,
    width: "80%",
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "500",
  },
  // Card
  info_box_card: {
    width: 40,
    backgroundColor: "#F5F5F5",
    marginRight: 5,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  card_item: {
    width: "90%",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cotent_card: {
    paddingTop: 20,
    width: "80%",
    height: 240,
    flexDirection: "column",
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#F5F5F5",
    borderWidth: 2,
    shadowColor: "#F5F5F5",
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.2,
  },
  logo_bank: {
    borderRadius: 10,
    resizeMode: "contain",
  },
  view_logo: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    height: 45,
    width: 65,
    borderRadius: 10,
  },
  item_number: {
    paddingLeft: 10,
    fontStyle: "italic",
    fontSize: 20,
  },
  cardcontainer: {
    flexGrow: 1,
  },
});
