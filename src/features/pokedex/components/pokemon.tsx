// Import Modules
import './style.css';
import { IPokemonData } from '../../../types/index';


export function Pokemon({allPokemon, search, handleExpandedView}: {allPokemon: IPokemonData[], search: string, handleExpandedView: any}) {

    const filteredPokemon = allPokemon.filter((element: IPokemonData) => element.name.toLowerCase().includes(search));

    return (
        <>
            {filteredPokemon.map((item: IPokemonData, index: number) => (
                <div className='pokemon-card' key={index} onClick={() => handleExpandedView(item)}>
                    <hr />
                    <p>Entry number: {item.id}</p>
                    <p>Name: {item.name}</p>
                    <img src={item.sprites.front_default} alt={item.name} />
                </div>
            ))}
        </>
    )
}