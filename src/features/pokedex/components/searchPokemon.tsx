interface SearchPokemonProps {
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

export function SearchPokemon({ handleSearch }: SearchPokemonProps) {

    return (
        <>
           <input type="text" placeholder="Search.." onChange={handleSearch} />
        </>
    )
}