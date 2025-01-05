import {useState} from 'react';

function Points({discoveredList,setDiscoveredList}){
    const[playerPoints,setPlayerPoints]=useState(0);

    const hasDuplicates=()=>{
        const uniqueElements=new Set(discoveredList);

        return uniqueElements.size!==discoveredList.length;
    }

    if(discoveredList.length>1){
        if(!hasDuplicates){
            setPlayerPoints(points=>points+1);
            console.log("Yes am adding");
        }
        else{
            setPlayerPoints(0);
            setDiscoveredList([]);
        }
    }
    
    return(
        <div className="points">
            score: {playerPoints}
        </div>
    )
}

export {Points};