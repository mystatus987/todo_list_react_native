import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState();
  const navigation = useNavigation();
  const validateEmail = (emailStr) => {
    // check if email contains '@' symbol
    const atIndex = emailStr.indexOf("@");
    if (atIndex > 0) {
      return true;
    } else {
      return false;
    }
  };

  const validatePassword = (passwordStr) => {
    // check the length of the password
    const passLength = passwordStr.length;
    if (passLength >= 8) {
      return true;
    } else {
      return false;
    }
  };
  const signIn = (email, password) => props.signin(email, password);

  useEffect(() => {
    // console.log( validateEmail( email ) )
    if (validateEmail(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
    if (validatePassword(password)) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }, [email, password]);

  useEffect(() => {
    // auth is passed on as a prop from App.js
    if (props.auth) {
      // navigate to the Home screen
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }
  }, [props.auth]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.signupView} behavior="padding">
        <Text style={{ fontSize: 40, fontWeight: "bold" }}> Welcome back!</Text>
        <Text style={{ fontSize: 16, color: "gray", marginTop: 20 }}>
          Login to continue
        </Text>
        <View style={styles.signupForm}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
          />
          <TouchableOpacity
            style={
              validEmail && validPassword ? styles.button : styles.buttonDisabled
            }
            disabled={validEmail && validPassword ? false : true}
            onPress={() => signIn(email, password)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text>Go to Sign up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8FB1",
    justifyContent: "space-even",
  },
  signupView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signupForm: {
    backgroundColor: "fff",
    width: "80%",
    padding: 10,
    borderRadius: 30,
  },
  label: {
    marginVertical: 10,
    borderBottomColor: "#ddd",
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  form: {
    alignItems: "flex-start",
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 30,
  },
  buttonDisabled: {
    backgroundColor: "#CCCCCC",
    padding: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    borderRadius: 30,
  },
});