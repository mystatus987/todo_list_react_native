import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Task } from "../components/Task";
import { EmptyList } from "../components/EmptyList";
import { useNavigation } from "@react-navigation/native";
export function HomeScreen(props) {
  const navigation = useNavigation();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!props.auth) {
      navigation.reset({ index: 0, routes: [{ name: "Signup" }] });
    }
  }, [props.auth]);

  // check the data
  useEffect(() => {
    // console.log(props.data)
  }, [props.data]);

  const submit = (path, data) => {
    const dataObj = { name: data, date: new Date(), taskStatus: "1" };
    props.add(path, dataObj);
  };

  // //function to render list item
  const renderItem = ({ item }) => (
    <Task item={item} remove={props.delete} complete={props.complete} />
  );

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.title}>2Do list</Text>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate("History")}
        >
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "#fff",
            }}
          >
            Go to History
          </Text>
        </TouchableOpacity>

        <View style={styles.items}>
          <FlatList
            // get data from app.js
            data={props.data}
            // unique id for each items
            keyExtractor={(item) => item.id}
            // render item and it automatically recive each item form data line 149.
            renderItem={renderItem}
            ListEmptyComponent={EmptyList}
          />
        </View>
      </View>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.textInputWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          onChangeText={(value) => setInput(value)}
        />
        {/* data object */}
        <TouchableOpacity
          onPress={() => {
            submit(`users/${props.auth.uid}/items`, input);
          }}
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    justifyContent: "space-between",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  items: {
    marginTop: 30,
  },
  textInputWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  historyButton: {
    padding: 10,
    margin: 10,
    width: "100%",
    backgroundColor: "#0d47a1",
    padding: 10,
    borderRadius: 40,
    marginTop: 30,
  },
});
