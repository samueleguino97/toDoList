import React from 'react';

export class List extends React.Component{
    constructor(props){
        super(props);
        
        this.handleClicK=this.handleClicK.bind(this);
    }
    handleClicK(event){
        this.props.onClick();
    }
    render(){
        return (<ul>
            {
              this.props.items.map((item, index) => <form key={index}><label for={item.curr}>{item.curr}</label>
              <input id={item.curr} onClick={this.handleClicK} type="checkbox"></input></form>)
            }
          </ul>);
    }
}
