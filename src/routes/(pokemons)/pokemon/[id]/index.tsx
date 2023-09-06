import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getPokemonInfo } from '~/helpers/get-small-pokemons';
import { usePokemonGame } from '~/hooks/use-pokemon-game';
import type { Pokemon } from '~/interfaces';


export const usePokemon = routeLoader$<Pokemon>(({ params, redirect }) => {

  const id = Number(params.id);

  if (isNaN(id)) throw redirect(301, '/');
  if (id <= 0) throw redirect(301, '/');
  if (id > 1000) throw redirect(301, '/');

  return getPokemonInfo(id);
});


export default component$(() => {
  const pokemon = usePokemon();
  const { toggleFromBack, toggleVisible, showBackImage, isVisible } = usePokemonGame();
  return (
    <>
      {/* <span class="text-5xl">Pokemon: { location.params.id }</span> */}
      <span class="capitalize text-5xl">{pokemon.value.name}</span>
      <PokemonImage
        id={pokemon.value.id}
        size={300}
        backImage={showBackImage.value}
        isVisible={isVisible.value}
      />
      <div class="mt-2">
        <button
          class="btn btn-primary mr-2"
          onClick$={toggleFromBack}
        >
          Voltear
        </button>
        <button
          class="btn btn-primary mr-2"
          onClick$={toggleVisible}
        >
          Revelear
        </button>
      </div>

      <span class="text-3xl">Types:</span>
      <div class="grid grid-cols-4 mt-5">
        {
          pokemon.value.types.map(({ type }) => (
            <div key={type.name} class="m-5 flex flex-col justify-center items-center">
              <span class="capitalize text-4xl">{type.name}</span>
            </div>
          ))
        }
      </div>
      <span class="text-3xl">Abilities:</span>
      <div class="grid grid-cols-4 mt-5">
        {
          pokemon.value.abilities.map(({ ability }) => (
            <div key={ability.name} class="m-5 flex flex-col justify-center items-center">
              <span class="capitalize text-4xl">{ability.name}</span>
            </div>
          ))
        }
      </div>


    </>
  )
});

export const head: DocumentHead = {
  title: "Single Pokemon",
};
