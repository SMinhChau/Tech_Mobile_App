import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";

function Basket({ navigation, route }) {
  const [listBasket, setListBasket] = useState([]);
  const [cart, setCart] = useState(0);
  const product = route.params?.product;

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log("listBasket", listBasket);
  }, [listBasket]);

  useEffect(() => {
    if (product) {
      setListBasket([...listBasket, product]);
      setCart(
        [...listBasket, product].reduce((sum, cur) => sum + cur.price, 0)
      );
    }
  }, [product]);

  const handelQuantity = (id, count) => {
    if (typeof Intl === "undefined") {
      require("intl");
      require("intl/locale-data/jsonp/en");
    }
    let newList = listBasket;
    let deleted = false;
    newList.map((item) => {
      if (item.id === id) {
        item.total = item.total + count;
        if (item.total == 0) {
          deleted = true;

          console.log(" deleted = true");
        }
      }
    });
    if (deleted) {
      newList = newList.filter((item) => item.id != id);
    }
    setListBasket([...newList]);
    setCart(
      listBasket.reduce((count, quantity) => {
        const number = Number(quantity.total);
        const price = quantity.price;
        const result = new Intl.NumberFormat("de-DE").format(
          Number(count) + Number(number * price)
        );
        return result;
      }, 0)
    );
  };

  // Amination for ring free for product
  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [animation]);

  const animatedStyles = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  const Item = ({ item }) => (
    <View style={styles.item}>
      <View style={[styles.f_image, styles.fext_center]}>
        <Image
          style={styles.FlatList_img_bottom}
          source={{ uri: item.image }}
        />
      </View>

      <View style={[styles.f_title, styles.fext_center_collum]}>
        <Text style={[styles.f_title__title]}>{item.name}</Text>
        <Text style={styles.f_title__price}>$ {item.price} </Text>
        <View style={[styles.cart_bottom]}>
          <Text style={styles.quantity_title}>Quantity</Text>
          <TouchableOpacity
            style={styles.btn_count}
            onPress={() => {
              handelQuantity(item.id, -1);
            }}
          >
            <Text style={styles.text_count}>-</Text>
          </TouchableOpacity>
          <Text style={styles.count_item}>{item.total || 0}</Text>
          <TouchableOpacity
            style={styles.btn_count}
            onPress={() => {
              handelQuantity(item.id, 1);
            }}
          >
            <Text style={styles.text_count}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => navigation.goBack()}>
        <View style={styles.content_center}>
          <View style={styles.center_title}>
            <Text style={styles.title}>Basket</Text>
          </View>
        </View>
      </Header>

      <View style={styles.ring}>
        {/* <Ionicons
          style={[styles.icon_ring]}
          name="notifications-outline"
       
        /> */}
        <Text>Delivery for FREE until the end of the month</Text>
      </View>

      {/* List Product Order */}

      <View style={styles.flatList}>
        <FlatList
          data={listBasket}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.conten_total}>
        <Text style={[styles.title_price]}>Total: </Text>
        <Text style={[styles.price]}>${cart}</Text>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Checkout", { total: cart })}
      >
        <Text style={styles.btn_title}>Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Basket;

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
  icon_ring: {
    marginLeft: 3,
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  ring: {
    width: "75%",
    backgroundColor: "#AFEEEE",
    height: 40,
    marginHorizontal: 3,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  flatList: {
    width: "85%",
    height: 410,
    marginVertical: 30,
  },
  item: {
    height: 140,
    backgroundColor: "#F0FFFF",
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,

    elevation: 2,
  },

  fext_center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  // img
  FlatList_img_bottom: {
    height: 90,
    width: 100,
    resizeMode: "contain",
  },
  f_image: {
    height: 110,
    width: "35%",

    paddingHorizontal: 10,
    flexDirection: "row",
  },
  f_title: {
    width: "60%",
    height: "75%",
    paddingLeft: 10,

    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  cart_bottom: {
    width: "80%",
    // borderRadius: "10%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  f_title__title: {
    fontSize: 18,
    width: "95%",
    fontWeight: "500",

    color: "#000",
  },
  f_title__price: {
    fontSize: 18,
    color: "#5956E9",
    fontWeight: "700",
  },
  count_item: {
    fontSize: 20,
    fontWeight: "700",
  },
  btn_count: {
    height: 20,
    width: 20,
    backgroundColor: "#AFEEEE",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: "5%",
  },

  quantity_title: {
    fontSize: 18,
  },
  text_count: {
    height: 20,
    width: 20,

    textAlign: "center",
  },

  conten_total: {
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
    // borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "500",
  },
});
