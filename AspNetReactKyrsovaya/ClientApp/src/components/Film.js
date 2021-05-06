import React, {Component} from "react";
import custom from '../custom.css'
import Session from "./Session";

class Film extends Component{
    constructor(props) {
        super(props);
    }
    
    render() {

        let listSessions = this.props.Sessions !== null ?
            this.props.Sessions.map((item, index) => <Session date={item.date} id={item.sessionId}></Session>)
            : [];


        return (
            <div className={'container'}>
                <img src={this.props.Poster} alt={'h'}/>
                
                <div>
                    <h2>{this.props.Name}</h2>
                    <h4>{'Продолжительность:'+this.props.Duration+'мин'}</h4>
                    <h4>{'Режиссер:'+this.props.Director}</h4>
                    <h4>{'Жанр:'+this.props.Genre}</h4>
                    <h4>{'Страна:'+this.props.Country}</h4>
                    <div className={'container'}>
                        {listSessions}
                    </div>
                </div>
            </div>
        )
    }
}

export default Film