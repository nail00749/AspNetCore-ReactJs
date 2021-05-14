import React, {Component} from "react";
import {NavItem, NavLink} from "reactstrap";
import { Link } from 'react-router-dom';

class Session extends Component{
    constructor(props) {
        super(props);
    }
    

    render() {
        return (
            <div>
                <NavLink tag={Link} to={{
                        pathname:'/BuyTicket/'+this.props.id,
                        /*aboutProps: {
                            id: this.props.id
                        }*/}}>
                    <button className={'Session'}>
                        <p>{this.props.date}</p>
                        <p>{this.props.price + '\u20bd'}</p>
                    </button>

                </NavLink>
            </div>
        );
    }

}

export default Session