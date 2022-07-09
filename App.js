import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TaskItem from './components/TaskItem';
export default function App() {
  return (
    <View style={styles.container}>


      <View style={styles.taskWapper}>
        <Text style={styles.titleName}>2Do List</Text>
        <View style= {styles.itmes}>
            <TaskItem text = {'Task 1'}/>
            <TaskItem text = {'Task 2'}/>
        </View>
      </View>

      {/* Write task seccsion */}
      {/* solve the common problem of views that need to move out of the way of the virtual keyboard. 
      It can automatically adjust either its height, position, or bottom padding based on the keyboard height. */}
      <KeyboardAvoidingView
        behavior={Platfrom.OS === "ios" ? "padding" : "height"}
        style = {styles.inputTextWrapper}>
          <TextInput style={styles.inputText} placeholder={'write you task here'}/>
        </KeyboardAvoidingView>

    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#49334d',
  },
  taskWapper:{
    paddingTop: 80,
    paddingHorizontal: 20
  },
  titleName:{
    fontSize:24,
    fontWeight:'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  itmes:{
    marginTop: 30
  },
});
