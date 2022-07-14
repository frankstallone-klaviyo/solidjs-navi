// @refresh reload
import { Routes } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import "./index.css";
import { Suspense, For, createSignal, Switch, Match, useTransition, Show } from "solid-js";
import { NavLink, useLocation } from "solid-app-router";
import Nav from "./components/Nav";

let sidebar;
var previousPage;
window.onload = function() {
    var bodyList = document.querySelector("body")
    sidebar = document.querySelector(`#sidebar`);

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (previousPage != window.location.pathname) {
                console.log(previousPage, window.location.pathname)
                previousPage = window.location.pathname;
                updateNav()
                /* Changed ! your code here */
            }
        });
    });
    
    var config = {
        childList: true,
        subtree: true
    };
    
    observer.observe(document, config);

    // Hide all sidebars
    [...sidebar.children].forEach(child => child.classList.add("hidden"));

    updateNav();
};

function updateNav(){
    window.setTimeout(() => {
        const currentPage = window.location.pathname;
        
        let previousSidebar = sidebar.querySelector(`[data-path="${previousPage}"]`);
        let currentSidebar = sidebar.querySelector(`[data-path="${currentPage}"]`);

        console.log(previousSidebar, currentSidebar);

        // Don't do anything if the sidebars are the same
        if (previousSidebar === currentSidebar){
            return;
        }

        if (!previousSidebar){
            // There's no previous page, so no transition needed.
            currentSidebar.classList.remove("hidden");

        } else {
            // Transition the pages
            let previousIndex = getPathDepth(previousPage);
            let currentIndex = getPathDepth(currentPage);

            console.log(previousIndex, currentIndex);
            
            if (previousIndex > currentIndex){
                console.log("Going back");
                // Going back
                let offset = 0;
                sidebar.classList.remove("transition-transform");
                sidebar.style.transform = `translateX(${-400}px)`;
                currentSidebar.classList.remove("hidden");
                window.setTimeout(() => {
                    sidebar.classList.add("transition-transform");
                    sidebar.style.transform = `translateX(0px)`;
                    
                    window.setTimeout(() => {
                        sidebar.classList.remove("transition-transform");
                        sidebar.style.transform = "translateX(0)";
                        previousSidebar.classList.add("hidden");
                    }, 400);
                }, 100);
            } else {
                // Going forward
                // Show the new sidebar
                let offset = -400;
                sidebar.classList.add("transition-transform");
                sidebar.style.transform = `translateX(${offset}px)`;
                currentSidebar.classList.remove("hidden");
                
                window.setTimeout(() => {
                    sidebar.classList.remove("transition-transform");
                    sidebar.style.transform = "translateX(0)";
                    previousSidebar.classList.add("hidden");
                }, 400);
            }



        }

    });
}

function getPathDepth(path){
    if (path === "/")
        return 1;
    else
        return path.split("/").length;
}

export default function Root() {

	const sidebarWidth = 400;
	
	const [getActive, setActive] = createSignal("Home");
	// const [getDepth, setDepth] = createSignal(0);
	const [getMenu, setMenu] = createSignal(false);
	const toggle = () => setMenu(!getMenu());

	return (
		<>
			<ErrorBoundary fallback={() => <div>Something went terribly wrong</div>}>
				<Suspense fallback={() => <div>Loading...</div>}>
						<main class="flex flex-row flex-0 text-gray-700 h-screen">
							
							{/* Nav */}
							<div style={{ width: `${sidebarWidth}px` }} class="shrink-0 box-border overflow-hidden flex flex-col bg-white">
								<nav class=" flex-grow">

									<NavLink href="/">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="m-6">
											<path d="M22 19H2V5H22L18.0334 12L22 19Z" fill="#232426"/>
										</svg>
									</NavLink>
									
									<Nav />
								</nav>

								<div className="relative">
									<a href="/settings" type="button" class="flex p-4 gap-2 items-center cursor-pointer relative w-full" >
										<img src="/assets/company.svg" />

										<div class="grow text-left">
											<p class="text-sm">
												Company Name
											</p>
											<p class="text-xs">
												name@email.com
											</p>
										</div>

										<img src="/assets/icons/open.svg" />
									</a>
									<Show when={getMenu()}>
										<div class="absolute -top-52 left-64 border border-border-neutral-subtle-base rounded-xl bg-white w-64 h-64 text-left shadow-xl p-6">
											Theresa Webb
										</div>
									</Show>
								</div>
							</div>

							{/* Main content */}
							<div class="w-full">
								<Routes />
							</div>
						</main>
				</Suspense>
			</ErrorBoundary>
		</>
	);
}
