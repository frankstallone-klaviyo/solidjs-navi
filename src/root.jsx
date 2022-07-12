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
              
              {/* Nav */}
              <div class="flex flex-col w-64 bg-background-neutral-subtle-base border-r border-border-neutral-subtle-base">
                <nav class="flex-grow">

                  <img src="/assets/logo-flag.svg" class="m-6"/>

                  <ul className="list-none my-4 text-sm h-full">
                  <Switch fallback={<div>Not found</div>}>
                    <Match when={active() === "Home" | "Flows"}>
                      <For each={mainNav.default} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li>
                            <a href="#" onClick={() => setActive(item.label)} class="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered">
                              <img src={item.icon}/>
                              {item.label}
                            </a>
                          </li>
                        }
                      </For>
                    </Match>
                    <Match when={active() === "Audience"}>
                      <li class="my-3">
                        <a href="#" onClick={() => setActive("Home")} class="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered">← Home</a>
                      </li>
                      <For each={mainNav.default[1].children} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li>
                            <a href="#" onClick={() => setActive(item.label)} class="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered">
                              {item.label}
                            </a>
                          </li>
                        }
                      </For>
                    </Match>
                  </Switch>
                  </ul>
                </nav>

                <div class="flex p-4 border-t border-border-neutral-subtle-base gap-2 cursor-pointer hover:bg-background-neutral-subtle-hovered">
                  <img src="/assets/company.svg" />

                  <div class="grow">
                    <p class="text-sm">
                      Company Name
                    </p>
                    <p class="text-xs">
                      name@email.com
                    </p>
                  </div>

                  <img src="/assets/icons/open.svg" />
                </div>
              </div>

              {/* Main content */}
              <div class="w-full m-4">
                <Routes />
              </div>
            </main>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
