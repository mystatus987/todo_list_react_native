import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
