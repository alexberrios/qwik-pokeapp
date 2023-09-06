import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGamerContext } from "~/context";


export const usePokemonGame = () => {
    const pokemonGame  = useContext(PokemonGamerContext);

    const changePokemonId = $((value: number) => {
        if (pokemonGame.pokemonId + value <= 0) return;
        pokemonGame.pokemonId += value;
      });

    const toggleFromBack = $(() => {
        pokemonGame.showBackImage= !pokemonGame.showBackImage;
    });
    const toggleVisible = $(() => {
        pokemonGame.isVisible= !pokemonGame.isVisible;
    });

    return {
        pokemonId :     useComputed$(() => pokemonGame.pokemonId),
        isVisible :     useComputed$(() => pokemonGame.isVisible),
        showBackImage : useComputed$(() => pokemonGame.showBackImage),
        nextPokemon:    $(() => changePokemonId(+1)),
        previusPokemon: $(() => changePokemonId(-1)),
        toggleFromBack: toggleFromBack,
        toggleVisible:  toggleVisible
    }
}