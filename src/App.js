import React, { Component } from 'react';

import './App.css';
import firebase from 'firebase';

import{List} from './List';

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
      term: {
        key: '',
        value:''
      },
      items: [{
        key: '1',
        value: ' loading'
      }]
    };
    this.onClick=this.onClick.bind(this);
    
  }
  componentWillMount(){
    
    
    const tasksRef = database.ref('/tasks');

    let self = this;
    tasksRef.on('value',function(snapshot){
      let data=[];
      snapshot.forEach(function(chSnapshot){
        console.log(chSnapshot.val());
        data.push({key: chSnapshot.key,value: chSnapshot.val().value});
      });
      console.log(JSON.stringify(data));

      self.setState({
        
        items: data
      });
    });
    
    
  }
  

  onChange = (event) => {
    this.setState({ term:{ 
      value: event.target.value
    }

    } );
  }

 
  onClick(e){
    
    const item = this.state.items.find(itemToFind=>{
      return itemToFind.value==e.target.value;
    });
    this.removeItem(item.key);
  }
  removeItem(key){
    const tasksRef = database.ref('/tasks');
    tasksRef.child(key).remove();
  }

  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.term){
    const itemsRef=database.ref('/tasks');
    itemsRef.push(this.state.term);

    this.setState({
      term: {
        key: '',
        value: ''
      },
      items: [...this.state.items, this.state.term]
    });
  }

  }

  render() {
    console.log(JSON.stringify(this.state.items));
    

    return (
      <div className="wrapper">
      <h1 style={{color: 'lightblue'}}>To-Do List</h1>
        <form className="App" onSubmit={this.onSubmit}>
          <input value={this.state.term.value} onChange={this.onChange} />
          <button>Add Task</button>
        </form>
        <List onClick={this.onClick} items={this.state.items} />
      </div>
    );
  }
}

