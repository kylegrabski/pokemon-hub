// Import Libraries
import axios from 'axios';
import { useState, useEffect } from 'react';

// Import Modules
import StorageHelper from '../../utils/storage';
import { PokemonData } from '../../types/index';

// Import Compoenents
import { Pokemon } from './components/pokemon';
import { SearchPokemon } from './components/searchPokemon';
import { ExpandedPokemonView } from './components/expandedPokemonView';


export function Pokedex() {
    const [allPokemon, setAllPokemon] = useState<PokemonData[]>([]);
    const [expandedPokemon, setExpandedPokemon] = useState<PokemonData | undefined>();
    const [search, setSearch] = useState<string>("");

    const addExpandedPokemon = (item: PokemonData) : void => {
        if (expandedPokemon === item) {
            setExpandedPokemon(undefined);
            return;
        }
        setExpandedPokemon(item);
    }

    const removeExpandedPokemon = () => setExpandedPokemon(undefined);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.toLowerCase());

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        getPokemon()
    }, [])

    const getPokemon = async () => {
        try {
            const sh = new StorageHelper("AllPokemon");

            const cachedPokemon = sh.get();
            if (cachedPokemon) {
                setAllPokemon(cachedPokemon);
                return;
            }

            const url: string = process.env.REACT_APP_GET_ALL_POKEMON || "";
            if (!url) {
                throw new Error("NO ENV FOUND")
            }
            const { data } = await axios.get(`${url}`)
            sh.set(data);
            setAllPokemon(data);
        } catch (error) {
            throw new Error(`failed to fetch Pokemon data: ${error}`);
        }
    };
    
    
    return (
        <>
            <SearchPokemon handleSearch={handleSearch}/>
            <ExpandedPokemonView expandedPokemon={expandedPokemon} removeExpandedPokemon={removeExpandedPokemon}/>
            <Pokemon allPokemon={allPokemon} search={search} addExpandedPokemon={addExpandedPokemon} />
        </>
    )
}
