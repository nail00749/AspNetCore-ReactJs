import React, {useEffect, useState} from "react";

function ListUsers(){

    const [users, setUsers] = useState([])

    useEffect(() =>{
        console.log('start')
        LoadUsers()

    },[])

    
    const list = []
    
    async function LoadUsers (){
        let response = await fetch('api/users')
        if(response.ok){
            let json = await response.json()
            let normalize = json.map((item) => <p>{item.email}</p>)
            console.log(json)
            setUsers(normalize)
        }
    }

    
    
    return(
        <div>
            <h2>Users</h2>
            <div className={'columnContainer'}>
                {users}
            </div>
        </div>
    )
}

export default ListUsers