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
          <main class="flex flex-row flex-0 text-gray-700 min-h-screen">
            
            {/* Nav */}
            <div class="flex flex-col w-64 bg-background-neutral-subtle-base border-r border-border-neutral-subtle-base">
              <nav class="flex-grow">
                
                <img src="/assets/logo-flag.svg" class="m-6"/>

                <ul className="list-none my-4 text-sm h-full">
                  <For each={mainNav.default} fallback={<div>Loading...</div>}>
                    {(item, index) => 
                      <li>
                        <NavLink href={item.route} className="flex gap-2 mx-3 p-3 rounded-lg hover:bg-background-neutral-subtle-hovered">
                          <img src={item.icon}/>
                          {item.label}
                        </NavLink>
                      </li>
                    }
                  </For>
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
