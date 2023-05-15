// Import Modules
import './style.css';
import { PokemonData } from '../../../types/index';
import { useState } from 'react';

interface PokemonProps {
    allPokemon: PokemonData[];
    search: string;
    addExpandedPokemon: (item: PokemonData) => void;
}


export function Pokemon({ allPokemon, search, addExpandedPokemon }: PokemonProps) {
    const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

    const filteredPokemon = allPokemon.filter((element: PokemonData) => element.name.toLowerCase().includes(search));

    const toggleHover = (id: number) => {
        setHoveredItemId(id);
    }

    return (
        <>
            {filteredPokemon.map((item: PokemonData) => (
                <div className='pokemon-card' key={item.id} onClick={() => addExpandedPokemon(item)} onMouseEnter={() => toggleHover(item.id)} onMouseLeave={() => toggleHover(0)}>
                    <hr />
                    <p>Entry number: {item.id}</p>
                    <p>Name: {item.name}</p>
                    <div >
                        <img
                            src={item.id === hoveredItemId ? item.sprites.versions['generation-v']['black-white'].animated.front_default : item.sprites.front_default}
                            alt={item.name}
                        />
                    </div>
                </div>
            ))}
        </>
    )
}
