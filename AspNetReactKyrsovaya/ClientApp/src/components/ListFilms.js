import React, {Component} from "react";
import Film from "./Film";
import {Link} from "react-router-dom";
import {NavLink} from "reactstrap";


const styles = {
    container: {
        dispalay: 'flex',
        backgroundColor: 'red'
    }
}

class ListFilms extends Component{
    constructor(props) {
        super(props);
        this.state = {
            urlFilms: 'api/Films',
            urlHalls: 'api/Halls',
            urlSessions: 'api/Sessions',
            films: [],
            halls: [],
            sessions: [],

        }
    }

    componentDidMount() {
        this.LoadFilms()
        this.LoadHall()
        this.LoadSessions()



    }
    LoadFilms = async () => {
        let response = await fetch(this.state.urlFilms)
        if(response.ok){
            let json = await response.json()
            this.setState({films: json})
            console.log('Films from back loaded ', this.state.films)
        }
    }
    LoadHall = async () =>{
        let response = await fetch(this.state.urlHalls)
        if(response.ok){
            let json = await response.json()
            this.setState({halls: json})
        }
    }
    LoadSessions = async () =>{
        let response = await fetch(this.state.urlSessions)
        if(response.ok){
            let json = await response.json()
            this.setState({sessions: json})
        }
    }
    
    
    render() {
        let list = []

        this.state.films.forEach((item, index) =>{
            console.log(this.state.sessions)
            let test  = this.state.sessions === null ? [] : this.state.sessions.filter(s => s.filmId === item.filmId)
            let thisItem =
                (<Film Name={item.name} Duration = {item.duration}
                       Director={item.director} Poster={item.poster}
                       Genre={item.genre} Country ={item.country} id={item.filmId}
                       Sessions ={test}/>)
            list.push(thisItem)
        })

        

        return (
            <div>
                <button>
                    <NavLink tag={Link} to={{
                        pathname:'/AddFilm',
                        aboutProps: {
                            films: this.state.films
                        }}}>Add Film</NavLink>
                </button>
                <button>
                    <NavLink tag={Link} to={{
                        pathname:'/AddSession',
                        aboutProps: {
                            films: this.state.films,
                            halls: this.state.halls
                        }}} exact>Add Session</NavLink>
                </button>
                <div>
                    {list}
                </div>
            </div>
        );
    }
}

export default ListFilms