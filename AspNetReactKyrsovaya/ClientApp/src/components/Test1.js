import React, {Component} from "react";
import axios from "axios";

class Test1 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            img: undefined
        }
    }

    upload = async () => {
        let formData = new FormData()
        let file = this.state.img
        let film = {
            name: 'qwe',
            duration: 0,
            genre: 'qwe',
            director: 'qwe',
            country: 'qwe',
            poster: 'qwe'
        }

        await formData.append('file', file)
        await formData.append('jsonString', JSON.stringify(film))

        let option = {
            method: "POST",
            body: formData
        }
        console.log('send')
        let response = await fetch('api/test', option)
        console.log(response.ok)
        console.log(JSON.stringify(response))
    }

    onChange = (e) =>{
        console.log(e.target.files[0])
        this.setState({img: e.target.files[0]})
    }

    render() {
        return (
            <div>
                <input onChange={event => this.onChange(event)} type={'file'}/>
                <button onClick={this.upload}>send</button>
            </div>
        );
    }
}

export default Test1