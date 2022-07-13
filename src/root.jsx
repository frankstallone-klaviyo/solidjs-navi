// @refresh reload
import { Routes } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import "./index.css";
import { Suspense, For, createSignal, Switch, Match, useTransition, createResource } from "solid-js";
import * as mainNav from "./data/main-navigation";
import { NavLink } from "solid-app-router";

export default function Root() {
  const [getActive, setActive] = createSignal("Home");
  const [pending, start] = useTransition();
  const updateNav = (item) => () => start(() => setActive(item))
    
  return (
    <>
      <ErrorBoundary fallback={<div>Something went terribly wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
            <main class="flex flex-row flex-0 text-gray-700 h-screen">
              
              {/* Nav */}
              <div class="flex flex-col w-64 bg-background-neutral-subtle-base border-r border-border-neutral-subtle-base">
                <nav class="flex-grow">

                  <NavLink href="#" onClick={() => setActive("Home")}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="m-6">
                      <path d="M22 19H2V5H22L18.0334 12L22 19Z" fill="#232426"/>
                    </svg>
                  </NavLink>

                  <ul class="list-none my-4 text-sm h-full" classList={{ 'border-2 border-pink-200': pending()}}>
                  <Switch fallback={<div>Not found</div>}>
                    <Match when={getActive() === "Home"}>
                      <For each={mainNav.default} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li>
                            <NavLink href={item.route} onClick={updateNav(item.label)} class="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered ease-in-out duration-300">
                              <img src={item.icon}/>
                              {item.label}
                            </NavLink>
                          </li>
                        }
                      </For>
                    </Match>
                    <Match when={getActive() === "Audience"}>
                      <li class="my-3">
                        <NavLink href="#" onClick={updateNav("Home")} class="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered ease-in-out duration-300">← Home</NavLink>
                      </li>
                      <For each={mainNav.default[1].children} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li>
                            <NavLink href="#" onClick={updateNav(item.label)} class="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered ease-in-out duration-300">
                              {item.label}
                            </NavLink>
                          </li>
                        }
                      </For>
                    </Match>
                    <Match when={getActive() === "Messaging"}>
                      <li class="my-3">
                        <NavLink href="#" onClick={updateNav("Home")} class="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered ease-in-out duration-300">← Home</NavLink>
                      </li>
                      <For each={mainNav.default[2].children} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li>
                            <NavLink href="#" onClick={updateNav(item.label)} class="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered ease-in-out duration-300">
                              {item.label}
                            </NavLink>
                          </li>
                        }
                      </For>
                    </Match>
                    <Match when={getActive() === "Flows"}>
                      <li class="my-3">
                        <NavLink href="/" onClick={updateNav("Home")} class="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered ease-in-out duration-300">← Home</NavLink>
                      </li>
                      {/* <For each={mainNav.default} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li>
                            <NavLink href={item.route} onClick={updateNav(item.label)} class="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered ease-in-out duration-300">
                              {item.label}
                            </NavLink>
                          </li>
                        }
                      </For> */}
                    </Match>
                    <Match when={getActive() === "Content"}>
                      <li class="my-3">
                        <NavLink href="#" onClick={updateNav("Home")} class="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered ease-in-out duration-300">← Home</NavLink>
                      </li>
                      <For each={mainNav.default[4].children} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li>
                            <NavLink href="#" onClick={updateNav(item.label)} class="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered ease-in-out duration-300">
                              {item.label}
                            </NavLink>
                          </li>
                        }
                      </For>
                    </Match>
                    <Match when={getActive() === "Analytics"}>
                      <li class="my-3">
                        <NavLink href="#" onClick={updateNav("Home")} class="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered ease-in-out duration-300">← Home</NavLink>
                      </li>
                      <For each={mainNav.default[5].children} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li>
                            <NavLink href="#" onClick={updateNav(item.label)} class="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered ease-in-out duration-300">
                              {item.label}
                            </NavLink>
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
