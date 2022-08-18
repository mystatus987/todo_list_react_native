import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { SigninScreen } from "./screens/SigninScreen";
import { SignupScreen } from "./screens/SignupScreen";
import { HistoryScreen } from "./screens/HistoryScreen";
import { SignoutButton } from "./components/SignoutButton";
import { WelcomeScreen } from "./screens/WelcomeScreen";
// firebase config
import { firebaseConfig } from './config/Config';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  // recive the data on firestore 
  onSnapshot,
  doc,
  deleteDoc
} from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// initialise firebase app and store ref in a variable
const FBapp = initializeApp(firebaseConfig)
// initialise Firestore
const db = getFirestore(FBapp)


const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState();
  // state to store data
  const [appData, setAppData] = useState()

  const authObj = getAuth();
  onAuthStateChanged(authObj, (user) => {
    if (user) {
      setUser(user)
      if (!appData) {
        getData(`users/${user.uid}/items`)
        getCompleteData(`users/${user.uid}/items`)
      }
    } else {
      setUser(null)
    }
  })
  const register = (email, password) => {
    const authObj = getAuth();
    createUserWithEmailAndPassword(authObj, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signin = (email, password) => {
    signInWithEmailAndPassword(authObj, email, password)
      .then((userCredential) => setUser(userCredential.user))
      .catch((error) => console.log(error))
  }

  const signout = () => {
    signOut(authObj)
      .then(() => {
        console.log("sign out successful");
      })
      .catch(() => {
        console.log("sign out errors");
      })
  }

  // application states array obj
  const [ListData, SetListData] = useState([]);

  // add function 
  const addData = async (FScollection, data) => {
    // add data to a collection with FS generated id
    const ref = await addDoc(collection(db, FScollection), data)
    // console.log(ref.id)
  }
  // get all todo list where status 1
  const getData = (FScollection) => {
    const FSquery = query(collection(db, FScollection), where("taskStatus", "==", '1'))
    // console.log(FScollection)
    const unsubscribe = onSnapshot(FSquery, (querySnapshot) => {
      let FSdata = []
      querySnapshot.forEach((doc) => {
        let item = {}
        item = doc.data()
        item.id = doc.id
        FSdata.push(item)
      })
      setAppData(FSdata)
    })
  }
  // get all todo list where status 0
  const getCompleteData = (FScollection) => {
    const FSquery = query(collection(db, FScollection), where("taskStatus", "==", '0'))
    // console.log(FScollection)
    const unsubscribe = onSnapshot(FSquery, (querySnapshot) => {
      let FSdata = []
      querySnapshot.forEach((doc) => {
        let item = {}
        item = doc.data()
        item.id = doc.id
        FSdata.push(item)
      })
      setAppData(FSdata)
    })
  }
  // update status 
  const completeItem = async (itemId) => {
    // when you update you have to pass the which user update items and get item id to parameter 
    const collectionRef = doc(db, `users/${user.uid}/items`, itemId)
    // await setDoc(collectionRef, data);
    // set status as 0
    await updateDoc(collectionRef, {
      taskStatus: '0'
    });
  }

  // delete todo list function 
  const deleteItem = async (itemId) => {
    const collectionRef = doc(db, `users/${user.uid}/items`, itemId)
    await deleteDoc(collectionRef);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* to pass additional props we have to change our Stack.screen component */}
        <Stack.Screen name="Hello!" component={WelcomeScreen} ></Stack.Screen>
        <Stack.Screen name="Signup" options={{
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackVisible: false
        }}>
          {(props) => <SignupScreen {...props} signup={register} auth={user} />}
        </Stack.Screen>
        <Stack.Screen name="Signin">
          {(props) => <SigninScreen {...props} signin={signin} auth={user} />}
        </Stack.Screen>
        <Stack.Screen name="Home" options={{
          title: "YOUR TASKS",
          headerRight: (props) => <SignoutButton {...props} signout={signout} />
        }}>
          {(props) => <HomeScreen {...props} auth={user} data={appData} add={addData} delete={deleteItem} complete={completeItem} />}

        </Stack.Screen>
        <Stack.Screen name="History" options={{ headerTitle: "Complete Tasks" }}>
          {(props) => <HistoryScreen {...props} auth={user} data={appData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});