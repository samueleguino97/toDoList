import React from 'react';

export class List extends React.Component{
    
    
    render(){
        return (<ul>
            {
              this.props.items.map((item, index) => <form key={index}><label htmlFor={item}>{item}</label>
              <input onClick={this.props.onClick}value={item} id={item} type="checkbox"></input></form>)
            }
          </ul>);
    }
}
