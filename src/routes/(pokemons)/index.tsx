import { $, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";

import { PokemonImage } from "../../components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export default component$(() => {
  const nav = useNavigate();

  const {
    pokemonId,
    isVisible,
    showBackImage,
    nextPokemon,
    previusPokemon,
    toggleFromBack,
    toggleVisible
  } = usePokemonGame();

  // const pokemonId = useSignal(1); // primitivos, booleans, string,
  // const showBackImage = useSignal(false);
  // const isVisible = useSignal(true);
  


  const goToPokemon = $((id: number) => {
    nav(`/pokemon/${ id }/`);
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>

      <span class="text-9xl">{ pokemonId.value }</span>

        <div onClick$={()=> goToPokemon(pokemonId.value)}>
          <PokemonImage
            size={300}
            id={pokemonId.value} 
            backImage={ showBackImage.value } 
            isVisible={ isVisible.value } />
        </div>


      <div class="mt-2">
        <button
          onClick$={previusPokemon}
          class="btn btn-primary mr-2"
        >
          Anterior
        </button>
        <button
          onClick$={nextPokemon} 
          class="btn btn-primary mr-2">
          Siguiente
        </button>
        <button onClick$={ toggleFromBack } class="btn btn-primary">
          Voltear
        </button>
        <button onClick$={ toggleVisible } class="btn btn-primary ml-2">
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Esta es mi primera aplicación con Qwik",
    },
  ],
};
