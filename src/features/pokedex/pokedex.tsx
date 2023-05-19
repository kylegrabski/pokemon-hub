// Import Libraries
import axios from "axios";
import { useState, useEffect } from "react";

// Import Modules
import StorageHelper from "../../utils/storage";
import { PokemonData } from "../../types/index";

// Import Components
import { Pokemon } from "./components/pokemon";
import { ExpandedPokemonView } from "./components/expandedPokemonView";

// Import Store
import { useAppSelector } from "../../app/hooks";
import { selectSearch } from "../navBar/searchSlice";


export function Pokedex() {
  const searchPokemon = useAppSelector(selectSearch);

  const [allPokemon, setAllPokemon] = useState<PokemonData[]>([]);
  const [expandedPokemon, setExpandedPokemon] = useState<PokemonData | undefined>();

  const addExpandedPokemon = (item: PokemonData): void => {
    if (expandedPokemon === item) {
      setExpandedPokemon(undefined);
      return;
    }
    setExpandedPokemon(item);
  };

  const removeExpandedPokemon = () => setExpandedPokemon(undefined);

  useEffect(() => {
    getPokemon();
  }, []);

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
        throw new Error("NO ENV FOUND");
      }
      const { data } = await axios.get(`${url}`);
      sh.set(data);
      setAllPokemon(data);
    } catch (error) {
      throw new Error(`failed to fetch Pokemon data: ${error}`);
    }
  };

  return (
    <>
      <ExpandedPokemonView
        expandedPokemon={expandedPokemon}
        removeExpandedPokemon={removeExpandedPokemon}
      />
      <Pokemon
        allPokemon={allPokemon}
        search={searchPokemon}
        addExpandedPokemon={addExpandedPokemon}
      />
    </>
  );
}
