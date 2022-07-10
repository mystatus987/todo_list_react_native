import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, FlatList, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { Task } from './components/Task';
import { EmptyList } from './components/EmptyList';
export default function App() {


  // application states array obj
  const [ListData, SetListData] = useState([])
  const [input, setInput] = useState('')
  // reference to text input 
  // const txtInput = useRef()
  // function to add value of input to ListData (add an item to list)
  const addItem = () => {
    // use timestamp to create unique id
    let newId = new Date().getTime()
    let newItem = {
      id: newId,
      name: input,
      status: false
    }
    let newList = ListData.concat(newItem)
    SetListData(newList)
    // useEffect Hook
    // useEffect(() => console.log("updating"), [ListData])
  }

  const deleteItem = (itemId) => {
    /*
    find the item id 
    remove item with the id from array (ListData)
    setListData (new array)
    */
    const newList = ListData.filter((item) => {
      if (item.id !== itemId) {
        return item
      }
    })
    //  setListData (new array)
    SetListData(newList)
    console.log(itemId)
  }


  //function to render list item
  const renderItem = ({ item }) => (
    <Task item={item} remove={deleteItem}/>
  )

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.title}>2Do list</Text>
        <View style={styles.items}>

          <FlatList
            data={ListData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={EmptyList}
          />

        </View>
      </View>


      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.textInputWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} onChangeText={(value) => setInput(value)} />
        <TouchableOpacity onPress={() => addItem()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  items: {
    marginTop: 30,
  },
  textInputWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
});