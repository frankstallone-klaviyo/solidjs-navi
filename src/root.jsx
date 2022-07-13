// @refresh reload
import { Routes } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import "./index.css";
import { Suspense, For, createSignal, Switch, Match, useTransition, Show } from "solid-js";
import * as mainNav from "./data/main-navigation";
import { NavLink } from "solid-app-router";

export default function Root() {
  const [getActive, setActive] = createSignal("Home");
  const [getMenu, setMenu] = createSignal(false);

  const toggle = () => setMenu(!getMenu());

  // Setting up useTransition()
  const [pending, start] = useTransition();
  // Function to replace setActive() on the NavLink onClick() to kick off transitions
  const updateNav = (item) => () => start(() => setActive(item))
  
  // Popping Home off the top
  mainNav.default.shift();

  // NavLink classes abstracted here so we can change them all in one place
  const navLinkClasses = "flex m-6 ease-in-out duration-300 hover:underline-offset-4 hover:underline hover:decoration-2";

  return (
    <>
      <ErrorBoundary fallback={<div>Something went terribly wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
            <main class="flex flex-row flex-0 text-gray-700 h-screen">
              
              {/* Nav */}
              <div class="flex flex-col w-64 bg-white">
                <nav class="flex-grow w-64">

                  <NavLink href="#" onClick={() => setActive("Home")}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="m-6">
                      <path d="M22 19H2V5H22L18.0334 12L22 19Z" fill="#232426"/>
                    </svg>
                  </NavLink>

                  {/* the classList on the below ul was supposed to be a dyanmic way to show the transition but it never shows */}
                  <ul class="list-none my-4 text-xl h-full" classList={{ 'border-2 border-pink-200': pending()}}>
                  <Switch fallback={<div>Not found</div>}>
                    <Match when={getActive() === "Home"}>
                      <Show when={getActive() !== "Home"}>
                        <h2 class="text-3xl mx-4">{getActive()}</h2>
                      </Show>
                      <For each={mainNav.default} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li>
                            {/* Example of updateNave being used onClick instead of setActive() */}
                            <NavLink href={item.route} onClick={updateNav(item.label)} class={navLinkClasses}>
                              {item.label}
                            </NavLink>
                          </li>
                        }
                      </For>
                    </Match>
                    <Match when={getActive() === "Audience"}>
                      <li class="mt-3">
                        <NavLink href="#" onClick={updateNav("Home")} class="flex mx-3 px-3 ease-in-out duration-300">← Home</NavLink>
                      </li>
                      <Show when={getActive() !== "Home"}>
                        <h2 class="text-3xl mx-4">{getActive()}</h2>
                      </Show>
                      <For each={mainNav.default[1].children} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li>
                            <NavLink href="#" onClick={updateNav(item.label)} class={navLinkClasses}>
                              {item.label}
                            </NavLink>
                          </li>
                        }
                      </For>
                    </Match>
                    <Match when={getActive() === "Messaging"}>
                      <li class="mt-3">
                        <NavLink href="#" onClick={updateNav("Home")} class="flex gap-2 m-6  ease-in-out duration-300">← Home</NavLink>
                      </li>
                      <Show when={getActive() !== "Home"}>
                        <h2 class="text-3xl mx-4">{getActive()}</h2>
                      </Show>
                      <For each={mainNav.default[2].children} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li>
                            <NavLink href="#" onClick={updateNav(item.label)} class={navLinkClasses}>
                              {item.label}
                            </NavLink>
                          </li>
                        }
                      </For>
                    </Match>
                    <Match when={getActive() === "Flows"}>
                      <li class="mt-3">
                        <NavLink href="/" onClick={updateNav("Home")} class="flex gap-2 m-6  ease-in-out duration-300">← Home</NavLink>
                      </li>
                      <Show when={getActive() !== "Home"}>
                        <h2 class="text-3xl mx-4">{getActive()}</h2>
                      </Show>
                    </Match>
                    <Match when={getActive() === "Content"}>
                      <li class="mt-3">
                        <NavLink href="#" onClick={updateNav("Home")} class="flex gap-2 m-6  ease-in-out duration-300">← Home</NavLink>
                      </li>
                      <Show when={getActive() !== "Home"}>
                        <h2 class="text-3xl mx-4">{getActive()}</h2>
                      </Show>
                      <For each={mainNav.default[4].children} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li>
                            <NavLink href="#" onClick={updateNav(item.label)} class={navLinkClasses}>
                              {item.label}
                            </NavLink>
                          </li>
                        }
                      </For>
                    </Match>
                    <Match when={getActive() === "Analytics"}>
                      <li class="mt-3">
                        <NavLink href="#" onClick={updateNav("Home")} class="flex gap-2 m-6  ease-in-out duration-300">← Home</NavLink>
                      </li>
                      <Show when={getActive() !== "Home"}>
                        <h2 class="text-3xl mx-4">{getActive()}</h2>
                      </Show>
                      <For each={mainNav.default[5].children} fallback={<div>Loading...</div>}>
                        {(item, index) => 
                          <li>
                            <NavLink href="#" onClick={updateNav(item.label)} class={navLinkClasses}>
                              {item.label}
                            </NavLink>
                          </li>
                        }
                      </For>
                    </Match>
                  </Switch>
                  </ul>
                </nav>

                <div className="relative">
                  <button type="button" class="flex p-4 gap-2 cursor-pointer relative w-full" onClick={toggle}>
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
                  </button>
                  <Show when={getMenu()}>
                    <div class="absolute -top-52 left-64 border border-border-neutral-subtle-base rounded-xl bg-white w-64 h-64 text-left shadow-xl p-6">
                      Theresa Webb
                    </div>
                  </Show>
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
