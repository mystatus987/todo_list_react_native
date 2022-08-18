import React from 'react';
import { View, Text, StyleSheet, CheckBox  } from 'react-native';
import { useState, useEffect } from "react";
export function CompleteTask(props) {
   // check the data 
   useEffect(() => {
    // console.log(props)
  })


  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.circule}></View>
        {/* `display task ` */}
        <Text style={styles.itemText}>{props.item.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    backgroundColor: '#ff9470',
    opacity: 0.4,
    borderRadius: 50,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
 
});

