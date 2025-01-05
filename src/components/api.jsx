import {useEffect,useState} from 'react';
import {Content} from './content';
import {Points} from './points';

function MyCards(){
    const [pokemonList,setPokemonList]=useState([]);
    const [discoveredList,setDiscoveredList]=useState([]);
    const [loading,setLoading]=useState(true);
    
    const randomize=(e)=>{
        let shuffleList=[...pokemonList];
        console.log(shuffleList);//Just for testing
        //The for loop is used for shuffling the array
        for(let i=shuffleList.length-1;i>0;i--){
            let j=Math.floor(Math.random()*(i+1));
            [shuffleList[i],shuffleList[j]]=[shuffleList[j],shuffleList[i]];
        }
        setDiscoveredList(prevItems=>[...prevItems,e.target.dataset.key]);
        console.log(discoveredList);//Just for testing the output
        setPokemonList(shuffleList);
    }

    useEffect(() => { 
        fetch('https://pokeapi.co/api/v2/pokemon?limit=5') // Adjust the limit as needed 
            .then(response => response.json()) 
            .then(data => {
                 const fetches = data.results.map(pokemon => fetch(pokemon.url) 
                 .then(res => res.json()) 
                 .then(pokeData => ({ 
                    id: pokeData.id, name: pokeData.name, image: pokeData.sprites.front_default })) );
                     return Promise.all(fetches); 
            }) 
            .then(pokemonData => { 
                setPokemonList(pokemonData); 
                setLoading(false); 
            }) 
            .catch(error => console.error('Error fetching Pokémon:', error)); 
    }, []);

    if(loading){
        return(<div>Loading.....</div>)
    }

    return (
        <div className='main-container'>
            <h2 className='header'>Memory Game</h2>
            <h4>Get points by clicking undiscovered pokemon characters to earn some points</h4>
            <Points discoveredList={discoveredList} setDiscoveredList={setDiscoveredList}></Points>
           <Content pokemonList={pokemonList} randomize={randomize}></Content>
        </div>
    );
}

export {MyCards};