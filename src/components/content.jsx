import {useState} from 'react';

function Content({pokemonList,randomize}){
    return(
        <div className="content-container">
            <ul>
                {pokemonList.map(pokemon=>(
                    <li key={pokemon.id} className='card'>
                        <div className="image-container">
                            <img src={pokemon.image} alt={pokemon.name} onClick={randomize} data-key={pokemon.id}/>
                        </div>
                        <h4>{pokemon.name}</h4>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export {Content};