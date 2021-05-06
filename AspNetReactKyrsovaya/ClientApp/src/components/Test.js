import React, {Component} from "react";
import {Redirect, Route, withRouter} from "react-router-dom";

class Test extends Component{
    constructor(props) {
        super(props);
    }


    submitForm (e) {
        this.props.history.push('/home');
        e.preventDefault()
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default withRouter(Test)