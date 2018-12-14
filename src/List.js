import React from 'react';

export const List = props => (
  <ul>
    {
      props.items.map((item, index) => <li key={index}><label>{item.curr}</label><input type="checkbox"></input></li>)
    }
  </ul>
);

export default List;
