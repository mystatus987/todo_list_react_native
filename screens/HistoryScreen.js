import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CompleteTask } from "../components/CompleteTask";
export function HistoryScreen(props) {
  const renderItem = ({ item }) => <CompleteTask item={item} />;
  return (

    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.title}>Complete List!</Text>
        <View style={styles.items}>
          <FlatList
            // get data from app.js 
            data={props.data}
            // unique id for each items 
            keyExtractor={(item) => item.id}
            // render item and it automatically recive each item form data line 149.
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8FB1",
    justifyContent: "space-even",
  },
  items: {
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    // marginTop: 30
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
});
