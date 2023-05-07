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

export function Pokemon() {
    const [allPokemon, setPokemon] = useState<IPokemonData[]>([]);
    const [expandedPokemon, setExpandedPokemon] = useState<IPokemonData>();
    const [search, setSearch] = useState<string>("");

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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.toLowerCase());

    const filteredPokemon = allPokemon.filter((element: IPokemonData) => element.name.toLowerCase().includes(search));

    const expandedView = (item: IPokemonData) => setExpandedPokemon(item);

    return (
        <>
            <input type="text" placeholder="Search.." onChange={handleSearch} />
            {expandedPokemon ? (
                <div>
                    <p>Entry number: {expandedPokemon.id}</p>
                    <p>Name: {expandedPokemon.name}</p>
                    <img src={expandedPokemon.sprites.front_default} alt={expandedPokemon.name} />
                </div>
            ) : (
                <p>CLICK POKEMON TO SHOW MORE STATS HERE</p>
            )}

            {filteredPokemon.map((item: IPokemonData, index: number) => (
                <div key={index} onClick={() => expandedView(item)} style={{ cursor: 'pointer' }}>
                    <hr />
                    <p>Entry number: {item.id}</p>
                    <p>Name: {item.name}</p>
                    <img src={item.sprites.front_default} alt={item.name} />
                </div>
            ))}
        </>
    )
}