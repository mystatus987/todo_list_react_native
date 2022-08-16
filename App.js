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
import { WelcomeScreen } from "./screens/WelcomeScreen"
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
// firebase config
// firebase config
import { firebaseConfig } from './config/Config'
import { initializeApp } from 'firebase/app'
import { 
  getFirestore,
  collection,
  addDoc,
  query,
  onSnapshot 
} from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// initialise firebase app and store ref in a variable
const FBapp = initializeApp(firebaseConfig)
// initialise Firestore
const db = getFirestore( FBapp)


const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState();
  // state to store data
  const [appData, setAppData ] = useState()

  const authObj = getAuth();
  onAuthStateChanged(authObj, (user) => {
    if (user) {
      setUser(user)
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

  const storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,

    // cache data in the memory. default is true.
    enableCache: true,
  });

  // application states array obj
  const [ListData, SetListData] = useState([]);
  const [starting, setStarting] = useState(true);

  // reference to text input
  // const txtInput = useRef()
  // function to add value of input to ListData (add an item to list)
  const addItem = (input) => {
    // use timestamp to create unique id
    console.log(input)
    let newId = new Date().getTime();
    let newItem = {
      id: newId,
      name: input,
      status: "1",
    };
    let newList = ListData.concat(newItem);
    newList.filter((item) => {
      if (item.status == '1') {
        return SetListData(newList);
      } else {
        // check the object 
        // console.log(newList)
      }
    });
    console.log(ListData)
  };

  const addData = async ( FScollection, data ) => {
    // add data to a collection with FS generated id
    const ref = await addDoc( collection(db,FScollection), data )
    console.log( ref.id )
  }

  // storage functions
  const saveData = () => {
    storage.save({
      key: "localListData",
      data: JSON.stringify(ListData),
    });
  };
  const loadData = () => {
    storage
      .load({
        key: "localListData",
      })
      .then((data) => {
        SetListData(JSON.parse(data));
      });
  };

  useEffect(() => {
    // sortList(ListData);
    saveData();
  }, [ListData]);

  useEffect(() => {
    if (starting) {
      loadData();
      setStarting(false);
    }
  });

  const completeItem = (itemId) => {
    const newList = ListData.filter((item) => {
      if (item.id == itemId) {
        return item.status = "0";
      }
    });
    SetListData(newList);
    console.log(newList);
  }

  const displayComplete = () => {
    let newList = ListData.concat(newItem);
    newList.filter((item) => {
      if (item.status == '0') {
        return SetListData(newList);
      } else {
        // check the object 
        // console.log(newList)
      }
    });
  }

  const deleteItem = (itemId) => {
    /*
    find the item id 
    remove item with the id from array (ListData)
    setListData (new array)
    */
    const newList = ListData.filter((item) => {
      if (item.id !== itemId) {
        return item;
      }
    });
    //  setListData (new array)
    SetListData(newList);
    console.log(itemId);
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
        <Stack.Screen name="History" options={{ headerTitle: "Complete Tasks" }} component={HistoryScreen} />
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