import React from 'react';

export class Controller extends React.Component{
    constructor(props){
        super(props);
        this.onSubmit=this.onSubmit.bind(this);
    }
    
    onChange(e){
        this.props.onChange(e.target.value);
    }
    onSubmit(e){
        e.preventDefault();
        this.props.onClick();
        

    }
    render(){
        return (<form onSubmit={this.onSubmit}>
            <input  onChange={this.handleChange} placeholder="Add a new task"></input>
            <button  type="submit">Add Item</button>
        </form>);
    }
}