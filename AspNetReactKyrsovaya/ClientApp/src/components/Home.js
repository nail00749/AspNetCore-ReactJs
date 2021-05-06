import React, { Component } from 'react';
import Film from "./Film";
import ListFilms from "./ListFilms";
import BuyTicket from "./BuyTicket";

export class Home extends Component {
  constructor(props) {
      super(props);
      
  }
  
  
  render () {
    return (
    <div>
        <div>
            <ListFilms/>
        </div>
    </div>
    );
  }
}


