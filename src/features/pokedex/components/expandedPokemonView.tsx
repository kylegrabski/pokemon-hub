import { PokemonData } from "../../../types"

interface ExpandedPokemonViewProps {
    expandedPokemon: PokemonData | undefined;
    removeExpandedPokemon: () => void;
  }
export function ExpandedPokemonView({ expandedPokemon, removeExpandedPokemon }: ExpandedPokemonViewProps) {
    return (
        <>
            {expandedPokemon ? (
                <div>
                    <p>Entry number: {expandedPokemon.id}</p>
                    <p>Name: {expandedPokemon.name}</p>
                    <p>Weight: {expandedPokemon.weight} lbs</p>
                    <p>Types: {expandedPokemon.types.map(item => {
                        return <span key={item.type.name}>{item.type.name} </span>
                    })}
                    </p>
                    <img src={expandedPokemon.sprites.front_default} alt={expandedPokemon.name} />
                    {/* TEMPORARY X BUTTON TO REMOVE EXPANDED VIEW */}
                    { <button onClick={removeExpandedPokemon}>X</button>}
                </div>
            ) : (
                <p>CLICK POKEMON TO SHOW MORE STATS HERE</p>
            )}
        </>
    )
}
