import { useState, useEffect } from "react";
import { PokemonReference, PokemonsListResponse } from "../types/pokemons";

export const usePokemons = (page: number, limit=20) => {

    const [pokemons, setPokemons] = useState<PokemonReference[]>([]);
    const [loading, setLoading] = useState(true);
    const [more, setMore] = useState(true);

    const fetchPokemons = async() => {

        try {

            const url = `https://pokeapi.co/api/v2/pokemon/?offset=${(page-1)*20}&limit=${limit}`;
            const resp = await fetch(url);

            if(!resp.ok) throw Error();

            const data: PokemonsListResponse = await resp.json();

            setPokemons(prev => prev.concat(data.results));
            setMore((page)*20 < data.count);
            
        } catch (error) {

            setPokemons([]);
            
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {

        fetchPokemons();

    }, [page]);

    return {
        pokemons,
        loading,
        more
    };

};