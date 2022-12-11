import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/header";
import s from "../../styles/mainStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";

function Profile({ navigation }) {
  const [menu, setMenu] = useState([
    {
      id: 0,
      name: "Edit Profile",
      slug: "EditProfile",
      icon: "person-circle-outline",
    },
    {
      id: 1,
      name: "Shopping address",
      slug: "TrackOrder",
      icon: "location-outline",
    },
    { id: 2, name: "Order history", slug: "wishlist", icon: "cart-outline" },
    { id: 3, name: "Cards", slug: "wishlist", icon: "card-outline" },
    {
      id: 4,
      name: "Notifications",
      slug: "wishlist",
      icon: "notifications-outline",
    },
  ]);

  const actionHandler = (data) => {
    props.navigation.navigate(data);
  };

  const renderItem = ({ item }) => <Item title={item} action={actionHandler} />;

  const Item = ({ title, action }) => (
    <TouchableOpacity
      onPress={() => action(title.slug)}
      style={[styles.item_menu]}
    >
      <View style={styles.title_view}>
        <View style={styles.start}>
          <Ionicons name={title.icon} size={30} />

          <Text style={styles.title_item}>{title.name}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} />
      </View>
    </TouchableOpacity>
  );
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header onPress={() => navigation.goBack()}></Header>

        {/* Info User */}
        <Text style={styles.top_title}>My Profile</Text>

        <View style={styles.cotent_info}>
          <View style={styles.cotent_img}>
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
              }}
              style={[{ width: 70, height: 70, borderRadius: 50 }]}
            />

            <Text style={[s.f18, s.b, { fontSize: 24 }]}>Shuja Khalid</Text>
          </View>

          <View style={[styles._info__name]}>
            <Ionicons style={[styles.icon]} name="location-outline" size={24} />
            <Text style={[s.f14, s.pdtp5, styles.address_text]}>
              Address: 43 Oxford Road M13 4GR Manchester, UK
            </Text>
          </View>
        </View>

        <View style={styles._info}>
          <FlatList
            data={menu}
            renderItem={renderItem}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

export default Profile;

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
    width: "50%",
  },
  end_icon: {
    width: "10%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  cotent_info: {
    width: "80%",
    height: 180,
    flexDirection: "column",
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#F5F5F5",
    borderWidth: 1,
    shadowColor: "#F5F5F5",
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.2,
  },
  _info: {
    marginTop: 30,
    paddingVertical: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  top_title: {
    fontSize: 30,
    width: "80%",
    marginVertical: 10,
    fontWeight: "700",
  },
  cotent_img: {
    alignItems: "center",
    paddingTop: 5,
    flexDirection: "column",
  },
  _info__name: {
    width: "90%",
    paddingVertical: 5,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  address_text: {
    fontSize: 16,
  },
  top: {
    justifyContent: "flex-start",
  },
  icon: {
    marginTop: 5,
  },
  item_menu: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 3,
    borderColor: "#F5F5F5",
  },
  start: {
    flexDirection: "row",
    alignItems: "center",
  },
  title_view: {
    width: "100%",

    flexDirection: "row",
    justifyContent: "space-between",
  },
  title_item: { textAlign: "center", fontSize: 20, paddingLeft: 10 },
});
