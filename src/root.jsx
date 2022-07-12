// @refresh reload
import { Routes } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import { Suspense } from "solid-js";
import "./index.css";
import { For, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import * as mainNav from "./data/main-navigation";
import { NavLink } from "solid-app-router";

export const NavigationContext = createContext([
  "root",
  {
    changeActive: () => undefined,
  }
]);

export function NavigationProvider(props) {
  const [state, setState] = createStore({
    active: props.active ?? "root",
    menuItems: mainNav.default,
  })

  // const changeActive = (active) => setState("active", active);
  const changeActive = (active) => setState("active", active);

  return (
    <NavigationContext.Provider value={[state, {changeActive}]}>
      {props.children}
    </NavigationContext.Provider>
  )
}

export const useNav = () => useContext(NavigationContext);

export default function Root() {
  const [active, {changeActive}] = useNav();
  console.log(active)
  
  return (
    <>
      <ErrorBoundary fallback={<div>Something went terribly wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <NavigationProvider>
            <main class="flex flex-row flex-0 text-gray-700 h-screen">
              <div class="w-52 bg-slate-200">
              <button onClick={() => changeActive("new")}>{active}</button>
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
          </NavigationProvider>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
