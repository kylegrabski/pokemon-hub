import { useState, useEffect } from 'react';

interface IPokemonData {
    name: string
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
            const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
            const response = await fetch(url);
            const responseData = await response.json();
            console.log(responseData);
            const pokemonArray: IPokemonData[] = [];

            for (const pokemon of responseData.results) {
                const res = await fetch(pokemon.url);
                const item = await res.json();
                pokemonArray.push(item);
            }

            setPokemon(pokemonArray);
        } catch (error) {
            throw new Error(`Failed to fetch Pokemon data: ${error}`);
        }
    };

    return (
        <>
            <button onClick={fetchPokemon}>CLICK ME</button>
            {pokemon && pokemon.map((item: IPokemonData) => (
                <div key={item.order}>
                    <p>Entry number: {item.order}</p>
                    <img src={item.sprites.front_default} alt="" />
                </div>
            ))}
        </>
    )
}