import {useEffect,useState} from 'react';
import {Content} from './content';
import {Points} from './points';

function MyCards(){
    const [pokemonList,setPokemonList]=useState([]);
    const [discoveredList,setDiscoveredList]=useState([]);
    const [playerPoints,setPlayerPoints]=useState(0);
    const [highScore,setHighScore]=useState(0);
    const [loading,setLoading]=useState(true);

    let hasDuplicates=false;
    
    const randomize=(e)=>{
        let shuffleList=[...pokemonList];
        console.log(shuffleList);//Just for testing
        //The for loop is used for shuffling the array
        for(let i=shuffleList.length-1;i>0;i--){
            let j=Math.floor(Math.random()*(i+1));
            [shuffleList[i],shuffleList[j]]=[shuffleList[j],shuffleList[i]];
        }
        
        setPokemonList(shuffleList);
        //Checking whether an item has been selected more than once
        hasDuplicates=discoveredList.includes(e.target.dataset.key);
        (!hasDuplicates)&&setDiscoveredList(prevItems=>[...prevItems,e.target.dataset.key]);//If its not selected before add it to the discovered list

        pointsCheck();
    }
    //For adding a point if an item is not selected before, and if selected before point will be 0
    const pointsCheck=()=>{

        if(!hasDuplicates){
            setPlayerPoints(points=>points+1);
        }
        else{
            setPlayerPoints(0);
            setDiscoveredList([]);
            (playerPoints>highScore)&&setHighScore(playerPoints);//For setting the high score if the new point is greater than the previous high score
        }
    }
    

    useEffect(() => { 
        fetch('https://pokeapi.co/api/v2/pokemon?limit=20') // Adjust the limit as needed 
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
        <div>
            <h2 className='header'>Memory Game</h2>
            <h4>Get points by clicking undiscovered pokemon characters to earn some points</h4>
            <Points playerPoints={playerPoints} highScore={highScore}></Points>
           <Content pokemonList={pokemonList} randomize={randomize}></Content>
        </div>
    );
}

export {MyCards};