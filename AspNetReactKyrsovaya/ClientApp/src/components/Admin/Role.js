import React from "react";


function Role(props){
    return(
        <div className={'container'} id = {props.id}>
            <table>
                <td style={{minWidth: 200}}>{props.name}</td>
                <td>
                    <button onClick={event => props.Delete(props.id)}>Delete</button>
                </td>

            </table>
        </div>
    )
}

export default Role