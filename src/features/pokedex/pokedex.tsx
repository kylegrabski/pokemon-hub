import axios from 'axios';
import { useState, useEffect } from 'react';

interface IPokemonData {
    name: string
    id: number
    order: number
    sprites: any
    stats: object[]
    types: object[]
}

export function Pokedex() {
    const [pokemon, setPokemon] = useState<IPokemonData[]>([]);

    useEffect(() => {
        fetchPokemon()
    }, [])

    const fetchPokemon = async () => {
        try {
            // Initial fetch to get the first 151 Pokemon
            const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
            console.log(data);

            const pokemonArray: IPokemonData[] = [];

            // Loop through the first 151 Pokemon and get the unique data for each.
            // Then push it into an array.
            for (const pokemon of data.results) {
                const res = await fetch(pokemon.url);
                const item = await res.json();
                pokemonArray.push(item);
            }
            console.log(pokemonArray);
            setPokemon(pokemonArray);
        } catch (error) {
            throw new Error(`Failed to fetch Pokemon data: ${error}`);
        }
    };

    return (
        <>
            {/* <button onClick={fetchPokemon}>CLICK ME</button> */}
            {pokemon && pokemon.map((item: IPokemonData) => (
                <div key={item.id}>
                    <p>Entry number: {item.id}</p>
                    <img src={item.sprites.front_default} alt={item.name} />
                </div>
            ))}
        </>
    )
}