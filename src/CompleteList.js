import React from 'react';

export class CompleteList extends React.Component{
    onClickLabel = item => event =>{
        this.props.onClickLabel(item);
    }
    render(){
        
        return (<ul style={{backgroundColor: 'lightblue'}}>
            <h3>Completed Tasks</h3>
            {
              this.props.items.map((item,index) => <form key={item.key} ><label>{item.value}</label>
              <input onClick={()=>this.props.onClick(item)}value={item.value} id={item.key} type="checkbox"></input></form>)
            }
          </ul>);
    }
}