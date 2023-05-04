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

    useEffect(() => {
        getPokemon()
    }, [page])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    function handleScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
          setPage(page + 1);
        //   setTimeout(() => {console.log(`WAIT!`);}, 1000)
          console.log(page);
        }
    }
    
    // @TODO Call getPokemon when new page State gets sets
    // @TODO Check local storage for Pokemon and set state to that (WHEN CACHING IS IMPLEMENTED THIS CAN BE REMOVED)
    const getPokemon = async () => {
        try {
            console.log(`WHOA DUDE!!!`);
            const url: string = process.env.REACT_APP_GET_ALL_POKEMON || "";
            
            if (!url) {
                throw new Error("NO ENV FOUND")
            }
            const { data } = await axios.get(`${url}/${page}/51`)
            setPokemon(data);
        } catch (error) {
            throw new Error(`failed to fetch Pokemon data: ${error}`);
        }
    };

    return (
        <>
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
