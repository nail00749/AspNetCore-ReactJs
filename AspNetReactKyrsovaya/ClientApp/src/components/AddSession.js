import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";

class AddSession extends Component{
    constructor(props) {
        super(props);
        this.state = {
            urlFilm: 'api/Films',
            urlHall: 'api/Halls',
            films: [],
            halls: [],
            redirect: false,
            filmId: 0,
            hallId: 0,
            date: '',
            price: 0
        }
    }

    onChange = (e) =>{
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value})

        console.log(e.target.value)
    }


    onSubmit = async () =>{

        let session = {
            filmId: this.state.filmId,
            hallId: this.state.hallId,
            date: this.state.date,
            price: this.state.price
        }


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(session)
        }

        let response = await fetch('api/Sessions', requestOptions)

        this.setState({redirect: true})
    }


    render() {
        let listFilms = this.props.location.aboutProps.films.map((item, index) => <option key={item.filmId} value={item.filmId}>{item.name}</option>)
        let listHalls= this.props.location.aboutProps.halls.map((item, index) => <option key={item.hallId} value={item.hallId}>{item.name}</option>)
        if(this.state.redirect){
            return (
                <Route>
                    <Redirect to={'/'}/>
                </Route>
            )
        }

        return (
            <div>
                <div className={'container'}>
                    <h5>Фильм:</h5>
                    <select name={'filmId'} onChange={event => this.onChange(event)}>
                        {listFilms}
                    </select>
                </div>
                <div className={'container'}>
                    <h5>Зал:</h5>
                    <select name={'hallId'} onChange={event => this.onChange(event)}>
                        {listHalls}
                    </select>
                </div>
                <div className={'container'}>
                    <h5>Дата:</h5>
                    <input name={'date'}  onChange={event => this.onChange(event)} type={'datetime-local'}/>
                </div>
                <div className={'container'}>
                    <h5>Цена:</h5>
                    <input name={'price'}  onChange={event => this.onChange(event)} type={'number'} min={0}/>
                </div>
                <button onClick={this.onSubmit}>Создать</button>

            </div>
        );
    }
}

export default AddSession