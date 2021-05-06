import React, {Component} from "react";

class Test extends Component{
    constructor(props) {
        super(props);
        this.state = {
            img: null,
            src: ''
        }
    }

    Click = async () => {
        let response = await fetch('api/test')

        if(response.ok)
        {
            let blob = await response.blob()
            let urlObject= URL.createObjectURL(blob)
            this.setState({img: urlObject})
            console.log(this.state.img)
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.Click}>Test</button>
                <img src={this.state.img}/>
            </div>
        );
    }
}

export default Test