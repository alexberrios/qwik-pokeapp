import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../../icons/qwik";
import styles from "./navbar.module.css";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <header class={styles.navbar}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/">
            <QwikLogo height={50} />
          </Link>
        </div>
        <ul>
          <li>
            <Link href='/login'>
              Inicio de sesion
            </Link>
          </li>
          <li>
            <Link href='/dashboard/'>
              Admin Dashboard
            </Link>
          </li>
          <li>
            <Link href='/pokemons/list-ssr/'>
              SSR - List
            </Link>
          </li>
          <li>
            <Link href='/pokemons/list-client/'>
              Client - List
            </Link>
          </li>
          <li>
            <Link href='/counter'>
              CounterHook
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
});
