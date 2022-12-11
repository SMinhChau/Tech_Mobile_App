import { View, StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
function Header({ children, onPress, title }) {
  return (
    <View style={styles.body}>
      <Ionicons
        name="arrow-back-outline"
        style={[styles.icon, { fontSize: 30, color: "#000" }]}
        onPress={onPress}
      />

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    alignItems: "center",
    marginLeft: 20,
  },
});
export default Header;
