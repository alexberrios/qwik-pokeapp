import { component$ } from '@builder.io/qwik';
import { useCounter } from '~/hooks/use-counter';

export default component$(() => {

  const {counter, increase, decrease} = useCounter(16);
  return (
  <>
    <span class="text-3xl">Counter</span>
    <span class="text-7xl">{counter.value}</span>
    <div class="mt-2">
      <buton onClick$={decrease} class="btn btn-primary mr-2">-1</buton>
      <buton onClick$={increase} class="btn btn-primary mr-2">+1</buton>
    </div>
  </>)
});