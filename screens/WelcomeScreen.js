import {
    KeyboardAvoidingView,
    StyleSheet,
    FlatList,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from '@react-navigation/native'
export function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <View style = {styles.container}>
            <View  style = {styles.imgCenter}>
                <Image  style={styles.welcomeImg} source={require('../assets/welcomeImg.png')} />
            </View>
            <Text style = {styles.title}>Welcome to todo List</Text>
            <TouchableOpacity style = {styles.startButton} onPress={() => navigation.navigate('Signup')}>
                <Text>Get start</Text>
            </TouchableOpacity>
        </View>

    )
} 

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#FF8FB1",
        justifyContent: "space-even",
    },
    title: {
        marginTop: 20,
        fontSize: 25,
        textAlign: 'center'
    },
    imgCenter:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
        maxWidth: 500,
    },
    welcomeImg: {   
        maxWidth: 350,
        maxHeight: 250,
    },
    startButton:{
        alignItems: "center",
        backgroundColor: "#B2A4FF",
        padding: 10,
        margin: 10
    }
})