import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react";
export function Task(props) {
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
      <TouchableOpacity onPress={ () => props.complete(props.item.id)}>
        <View style={styles.buttonStatus}>
          <Text>Complete</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => props.remove(props.item.id)}>
        <View style={styles.buttonStatus}>
          <Text>Delete</Text>
        </View>
      </TouchableOpacity>

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
    backgroundColor: '#B2A4FF',
    opacity: 0.4,
    borderRadius: 50,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  buttonStatus: {
    backgroundColor: '#B1E1FF',
    borderStyle: 'solid',
    borderColor: '#B1E1FF',
    borderWidth: 1,
    borderRadius: 5,
  },
});

