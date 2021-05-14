import React, {useState} from "react";
import {Redirect, Route, useHistory} from "react-router-dom";

function AddRole (){

    const [name, setName] =  useState()
    const history = useHistory()

    async function Post (){
        let response = await fetch('api/admin',
            {method: 'POST',headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(name)})
        if(response.ok)
        {
            history.push('/admin')
        }
        else
            alert('Error')

    }


    return(
        <div>
            <input onChange={event => {setName(event.target.value)}} type={'text'} placeholder={'Введите имя роли'}/>
            <button onClick={Post}>
                Добавить роль
            </button>
        </div>
    )
}

export default AddRole