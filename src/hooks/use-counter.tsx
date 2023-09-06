import { $, useComputed$, useSignal } from "@builder.io/qwik";


export const useCounter = ( initialValue : number ) => {
    const counter = useSignal(initialValue);

    const increaseValue = $(() => {
        counter.value++;
    })

    const decreaseValue = $(() => {
        counter.value--;
    })

    return {
        counter : useComputed$(()=> counter.value),
        increase : increaseValue,
        decrease : decreaseValue

    };
}