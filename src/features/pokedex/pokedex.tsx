// Import Libraries
import axios from 'axios';
import { useState, useEffect } from 'react';

// Import Modules
import { Pokemon } from './components/pokemon';
import { IPokemonData } from '../../types/index';
import { SearchPokemon } from './components/searchPokemon';


export function Pokedex() {
    const [allPokemon, setAllPokemon] = useState<IPokemonData[]>([]);
    const [search, setSearch] = useState<string>("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.toLowerCase());

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
            setAllPokemon(data);
        } catch (error) {
            throw new Error(`failed to fetch Pokemon data: ${error}`);
        }
    };

    return (
        <>
            <SearchPokemon handleSearch={handleSearch}/>
            <Pokemon allPokemon={allPokemon} search={search} />
        </>
    )
}
