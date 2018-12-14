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
        curr: '',
        isChecked:false
      },
      items: []
    };
    this.onClick=this.onClick.bind(this);
  }

  onChange = (event) => {
    this.setState({ term: {
      curr: event.target.value,
      isChecked:false,
    } });
  }

  onClick = (event)=>{
    
    
    this.setState({term:{
      curr: this.state.term.curr,
      isChecked: !this.state.term.isChecked
    }})

    
  }
  componentDidUpdate(){
    const taskRef = database.ref('/tasks');
    taskRef.update(this.state.term);
  }

  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.term.curr){
    const itemsRef=database.ref('/tasks');
    itemsRef.push(this.state.term);

    this.setState({
      term: {
        curr: '',
        isChecked:false
      },
      items: [...this.state.items, this.state.term]
    });
  }

  }

  render() {
    return (
      <div className="wrapper">
      <h1 style={{color: 'lightblue'}}>To-Do List</h1>
        <form className="App" onSubmit={this.onSubmit}>
          <input value={this.state.term.curr} onChange={this.onChange} />
          <button>Add Task</button>
        </form>
        <List onClick={this.onClick} items={this.state.items} />
      </div>
    );
  }
}

