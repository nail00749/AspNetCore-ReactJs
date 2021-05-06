import React, {Component} from "react";
import custom from '../custom.css'
import Session from "./Session";
import {NavLink} from "reactstrap";
import {Link, Redirect, Route} from "react-router-dom";

class Film extends Component{
    constructor(props) {
        super(props);
        this.state= {
            redirect: false
        }
    }

    Delete = async () =>{
        let url = 'api/Films/'+this.props.id
        console.log(url)
        let response = await fetch(url,{method: 'DELETE'})
        this.setState({redirect : true})
    }

    
    render() {
        let listSessions = this.props.Sessions !== null ?
            this.props.Sessions.map((item, index) => <Session date={item.date} id={item.sessionId}></Session>) : [];
        if(this.state.redirect){
            return (
                <Route>
                    <Redirect to='/'/>
                </Route>
            )
        }


        return (
            <div className={'container'}>
                <img src={this.props.Poster} alt={'h'}/>
                
                <div>
                    <h2>{this.props.Name}</h2>
                    <h4>{'Продолжительность:'+this.props.Duration+'мин'}</h4>
                    <h4>{'Режиссер:'+this.props.Director}</h4>
                    <h4>{'Жанр:'+this.props.Genre}</h4>
                    <h4>{'Страна:'+this.props.Country}</h4>

                    <NavLink tag={Link}
                             to={{
                                 pathname:'/UpdateFilm/'+this.props.id,
                             }}>
                        <button>Edit film</button>
                    </NavLink>
                    <button onClick={this.Delete}>DeleteFilm</button>
                    <div className={'container'}>
                        {listSessions}
                    </div>
                </div>
            </div>
        )
    }
}

export default Film