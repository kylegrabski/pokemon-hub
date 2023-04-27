import React, { useState, useEffect } from 'react';

interface PokemonData {
    pokemon_entries: any[];
}

export function Pokedex() {
    const [pokemon, setPokemon] = useState<PokemonData[]>([]);

    useEffect(() => {
        console.log(pokemon);
        console.log(typeof pokemon);
    }, [pokemon])

    const fetchPokemon = async () => {
        console.log(`HERE WE GO!`);
        const url = "https://pokeapi.co/api/v2/pokedex/kanto/"

        const response = await fetch(url);
        const jsonData  = await response.json();

        const pokemonArray: PokemonData[] = [jsonData] 

        setPokemon(pokemonArray)
        
    }

    return (
        <>
            <p>HELLO</p>
            <button onClick={fetchPokemon}>CLICK ME</button>
            {/* {pokemon && pokemon.map((item, i) => {
               return <p key={i}>
                    {item.pokemon_entries}
                </p>
            })} */}
        </>
    )
}