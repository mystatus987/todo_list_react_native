
import { View, Text, StyleSheet, Image } from 'react-native'

export function EmptyList() {
    return (
        <View>
            <View style = {styles.imgCenter}>
                <Image style={styles.emptyImg} source={require('../assets/image.png')} />
            </View>
            <Text style={styles.message}>Your task is empty !</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    message: {
        marginTop: 20,
        fontSize: 25,
        textAlign: 'center'
    },
    imgCenter:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
        maxWidth: 500
    },
    emptyImg: {
        maxWidth: 250,
        maxHeight: 250,
    },
})

