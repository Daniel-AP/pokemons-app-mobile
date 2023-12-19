import { Chain, Evolution } from "../types/evolutions";

export const getEvolutionChain = (chain: Chain | undefined) => {

    const result: Evolution[] = [];

    while(chain) {

        result.push({
            // eslint-disable-next-line camelcase
            evolution_details: chain.evolution_details,
            species: chain.species
        });

        chain = chain.evolves_to.at(0);

    }

    return result;

};