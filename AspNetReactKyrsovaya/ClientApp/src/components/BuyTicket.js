import React, {Component} from "react";
import Place from "./Place";
import {Redirect, Route} from "react-router-dom";



class BuyTicket extends Component{
    constructor(props) {
        super(props);
        this.state = {
            url: 'api/Sessions',
            urlFilm: 'api/Films',
            urlHall: 'api/Halls',
            urlTickets: 'api/Tickets',
            session: {},
            film: {},
            hall: {},
            thickets: [],
            listPlaces: [],
            redirect: false
        }
    }

    componentDidMount() {
        this.LoadSession()
    }

    LoadSession = async () =>{
        let response = await fetch(this.state.url+'/'+this.props.match.params.id)
        if(response.ok){
            let json = await response.json()
            this.setState({session: json})
            console.log('Session from back loaded ', this.state.session)
        }
        await this.LoadTickets()
        await this.LoadFilm()
        await this.LoadHall()

    }
    LoadFilm = async () =>{
        let response = await fetch(this.state.urlFilm + '/' + this.state.session.filmId)
        
        if(response.ok){
            let json = await response.json()
            this.setState({film: json})
            console.log('Film from back loaded ', this.state.film)
        }
    }
    LoadHall = async () =>{
        let response = await fetch(this.state.urlHall + '/' + this.state.session.hallId)
        
        if(response.ok){
            let json = await response.json()
            this.setState({hall: json})
            console.log('Hall from back loaded ', this.state.hall)
            this.Places()
        }
    }
    LoadTickets = async () =>{
        let response = await fetch(this.state.urlTickets+'/'+this.state.session.sessionId)
        if(response.ok){
            let json = await response.json()
            this.setState({tickets: json})
            console.log('tickets from back loaded ', this.state.tickets)
        }
    }

    Places = () =>{
        const hall = this.state.hall
        console.log(100/this.state.hall.countRows)
        const styles = {
            hallChild:{
                flex: (100 / this.state.hall.countSeat)+'%',
                margin: '5px 0px',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex'
            }
        }
        const list = []
        for (let i = 1; i < hall.countRows+1; i++) {

            for (let j = 1; j < hall.countSeat+1; j++) {
                let isBusy = false
                if(i < 10 && i >= 0)
                    i = i.toString().padStart(2,0)
                if(j < 10 && j >= 0)
                    j = j.toString().padStart(2,0)

                for (let ticket of this.state.tickets) {
                    if(ticket.row == i && ticket.seat == j)
                    {
                        isBusy = true
                        break
                    }
                }
                const thisPlace = (
                    <Place onClick={this.click} row={i} seat={j} styles={styles.hallChild} isBusy = {isBusy}/>
                )
                list.push(thisPlace)
            }
        }
        this.setState({listPlaces: list})
    }

    click = (e, active) => {
        let text = e.target.value
        if(!active){
            if(str.length > 1){
                str += ' '
            }
            str += text
        }
        else {
            str = str.replace(text, ' ')
            str = str.replace('  ', '')
        }
        str.trim()
    }

    onSubmit = async () =>{

        let tickets = []
        let ticketsSplit = await str.split(' ');

        for (const ticket of ticketsSplit) {
            let split = ticket.split('-')
            let seat = {
                row: split[0],
                seat: split[1],
                sessionId: this.state.session.sessionId
            }
            tickets.push(seat)
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(tickets)
        }

        let response = await fetch(this.state.urlTickets, requestOptions)
        if(response.ok){
            this.setState({redirect: true})
        }

    }
    
    
    render() {
        const styles = {
            hall: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }
        if(this.state.redirect){
            return(
            <Route>
                <Redirect to='/'/>
            </Route>
            )
        }else {

            return (
                <div className={'Buy'}>
                    <div className={'container'}>
                        <img src={this.state.film.poster}/>
                        <div>
                            <h1>{this.state.film.name}</h1>
                            <h4>{'Дата:' + this.state.session.date}</h4>
                            <h4>{'Зал:' + this.state.hall.name}</h4>
                            <h4>{'Стоимость:' + this.state.session.price}</h4>
                            <h4>{'Режисер:' + this.state.film.director}</h4>
                            <div>

                                <input type={'button'} onClick={this.onSubmit} value={'Купить'}/>

                            </div>
                        </div>

                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        border: '1px solid black',
                    }}>
                        <h1>Зал</h1>
                        <div style={{
                            backgroundColor: 'white',
                            width: '90%',
                            textAlign: 'center',
                            borderTopLeftRadius: '22px',
                            borderTopRightRadius: '22px'
                        }}>Экран</div>
                        <div style={styles.hall}>
                            {this.state.listPlaces}
                        </div>
                    </div>
                </div>
            );
        }
    }
}
let str = ''



export default BuyTicket