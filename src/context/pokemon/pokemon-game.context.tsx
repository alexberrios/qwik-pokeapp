import { createContextId } from "@builder.io/qwik";


export interface PokemonGamerState{
    pokemonId : number;
    showBackImage : boolean;
    isVisible : boolean;
}

export const PokemonGamerContext = createContextId<PokemonGamerState>('pokemon.game-context');