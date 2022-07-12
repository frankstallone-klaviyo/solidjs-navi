import { Link } from "solid-app-router";
import { For } from "solid-js";
import * as mainNav from "../data/main-navigation.json";

export default function Home() {
  return (
    <main class="flex flex-row text-gray-700 h-screen">
      <div class="w-52 bg-slate-200">
        <nav>
          <ul className="list-none">
            <For each={mainNav.default}>
              {(item, index) => (
                <li>
                  <Link href="/">
                    {item.label}
                  </Link>
                </li>
              )}
            </For>
          </ul>
        </nav>
      </div>
      <div class="w-full">
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
        <p class="my-4">
          <span>Home</span>
          {" - "}
          <Link href="/about" class="text-sky-600 hover:underline">
            About Page
          </Link>{" "}
        </p>
      </div>
    </main>
  );
}
