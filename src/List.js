import React from 'react';

export class List extends React.Component{
    
    
    render(){
        
        
        
        
        return (<ul>
            {
              this.props.items.map((item,index) => <form key={item.key} ><label htmlFor={item.key}>{item.value}</label>
              <input onClick={this.props.onClick}value={item.value} id={item.key} type="checkbox"></input></form>)
            }
          </ul>);
    }
}
