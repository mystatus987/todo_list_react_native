import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Task } from "../components/Task";
import { EmptyList } from "../components/EmptyList";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function HomeScreen(props) {
  const storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,

    // cache data in the memory. default is true.
    enableCache: true,
  });

  // application states array obj
  const [ListData, SetListData] = useState([]);
  const [input, setInput] = useState("");
  const [starting, setStarting] = useState(true);
  // reference to text input
  // const txtInput = useRef()
  // function to add value of input to ListData (add an item to list)
  const addItem = () => {
    // use timestamp to create unique id
    let newId = new Date().getTime();
    let newItem = {
      id: newId,
      name: input,
      status: "1",
    };
    let newList = ListData.concat(newItem);
    SetListData(newList);
    // useEffect Hook
    // useEffect(() => console.log("updating"), [ListData])
  };

  // storage functions
  const saveData = () => {
    storage.save({
      key: "localListData",
      data: JSON.stringify(ListData),
    });
  };
  const loadData = () => {
    storage
      .load({
        key: "localListData",
      })
      .then((data) => {
        SetListData(JSON.parse(data));
      });
  };

  useEffect(() => {
    // sortList(ListData);
    saveData();
  }, [ListData]);

  useEffect(() => {
    if (starting) {
      loadData();
      setStarting(false);
    }
  });

  const deleteItem = (itemId) => {
    /*
    find the item id 
    remove item with the id from array (ListData)
    setListData (new array)
    */
    const newList = ListData.filter((item) => {
      if (item.id !== itemId) {
        return item;
      }
    });
    //  setListData (new array)
    SetListData(newList);
    console.log(itemId);
  };

  //function to render list item
  const renderItem = ({ item }) => <Task item={item} remove={deleteItem} />;

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.title}>2Do list</Text>
        <View style={styles.items}>
          <FlatList
            data={ListData}
            keyExtractor={(item) => item.id}
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
        <TouchableOpacity onPress={() => addItem()}>
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
});