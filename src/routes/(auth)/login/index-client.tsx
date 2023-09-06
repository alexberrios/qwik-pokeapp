import { $, component$, useComputed$, useStore, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';

export default component$(() => {

    useStylesScoped$(styles);

    const formState = useStore({
      email: '',
      password: '',
      formPosted: false
    });

    const emailError = useComputed$(()=> {
      if( formState.email.includes('@') ) return '';
      return 'not-valid';
    });
    const passwordError = useComputed$(()=> {
      if( formState.password.length >= 6 ) return '';
      return 'not-valid';
    });

    const isFormValid = useComputed$(()=>{
      if(
        formState.email == 'not-valid' ||
        formState.password == 'not-valid'
      ) return false;

      return true;

    });

    const onSubmit = $(()=>{
      formState.formPosted = true;
      const {email, password } = formState;

      console.log({isFormValid});
      console.log({email, password});
      

    }); 

    return (
        <form onSubmit$={onSubmit} class="login-form" preventdefault:submit>
            <div class="relative">
                <input 
                onInput$={(env)=> formState.email = (env.target as HTMLInputElement).value}
                class={ formState.formPosted ? emailError.value : '' }
                name="email" type="text" placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input
                class={formState.formPosted ? passwordError.value : ''}
                onInput$={(env)=> formState.password = (env.target as HTMLInputElement).value}
                name="password" type="password" placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button type='submit'>Ingresar</button>
            </div>


            <code>
                { JSON.stringify( formState, undefined , 2 ) }
            </code>
        </form>
    )
});