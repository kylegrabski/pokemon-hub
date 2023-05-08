// Import Libraries
import { useState } from 'react';

// Import Modules
import './style.css';
import { IPokemonData } from '../../../types/index';


export function Pokemon({allPokemon, search}: {allPokemon: IPokemonData[], search: string}) {
    const [expandedPokemon, setExpandedPokemon] = useState<IPokemonData>();

    const filteredPokemon = allPokemon.filter((element: IPokemonData) => element.name.toLowerCase().includes(search));

    const expandedView = (item: IPokemonData) => {
        if (expandedPokemon === item) {
            setExpandedPokemon(undefined);
            return;
        }
        setExpandedPokemon(item);
    }

    return (
        <>
            {expandedPokemon ? (
                <div>
                    <p>Entry number: {expandedPokemon.id}</p>
                    <p>Name: {expandedPokemon.name}</p>
                    <p>Weight: {expandedPokemon.weight} lbs</p>
                    <p>Types: {expandedPokemon.types.map(item => {
                        return <span key={item.type.name}>{item.type.name} </span>
                    })}
                    </p>
                    <img src={expandedPokemon.sprites.front_default} alt={expandedPokemon.name} />
                    {/* TEMPORARY "X" OUT BUTTON */}
                    <button onClick={() => setExpandedPokemon(undefined)}>X</button>
                </div>
            ) : (
                <p>CLICK POKEMON TO SHOW MORE STATS HERE</p>
            )}

            {filteredPokemon.map((item: IPokemonData, index: number) => (
                <div className='pokemon-card' key={index} onClick={() => expandedView(item)}>
                    <hr />
                    <p>Entry number: {item.id}</p>
                    <p>Name: {item.name}</p>
                    <img src={item.sprites.front_default} alt={item.name} />
                </div>
            ))}
        </>
    )
}