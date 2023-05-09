// Import Modules
import './style.css';
import { PokemonData } from '../../../types/index';

interface PokemonProps {
    allPokemon: PokemonData[];
    search: string;
    addExpandedPokemon: () => void;
}

export function Pokemon({allPokemon, search, addExpandedPokemon}: PokemonProps) {

    const filteredPokemon = allPokemon.filter((element: PokemonData) => element.name.toLowerCase().includes(search));

    return (
        <>
            {filteredPokemon.map((item: PokemonData) => (
                <div className='pokemon-card' key={item.id} onClick={() => addExpandedPokemon(item)}>
                    <hr />
                    <p>Entry number: {item.id}</p>
                    <p>Name: {item.name}</p>
                    <img src={item.sprites.front_default} alt={item.name} />
                </div>
            ))}
        </>
    )
}
