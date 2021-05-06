import React, {Component} from "react";
import {Link, Redirect, Route, useHistory, withRouter} from "react-router-dom";

class UpdateFilm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            url: 'api/Films',
            film: {
                name: '',
                duration: 0,
                genre: '',
                director: '',
                poster: '',
                country: '',
            },
            redirect: false,
        }


    }



    componentDidMount() {
        if(this.props.match.params.id !== undefined)
        {
            this.LoadFilm()
        }
    }

    LoadFilm = async () =>{
        let response = await fetch('api/Films/' + this.props.match.params.id)
        if(response.ok){
            let json = await response.json()
            this.setState({film: json})
        }
    }

    //TOdo fix img upload to server
    onChange = (e) =>{
        //this.setState({img: e.target.files[0]})

        let newObject = this.state.film
        newObject[e.target.name] = e.target.value
        this.setState({film: newObject})
    }

    onSubmit = async () =>{

        let film = this.state.film

        if(this.props.match.params.id !== undefined){
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(film)
            }

            let response = await fetch(this.state.url+'/'+ this.props.match.params.id, requestOptions)

        }else{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(film)
            }

            let response = await fetch(this.state.url, requestOptions)
        }
        this.setState({redirect: true})
    }

    render() {
        if(this.state.redirect){
            return (
                <Route>
                    <Redirect
                        to={{
                            pathname: "/home",
                        }}
                    />
                </Route>
            )
        }
        else{
        return (
                <div>
                    {/*<form  onSubmit={this.onSubmit}>*/}
                        <div className={'containerAddFilm'}>
                            <input value={this.state.film.name} type={'text'} placeholder={'Name'} onChange={event => this.onChange(event)} name={'name'}/>
                            <input value={this.state.film.duration} type={'number'} placeholder={'Duration'} onChange={event => this.onChange(event)} name={'duration'}/>
                            <input value={this.state.film.genre} type={'text'} placeholder={'Genre'} onChange={event => this.onChange(event)} name={'genre'}/>
                            <input value={this.state.film.director} type={'text'} placeholder={'Director'} onChange={event => this.onChange(event)} name={'director'}/>
                            <input value={this.state.film.country} type={'text'} placeholder={'Country'} onChange={event => this.onChange(event)} name={'country'}/>
                        </div>
                        <div>
                            <img src={this.state.poster === '' ? 'https://air-solutions.ru/images/noimage.png' : this.state.poster}/>
                        </div>
                            <input type={'file'} placeholder={'Poster'} onChange={this.onChange}/>
                            <button onClick={this.onSubmit}>Send</button>
                            {/*<input type={'submit'} value={'Send'}/>*/}
                    {/*</form>*/}
                </div>
            )}
    }

}

export default withRouter(UpdateFilm)