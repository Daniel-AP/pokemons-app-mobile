import { createContext } from "react";
import { Pokemon } from "../types/pokemons";
import { Species } from "../types/species";
import { Evolution } from "../types/evolutions";

interface Context {
    pokemon:           Pokemon;
    species:           Species;
    evolution:         Evolution[];
    backgroundColor:   string;
}

export const DetailsDataContext = createContext<Context>({} as Context);