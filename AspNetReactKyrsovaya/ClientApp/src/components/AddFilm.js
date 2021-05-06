import React, {Component} from "react";
import {Link, Redirect, Route, useHistory, withRouter} from "react-router-dom";
import {NavLink} from "reactstrap";


class AddFilm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            url: 'api/Films',
            name:'',
            duration: 0,
            genre: '',
            director: '',
            poster: '',
            country: '',
            redirect: false
        }
    }


    onSubmit = async () =>{
        let film =
            {
                name: this.state.name,
                duration: this.state.duration,
                genre: this.state.genre,
                director: this.state.director,
                poster: this.state.poster,
                country: this.state.country
            }
        console.log(film)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(film)
        }

        let response = await fetch(this.state.url, requestOptions)
        //let json = await response.json()

        this.setState({send: true})
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
                        <input type={'text'} placeholder={'Name'} onChange={e => this.setState({name:e.target.value})}/>
                        <input type={'number'} placeholder={'Duration'} onChange={e => this.setState({duration:e.target.value})}/>
                        <input type={'text'} placeholder={'Genre'} onChange={e => this.setState({genre:e.target.value})}/>
                        <input type={'text'} placeholder={'Director'} onChange={e => this.setState({director:e.target.value})}/>
                        <input type={'text'} placeholder={'Country'} onChange={e => this.setState({country:e.target.value})}/>
                    </div>
                    <div>
                        <img src={this.state.poster === '' ? 'https://air-solutions.ru/images/noimage.png' : this.state.poster}/>
                    </div>
                        <input type={'file'} placeholder={'Poster'} onChange={e => this.setState({poster:e.target.value})}/>
                        <button onClick={this.onSubmit}>Send</button>
                        {/*<input type={'submit'} value={'Send'}/>*/}
                {/*</form>*/}
            </div>
        )}
    }

}

export default withRouter(AddFilm)