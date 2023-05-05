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
    const [page, setPage] = useState<number>(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        getPokemon()
    }, [])

    const getPokemon = async () => {
        try {
            const url: string = process.env.REACT_APP_GET_ALL_POKEMON || "";
            
            if (!url) {
                throw new Error("NO ENV FOUND")
            }
            const { data } = await axios.get(`${url}`)
            setPokemon(data);
        } catch (error) {
            throw new Error(`failed to fetch Pokemon data: ${error}`);
        }
    };

    return (
        <>
            {pokemon && pokemon.map((item: IPokemonData, index: number) => (
                <div key={index}>
                    <hr></hr>
                    <p>Entry number: {item.id}</p>
                    <p>Name: {item.name}</p>
                    <img src={item.sprites.front_default} alt={item.name} />
                </div>
            ))}
        </>
    )
}
