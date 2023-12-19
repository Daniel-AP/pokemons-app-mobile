/* eslint-disable camelcase */
import { useState, useEffect } from "react";
import { Pokemon, PokemonDetailsResponse } from "../types/pokemons";
import { Species } from "../types/species";
import { Evolution, EvolutionResponse } from "../types/evolutions";
import { getEvolutionChain } from "../helpers/getEvolutionChain";

export const usePokemonDetails = (url: string) => {

    const [pokemon, setPokemon] = useState<Pokemon>();
    const [species, setSpecies] = useState<Species>();
    const [evolution, setEvolution] = useState<Evolution[]>();
    const [loading, setLoading] = useState(true);

    const fetchPokemonData = async(): Promise<Pokemon> => {

        try {

            const resp = await fetch(url);

            if(!resp.ok) throw Error();

            const data = await resp.json() as PokemonDetailsResponse;

            return {
                abilities:                data.abilities,
                base_experience:          data.base_experience,
                forms:                    data.forms,
                game_indices:             data.game_indices,
                height:                   data.height,
                held_items:               data.held_items,
                id:                       data.id,
                is_default:               data.is_default,
                location_area_encounters: data.location_area_encounters,
                name:                     data.name,
                order:                    data.order,
                past_abilities:           data.past_abilities,
                past_types:               data.past_types,
                species:                  data.species,
                sprites:                  data.sprites,
                stats:                    data.stats,
                types:                    data.types,
                weight:                   data.weight
            };
            
        } catch (error) {

            return {} as Pokemon;

        }

    };

    const fetchSpeciesData = async(url: string): Promise<Species> => {

        try {

            const resp = await fetch(url);

            if(!resp.ok) throw Error();

            const data = await resp.json() as Species;

            return data;
            
        } catch (error) {

            return {} as Species;
            
        }

    };

    const fetchEvolutionData = async(url: string): Promise<Evolution[]> => {

        try {

            const resp = await fetch(url);

            if(!resp.ok) throw Error();

            const rawData = await resp.json() as EvolutionResponse;
            const processedData = getEvolutionChain(rawData.chain);

            return processedData;

            
        } catch (error) {

            return [] as Evolution[];
            
        }

    };

    useEffect(() => {

        const fetchDetails = async() => {

            const pokemonData = await fetchPokemonData();
            const speciesData = await fetchSpeciesData(pokemonData.species.url);
            const evolutionData = await fetchEvolutionData(speciesData.evolution_chain.url);

            setPokemon(pokemonData);
            setSpecies(speciesData);
            setEvolution(evolutionData);
            setLoading(false);

        };

        fetchDetails();

    }, []);

    return {
        pokemon,
        species,
        evolution,
        loading
    };

};