import axios from 'axios';
import { useState, useEffect } from 'react';
import StorageHelper from '../../utils/storage';

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
        getAPI()
    }, [])

    const getAPI = async () => {
        try {
            const sh = new StorageHelper("All-Pokemon");

            if (!sh.get()) {
                const url: string = process.env.REACT_APP_GET_ALL_POKEMON || "";
                if (!url) {
                    throw new Error("NO ENV FOUND")
                }
                const { data } = await axios.get(url)
                setPokemon(data);
                sh.save(data);
                return
            }

            const pokemonArray = sh.get();
            setPokemon(pokemonArray);

        } catch (error) {
            throw new Error(`failed to fetch Pokemon data: ${error}`);
        }
    };

    return (
        <>
            {/* <button onClick={getAPI}>CLICK ME</button> */}
            {pokemon && pokemon.map((item: IPokemonData) => (
                <div key={item.id}>
                    <hr></hr>
                    <p>Entry number: {item.id}</p>
                    <p>Name: {item.name}</p>
                    <img src={item.sprites.front_default} alt={item.name} />
                </div>
            ))}
        </>
    )
}