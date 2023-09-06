import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { type PokemonGamerState, PokemonGamerContext } from "./pokemon-game.context";
import { type PokemonListState, PokemonListContext } from "./pokemon-list.context";

export const PokemonProvider = component$(() => {

    const pokemonGame = useStore<PokemonGamerState>({
        pokemonId: 1,
        isVisible: true,
        showBackImage: false
      });
    
      const pokemonList = useStore<PokemonListState>({
        currentPage: 0,
        isLoading: false,
        pokemons: []
      });
    
      useContextProvider(PokemonGamerContext, pokemonGame);
      useContextProvider(PokemonListContext, pokemonList);

      useVisibleTask$(()=>{
        //TODO: Leeer del local storage
        if(localStorage.getItem('pokemon-game')){
          const { pokemonId = 10, 
                  isVisible = true,
                  showBackImage = false,
          }  = JSON.parse (localStorage.getItem('pokemon-game')!) as PokemonGamerState;

          pokemonGame.isVisible = isVisible;
          pokemonGame.pokemonId = pokemonId;
          pokemonGame.showBackImage = showBackImage;

        }
      });

      useVisibleTask$(({ track })=>{
        track(()=> [
          pokemonGame.isVisible, pokemonGame.pokemonId, pokemonGame.showBackImage
        ]);
        localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
      });
    
  return (<Slot />)
});