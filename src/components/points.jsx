import {useState} from 'react';

function Points({playerPoints,highScore}){
    
    return(
        <div className="points">
            Score: {playerPoints}<br/>
            High Score: {highScore}
        </div>
    )
}

export {Points};