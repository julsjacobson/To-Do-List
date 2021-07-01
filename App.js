import { StatusBar } from 'expo-status-bar';
import React, {useState}  from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Task'
import Icon from 'react-native-vector-icons/AntDesign';




export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);



  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);

  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];

    // Removes the one item from the array
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  return (
    <View style={styles.container}>

      {/* Today's tasks */}
      <View style={styles.taskWrapper}>
      <Text style={styles.sectionTitle}>Today's tasks</Text>

      <View style={styles.item}>
        {
          taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item}/>

              </TouchableOpacity>
            )
          })
        }
        
      </View>
      </View>

      {/*  Write a task section */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        style={styles.writeTaskWrapper}>

          <TextInput style={styles.input} 
            placeholder={"Write a task"}
            value={task}
            onChangeText={text => setTask(text)}/>
          <TouchableOpacity onPress={() => handleAddTask()}>
              <View style={styles.addWrapper}>
                {/* <Text style={styles.addText}>+</Text> */}
                <Icon name="pluscircle" size={30} color={'#C0c0c0'} />
                
              </View>
          </TouchableOpacity>

      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED'
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,

  },
  item: {},
  writeTaskWrapper :{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'

  },
  input: {
    paddingVertical: 15,
    width: 300,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0c0c0',
    borderWidth: 1

  },
  addWrapper: {
    width: 60,
    height: 60,
    // backgroundColor: '#FFF',
    // borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#C0c0c0',
    // borderWidth: 1


  },
  addText: {},
});
