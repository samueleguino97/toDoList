import React from 'react';

export class List extends React.Component{
    constructor(props){
        super(props);
    
    }
    onClickLabel = item => event =>{
        
        this.props.onClickLabel(item);
        
    }
 
    render(){
        
        
        
        
        return (<ul>
            {
              this.props.items.map((item,index) => <form key={item.key} ><label  onClick={this.onClickLabel(item)}  >{item.value}</label>
              <input onClick={()=>this.props.onClick(item)}value={item.value} id={item.key} type="checkbox"></input></form>)
            }
          </ul>);
    }
}
