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
      term: '',
      items: []
    };
    this.onClick=this.onClick.bind(this);
    
  }
  componentDidMount(){
    let data=[];
    const tasksRef = database.ref('/tasks');
    tasksRef.on('value',function(snapshot){
      snapshot.forEach(function(chSnapshot){
        data.push(chSnapshot.val());
      });
    });
    this.setState({
      items: data
    });
    
  }
  

  onChange = (event) => {
    this.setState({ term: event.target.value
    } );
  }

 
  onClick(e){
    const nI=this.state.items;
    nI.splice(nI.indexOf(e.target.value),1);
    setTimeout(()=>{
    
    this.setState({
      items: nI,
    });},1000);
  }

  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.term){
    const itemsRef=database.ref('/tasks');
    itemsRef.push(this.state.term);

    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    });
  }

  }

  render() {
    return (
      <div className="wrapper">
      <h1 style={{color: 'lightblue'}}>To-Do List</h1>
        <form className="App" onSubmit={this.onSubmit}>
          <input value={this.state.term} onChange={this.onChange} />
          <button>Add Task</button>
        </form>
        <List onClick={this.onClick} items={this.state.items} />
      </div>
    );
  }
}

