import {
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
export function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imgCenter}>
        <Image
          style={styles.welcomeImg}
          source={require("../assets/welcomeImg.png")}
        />

        <Text style={{ fontSize: 40, fontWeight: "bold" }}> 2DoList</Text>
      </View>
      <Text style={styles.title}>List Everything you do</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={{ fontcolor: "fff" }}>Get start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fffd",
  },
  title: {
    marginTop: 20,
    fontSize: 25,
    textAlign: "center",
    color: "gray",
  },
  imgCenter: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    maxWidth: 500,
  },
  welcomeImg: {
    maxWidth: 350,
    maxHeight: 250,
  },
  startButton: {
    alignItems: "center",
    backgroundColor: "#0d47a1",
    padding: 10,
    margin: 10,
    justifyContent: "center",
    borderRadius: 30,
  },
});
