import { IPokemonData } from "../../../types"

interface ExpandedPokemonViewProps {
    addExpandedPokemon: IPokemonData | undefined;
    removeExpandedPokemon: any;
  }
export function ExpandedPokemonView({ addExpandedPokemon, removeExpandedPokemon }: ExpandedPokemonViewProps) {
    return (
        <>
            {addExpandedPokemon ? (
                <div>
                    <p>Entry number: {addExpandedPokemon.id}</p>
                    <p>Name: {addExpandedPokemon.name}</p>
                    <p>Weight: {addExpandedPokemon.weight} lbs</p>
                    <p>Types: {addExpandedPokemon.types.map(item => {
                        return <span key={item.type.name}>{item.type.name} </span>
                    })}
                    </p>
                    <img src={addExpandedPokemon.sprites.front_default} alt={addExpandedPokemon.name} />
                    {/* TEMPORARY X BUTTON TO REMOVE EXPANDED VIEW */}
                    { <button onClick={removeExpandedPokemon}>X</button>}
                </div>
            ) : (
                <p>CLICK POKEMON TO SHOW MORE STATS HERE</p>
            )}
        </>
    )
}