// @refresh reload
import { Routes } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import { Suspense } from "solid-js";
import "./index.css";
import { For } from "solid-js";
import * as mainNav from "./data/main-navigation";
import { Link } from "solid-app-router";

export default function Root() {
  return (
    <>
      <ErrorBoundary>
        <Suspense>
          <main class="flex flex-row text-gray-700 h-max">
            <div class="w-52 bg-slate-200">
              <nav>
                <ul className="list-none mx-2 text-sm">
                  <For each={mainNav.default}>
                    {(item, index) => (
                      <li class="my-2">
                        <Link href={item.route}>
                          {item.label}
                        </Link>
                      </li>
                    )}
                  </For>
                </ul>
              </nav>
            </div>
            <div class="w-full">
              <Routes />
            </div>
          </main>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
