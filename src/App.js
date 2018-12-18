import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import{List} from './List';
import { CompleteList } from './CompleteList';

const config = {
  apiKey: "AIzaSyC7xlwO9ZlwOnRHyg3VEmZKym5PU426jos",
  authDomain: "to-do-49ddd.firebaseapp.com",
  databaseURL: "https://to-do-49ddd.firebaseio.com",
  projectId: "to-do-49ddd",
  storageBucket: "to-do-49ddd.appspot.com",
  messagingSenderId: "468212013435"
};
firebase.initializeApp(config);
const database = firebase.database();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeValue: {
        key: '',
        value: ''
      },
      term: {
        key: '',
        value:''
      },
      items: [],
      completedItems: []
    };
    this.onClick=this.onClick.bind(this);
    this.onClickLabel=this.onClickLabel.bind(this);
    this.onSubmitChange=this.onSubmitChange.bind(this);
    this.onClickComplete=this.onClickComplete.bind(this);
  }
  componentWillMount(){
    const tasksRef = database.ref('/tasks');
    const cTasksRef = database.ref('/completeTasks');
    const self = this;
    cTasksRef.on('child_added',snapshot=>{
      let data;
      data={
        key: snapshot.key,
        value: snapshot.val().value
      }
      self.setState({
        completedItems: [...self.state.completedItems, data]
      });
    });
    tasksRef.on('child_added',function(snapshot){
      let data;
      data = {
        key : snapshot.key,
        value: snapshot.val().value
      }
      self.setState({
        term: {
          key: '',
          value: ''
        },
        items: [...self.state.items, data]
      });
    });
    tasksRef.on('child_changed',(snapshot)=>{
        const newList = this.state.items;
        const changedItem =this.state.items.find(itemToFind=>{
          return itemToFind.key==snapshot.key;
        });
        newList[newList.indexOf(changedItem)]={
          key: snapshot.key,
          value: snapshot.val().value
        }
        this.setState({
          changeValue:{
            key: '',
            value: ''
          },
          items: newList
        });
      
    });
    database.ref('/tasks').on('child_removed',(snapshot)=>{
      const newList = this.state.items;
        const dItem =this.state.items.find(itemToFind=>{
          return itemToFind.key==snapshot.key;
        });
        console.log(dItem);
      newList.splice(newList.indexOf(dItem),1)
     
        this.setState({
        changeValue:{
          key: '',
          value: ''
        }
          ,
        items: newList,
      });
    });
    database.ref('/completeTasks').on('child_removed',(snapshot)=>{
      const newList = this.state.completedItems;
        const dItem =this.state.completedItems.find(itemToFind=>{
          return itemToFind.key==snapshot.key;
        });
      newList.splice(newList.indexOf(dItem),1)
     
        this.setState({
        completedItems: newList,
      });
    });
  }
  onClickLabel(item){
    this.setState({
      changeValue: {
        key:item.key,
        value: item.value
      }
    }); 
  }
  onChange = (event) => {
    this.setState({ term:{ 
      value: event.target.value
    }});
  }
  onSubmitChange(e){
    e.preventDefault();
    console.log(this.state.changeValue.key);
    database.ref('/tasks').child(this.state.changeValue.key).child('value').set(this.state.changeValue.value);
  }
  onChangeName = event =>{
    this.setState({
      changeValue: {
        value: event.target.value,
        key: this.state.changeValue.key
      }
    });
  }
  onClick(task){
    
    const item = this.state.items.find(itemToFind=>{
      return itemToFind.value==task.value;
    });
    const cTasksRef = database.ref('/completeTasks');
    cTasksRef.push(item);
    database.ref('/tasks').child(item.key).remove();
    
  }
  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.term){
    const tasksRef=database.ref('/tasks');    
    tasksRef.push(this.state.term);
  }
}
onClickComplete(task){
  const item = this.state.completedItems.find(itemToFind=>{
    return itemToFind.value==task.value;
  });
  const tasksRef = database.ref('/tasks');
  tasksRef.push(item);
  database.ref('/completeTasks').child(item.key).remove();
}
  render() {
    const buttonText = this.state.changeValue.value? 'Change Name': 'Add task';
    const valueToChange = this.state.changeValue.value? this.state.changeValue.value:this.state.term.value;
    const functionToChange = this.state.changeValue.value? this.onChangeName:this.onChange;
    const submitToChange = this.state.changeValue.value? this.onSubmitChange:this.onSubmit;
 
    return (
      <div className="wrapper">
      <h1 style={{color: 'lightblue'}}>To-Do List</h1>
      <h2 style={{color: 'lightblue', 
    textAlign: 'center'}}>type on the box and then click on a label to change the task</h2>
        <form className="App" onSubmit={submitToChange}>
          <input value={valueToChange} onChange={functionToChange} />
          <button>{buttonText}</button>
        </form>
        <List changeItem={this.changeItem} term={this.state.term} onClickLabel={this.onClickLabel} onClick={this.onClick} items={this.state.items} />
        <div style={{backgroundColor: 'lightblue',width: '100%',height: '50%'}}>
        <CompleteList onClick={this.onClickComplete} items={this.state.completedItems}/>
        </div>
      </div>
    );
  }
}

