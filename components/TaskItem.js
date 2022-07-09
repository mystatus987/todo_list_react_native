import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TaskItem( props) {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}>
                <Text style ={styles.itemText}>{props.text}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.circular}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
       backgroundColor: '#fff',
       padding: 15,
       borderRadius: 10,
    },
    itemLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square:{

    },
    itemText:{

    },
    circular:{

    },       
});