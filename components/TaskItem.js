import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TaskItem( props) {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.circule}></View>
                <Text style ={styles.itemText}>{props.text}</Text>
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
       flexDirection:'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       marginBottom: 20

    },
    itemLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    circule:{
        width: 25,
        height: 25,
        borderRadius: 50,
        backgroundColor: '#55BCF6',
        marginRight: 10,
        opacity: 0.4
    },
    itemText:{

    },
    circular:{

    },       
});