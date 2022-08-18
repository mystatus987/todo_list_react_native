import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
export function HistoryScreen(props) {
  return (
    //     <View style={styles.item}>
    //     <View style={styles.itemLeft}>
    //     <View style={styles.circule}></View>
    //     {/* `display task ` */}
    //     <Text style={styles.itemText} >{props.item.name}</Text>
    //   </View>
    // </View>
    <View style = {styles.container}><Text>History page</Text></View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8FB1",
    justifyContent: "space-even",
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  circule: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 50,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
});
