import Counter from "~/components/Counter";
import { Link } from "solid-app-router";
export default function About() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
       Flows Page
      </h1>
      <Counter />
      <p class="mt-8">
        Visit{" "}
        <Link
          href="https://solidjs.com"
          target="_blank"
          class="text-sky-600 hover:underline"
        >
          solidjs.com
        </Link>{" "}
        to learn how to build Solid apps.
      </p>
    </main>
  );
}
