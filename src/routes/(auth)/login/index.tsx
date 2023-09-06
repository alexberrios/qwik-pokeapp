import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';

import styles from './login.css?inline';

export const useLoginUserAction = routeAction$((data, {cookie, redirect}) => {
  const { email, password } = data;
  if (email == 'admin@google.com' && password == '123456') {
    cookie.set('jwt', 'esto_es_mi_jwt', {secure: true, path: '/'});
    redirect(301, '/');
    return {
      success: true,
      jwt: 'esto_es_mi_jwt'
    }
  }
  return{
    success: false
  }
},zod$({
  email: z.string().email('Formato no valido'),
  password: z.string().min(6, 'Minimo de 6 caracteres')
})
);

export default component$(() => {

  const action = useLoginUserAction();

  useStylesScoped$(styles);
  return (
    <Form action={action} class="login-form mt-5">
      <div class="relative">
        <input
          name="email" type="text" placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          name="password" type="password" placeholder="Password" />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type='submit'>Ingresar</button>
      </div>

      <p>
        {
          action.value?.success && (
            <code>
              Autenticado: Token: {action.value.jwt}
            </code>
          )
        }
      </p>

      <code>
        {JSON.stringify(action.value, undefined, 2)}
      </code>
    </Form>
  )
});