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
            urlImages: 'api/File',
            films: [],
            halls: [],
            sessions: [],
            imgs: []
        }
    }

    componentDidMount() {
        this.LoadFilms()
        this.LoadHall()
        this.LoadSessions()
        /*this.LoadImages()*/
    }
    LoadFilms = async () => {
        let response = await fetch(this.state.urlFilms)
        if(response.ok){
            let json = await response.json()
            this.setState({films: json})
            console.log('Films from back loaded ', this.state.films)
            this.LoadImages()
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
    LoadImages = async (filmId) =>{
        let list = this.state.imgs
        console.log(this.state.films)
        //цикл по айди фильмам и пуш всех картинок
        for (let film of this.state.films) {
            let response = await fetch(this.state.urlImages+'/'+film.filmId)
            if(response.ok){
                console.log('img loaded')
                let blob = await response.blob()
                let url = URL.createObjectURL(blob)
                console.log(url)
                list.push(url)

            }
        }

        this.setState({imgs: list})
        console.log(this.state.imgs)
    }

    
    
    render() {
        let list = []

        this.state.films.forEach((item, index) =>{
            let test  = this.state.sessions === null ? [] : this.state.sessions.filter(s => s.filmId === item.filmId)
            let thisItem =
                (<Film Name={item.name} Duration = {item.duration}
                       Director={item.director} Poster={this.state.imgs[index]}
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