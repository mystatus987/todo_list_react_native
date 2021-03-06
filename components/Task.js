import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function Task(props) {

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.circule}></View>
        {/* `display task ` */}
        <Text style={styles.itemText}>{props.item.name}</Text>
      </View>
      <TouchableOpacity onPress={ () => props.remove(props.item.id)}>
        <View style={styles.circular}>
          <Text>DELETE</Text>
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
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 50,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

