import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

export function SigninScreen(props) {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState();
    const navigation = useNavigation()
    const validateEmail = (emailStr) => {
        // check if email contains '@' symbol
        const atIndex = emailStr.indexOf("@");
        if (atIndex > 0) {
            return true;
        } else {
            return false;
        }
    };

    const validatePassword = (passwordStr) => {
        // check the length of the password
        const passLength = passwordStr.length;
        if (passLength >= 8) {
            return true;
        } else {
            return false;
        }
    };
    const signIn = (email, password) => props.signin(email, password)

    useEffect(() => {
        // console.log( validateEmail( email ) )
        if (validateEmail(email)) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
        }
        if (validatePassword(password)) {
            setValidPassword(true);
        } else {
            setValidPassword(false);
        }
    }, [email, password]);

    useEffect(() => {
        // auth is passed on as a prop from App.js
        if (props.auth) {
            // navigate to the Home screen
            navigation.reset({ index: 0, routes: [{ name: "Home" }] })
        }
    }, [props.auth])

    return (
        <KeyboardAvoidingView style={styles.signupView} behavior='padding'>
            <Text>Sign in</Text>
            <View style={styles.signupForm}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} onChangeText={(value) => setEmail(value)} />
                <Text>Password</Text>
                <TextInput style={styles.input} secureTextEntry={true} onChangeText={(value) => setPassword(value)} />
                <TouchableOpacity
                    style={(validEmail && validPassword) ? styles.button : styles.buttonDisabled}
                    disabled={(validEmail && validPassword) ? false : true}
                    onPress={() => signIn(email, password)}
                >
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text>Go to Sign up</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    signupView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    signupForm: {
        backgroundColor: "lightblue",
        width: "80%",
        padding: 10,
    },
    label: {
        marginVertical: 10,
    },
    input: {
        backgroundColor: "#ffffff",
        marginBottom: 15,
        padding: 10,
    },
    form: {
        alignItems: "flex-start",
    },
    button: {
        backgroundColor: "black",
        padding: 10,
    },
    buttonDisabled: {
        backgroundColor: "#CCCCCC",
        padding: 10,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
});