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
import { render } from "react-dom";
export function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Image
        style={styles.welcomeImg}
        source={require("../assets/welcomeImg.png")}
        resizeMode="contain"
      />

      <Text style={styles.title}>2DoList</Text>
      <Text
        style={{
          fontSize: 16,
          color: "gray",
          textAlign: "center",
          marginHorizontal: 20,
        }}
      >
        List everything you do!
      </Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={{ color: "#fff" }}>Get start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 25,
    textAlign: "center",
  },
  imgCenter: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    maxWidth: 500,
  },
  welcomeImg: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    width: 200,
    backgroundColor: "#0d47a1",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    marginTop: 30,
  },
});
