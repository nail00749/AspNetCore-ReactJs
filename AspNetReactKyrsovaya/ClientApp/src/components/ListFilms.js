import React, {Component} from "react";
import Film from "./Film";
import {Link} from "react-router-dom";
import {NavLink} from "reactstrap";
import test from "./Test";



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
            imgs: [],
            userId: undefined,
            isAdmin: undefined
        }


        this.LoadFilms()
        this.LoadHall()
        this.LoadSessions()
    }

    componentDidMount() {

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
        for (let film of this.state.films) {
            let response = await fetch(this.state.urlImages+'/'+film.filmId)
            if(response.ok){
                let blob = await response.blob()
                let url = URL.createObjectURL(blob)
                list.push(url)
            }
        }

        this.setState({imgs: list})
        console.log(this.state.imgs)
        this.setState({userId: test.user})
        await this.isAdmin()
    }
    isAdmin = async () =>{
        let is = false
        if(this.state.isAdmin === undefined){
            let url = 'api/Roles/' + test.user
            let response = await fetch(url)
            if (response.ok) {
                console.log('ok')
                is = true
            } else {
                console.log('bad')
            }
            this.setState({isAdmin: is})
        }

    }



    
    
    render() {
        let list = []

        this.state.films.forEach((item, index) =>{
            let test  = this.state.sessions === null ? [] : this.state.sessions.filter(s => s.filmId === item.filmId)
            let thisItem =
                (<Film Name={item.name} Duration = {item.duration}
                       Director={item.director} Poster={this.state.imgs[index]}
                       Genre={item.genre} Country ={item.country} id={item.filmId}
                       Sessions ={test}
                isAdmin = {this.state.isAdmin}/>)
            list.push(thisItem)
        })

        let btns = []
        let btnFilm = (
            <button>
                <NavLink tag={Link} to={{
                    pathname: '/UpdateFilm',
                    aboutProps: {
                        films: this.state.films
                    }
                }}>Add Film</NavLink>
            </button>)
        let btnSessions = (
            <button>
                <NavLink tag={Link} to={{
                    pathname:'/AddSession',
                    aboutProps: {
                        films: this.state.films,
                        halls: this.state.halls
                    }}} exact>Add Session</NavLink>
            </button>)


        if(this.state.isAdmin){
            btns.push(btnFilm)
            btns.push(btnSessions)
        }


        return (
            <div>
                <div style={{marginLeft: '10%'}}>
                    {btns}
                </div>
                
                <div>
                    {list}
                </div>
            </div>
        );
    }
}

export default ListFilms