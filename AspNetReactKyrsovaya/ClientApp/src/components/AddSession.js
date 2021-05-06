import React, {Component} from "react";

class AddSession extends Component{
    constructor(props) {
        super(props);
        this.state = {
            urlFilm: 'api/Films',
            urlHall: 'api/Halls',
            films: [],
            halls: []
        }
    }




    render() {

        let listFilms = this.props.location.aboutProps.films.map((item, index) => <option>{item.name}</option>)
        let listHalls= this.props.location.aboutProps.halls.map((item, index) => <option>{item.name}</option>)
        console.log(this.props.location.aboutProps)

        return (
            <div>
                <div className={'container'}>
                    <h5>Фильм:</h5>
                    <select>
                        {listFilms}
                    </select>
                </div>
                <div className={'container'}>
                    <h5>Зал:</h5>
                    <select>
                        {listHalls}
                    </select>
                </div>
                <div className={'container'}>
                    <h5>Дата:</h5>
                    <input type={'datetime-local'}/>
                </div>
                <div className={'container'}>
                    <h5>Цена:</h5>
                    <input type={'number'} min={0}/>
                </div>


            </div>
        );
    }
}

export default AddSession