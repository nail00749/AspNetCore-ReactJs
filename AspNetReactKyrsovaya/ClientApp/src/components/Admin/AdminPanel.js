import React, {Component} from "react";
import Role from "./Role";
import {NavLink} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import Roles from "../Roles";

class AdminPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            allRoles: []
        }


    }

    componentDidMount() {
        this.LoadAllRoles()
    }

    LoadAllRoles = async () =>{
        let response = await fetch('api/Admin')
        if(response.ok){
            let json = await response.json()
            this.setState({allRoles: json})
            console.log(json)
        }
    }
    Delete = async (id) =>{
        let url = 'api/admin/'+ id
        let response  = await fetch(url, {method: 'DELETE'})
        this.LoadAllRoles()
    }


    render() {

        let roles = []
            this.state.allRoles.forEach((item) => {
                let thisItem = <Role Delete = {this.Delete} id={item.id} name = {item.name}></Role>
                roles.push(thisItem)
            })


        return (
            <div>
                <h2>Список ролей</h2>
                <div className={'columnContainer'}>
                    {roles}
                </div>
                <div className={'container'}>
                    <NavLink tag={Link} to={'/addRole'}>Добавить роль</NavLink>
                    <NavLink tag={Link} to={'/users'}>List users</NavLink>
                </div>
            </div>
        );
    }
}

export default AdminPanel