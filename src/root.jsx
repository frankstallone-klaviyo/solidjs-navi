// @refresh reload
import { Routes } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import { Suspense } from "solid-js";
import "./index.css";
import { For, createSignal, Switch, Match } from "solid-js";
import * as mainNav from "./data/main-navigation";
import { NavLink } from "solid-app-router";


export default function Root() {
  const [active, setActive] = createSignal("Home");
  console.log(mainNav.default)
    
  return (
    <>
      <ErrorBoundary fallback={<div>Something went terribly wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
            <main class="flex flex-row flex-0 text-gray-700 h-screen">
              <div class="w-52 bg-slate-200">
                <nav>
                  <ul className="list-none mx-4 text-sm h-full">
                  <Switch fallback={<div>Not found</div>}>
                    <Match when={active() === "Home" | "Flows"}>
                      <For each={mainNav.default} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li class="my-3">
                            <a href="#" onClick={() => setActive(item.label)}>
                              {item.label}
                            </a>
                          </li>
                        }
                      </For>
                    </Match>
                    <Match when={active() === "Audience"}>
                      <li class="my-3"><a href="#" onClick={() => setActive("Home")}>← Home</a></li>
                      <For each={mainNav.default[1].children} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li class="my-3">
                            <a href="#" onClick={() => setActive(item.label)}>
                              {item.label}
                            </a>
                          </li>
                        }
                      </For>
                    </Match>
                  </Switch>
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
