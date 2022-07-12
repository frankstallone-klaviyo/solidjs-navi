// @refresh reload
import { Routes } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import { Suspense } from "solid-js";
import "./index.css";
import { For, Switch, Match } from "solid-js";
import * as mainNav from "./data/main-navigation";
import { NavLink } from "solid-app-router";

export default function Root() {
  return (
    <>
      <ErrorBoundary>
        <Suspense>
          <main class="flex flex-row flex-0 text-gray-700 h-screen">
            <div class="w-52 bg-slate-200">
              <nav>
                <ul className="list-none mx-4 text-sm h-full">
                  <For each={mainNav.default} fallback={<div>Loading...</div>}>
                    {(item, index) => 
                      <li class="my-3">
                        <NavLink href={item.route}>
                          {item.label}
                        </NavLink>
                      </li>
                    }
                  </For>
                </ul>
              </nav>
            </div>
            <div class="w-full m-4">
              <Routes />
            </div>
          </main>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
