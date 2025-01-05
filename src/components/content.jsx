import {useState} from 'react';

function Content({pokemonList,randomize}){
    return(
        <div className="content-container">
            <ul>
                {pokemonList.map(pokemon=>(
                    <li key={pokemon.id}>
                        <h2>{pokemon.name}</h2>
                        <img src={pokemon.image} alt={pokemon.name} onClick={randomize} data-key={pokemon.id}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export {Content};