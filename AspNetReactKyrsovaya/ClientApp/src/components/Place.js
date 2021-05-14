import React, {Component} from "react";

class Place extends Component{
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }
    

    onClick = (e) =>{
        this.setState({active: !this.state.active})
        this.props.onClick(e, this.state.active)
    }

    render() {
        return (
            <div style={this.props.styles}>
                <button disabled={this.props.isBusy} style={{
                    borderRadius: 10,
                    backgroundColor: this.props.isBusy ? '#fd2323' : this.state.active ? '#ff8b00' : '#00f615'
                }}
                    onClick={
                        this.onClick
                    }
                    value={this.props.row + '-' + this.props.seat}
                >{this.props.row + '-' + this.props.seat}</button>
            </div>
        );
    }

}

export default Place;
