import { Link, useLocation, useNavigate } from "solid-app-router";
import { createSignal, createEffect } from "solid-js";
import { render } from "solid-js/web";

export default function Nav() {
    
    // NavLink classes abstracted here so we can change them all in one place
    const navLinkClasses = "flex ease-in-out duration-300 hover:underline-offset-4 hover:underline hover:decoration-2";

    const getCurrentPath = () => {
        if (location.pathname === "/") {
            return [];
        } else {
            return location.pathname.split("/").filter(segment => segment !== "");
        }
    };

    const location = useLocation();
    const navigate = useNavigate();

    const [getTransition, setTransition] = createSignal(false);
    const [getTranslate, setTranslate] = createSignal(0);
    // const [getSidebars, setSidebars] = createSignal([]);
    const [getPath, setPath] = createSignal(getCurrentPath());

    // createEffect(() => {
    //     const currentPath = getCurrentPath();
    //     setPath(currentPath);
    //     transition();
        
    //     return currentPath;
    // });

    const navigateToPage = (newPath) => {
        const currentPath = "/" + getPath().join("/");
        const updatedPath = getPath();
        if (newPath === "..") {
            if (updatedPath.length > 0) {
                updatedPath.pop();
            }
            setPath(updatedPath);
        } else {
            updatedPath.push(newPath);
            setPath(updatedPath);
        }

        // Navigate to the page
        const nextPath = "/" + getPath().join("/");
        navigate(nextPath);

        // Causing warning: "dev.js:745 computations created outside a `createRoot` or `render` will never be disposed"
        // transitionSidebar(currentPath, nextPath);
    };

    const getFlowHtml = (isLive, href, title, description) =>
        <a href={href} class="flex flex-col gap-0.5 p-2 -m-2 cursor-pointer rounded-md hover:bg-gray-50">
            <h1 class="text-lg flex flex-col gap-1">
                {isLive ?
                    <span class="flex items-center text-base gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><rect width="24" height="24" fill="#708A65" rx="12" /><path fill="#fff" d="M17.207 9.707a1 1 0 0 0-1.414-1.414L10.5 13.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6Z" /></svg>
                        Live
                    </span>
                    :
                    <span class="flex items-center text-base gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><rect width="24" height="24" fill="#C5BB61" rx="12" /><path fill="#fff" d="M13 15a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM11 12a1 1 0 1 0 2 0V9a1 1 0 1 0-2 0v3Z" /><path fill="#fff" fill-rule="evenodd" d="M5 12a7 7 0 1 1 14 0 7 7 0 0 1-14 0Zm7-5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" clip-rule="evenodd" /></svg>
                        Manual
                    </span>
                }
                {title}
            </h1>
            <p class="text-sm">
                {description}
            </p>
        </a>;

    const getTextInputHtml = (isSearch, placeholder) =>
        <div class="flex border rounded-md p-2 gap-2 items-center w-full bg-white shadow-inner">
            {
                isSearch ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><path fill="#211F1D" fill-rule="evenodd" d="M8.5 2a6.5 6.5 0 1 0 3.835 11.749l3.958 3.958 1.414-1.414-3.958-3.958A6.5 6.5 0 0 0 8.5 2ZM4 8.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z" clip-rule="evenodd" /></svg>
                    : ""
            }
            {placeholder}
        </div>

    return (
        <div id="sidebar" class={`relative flex flex-row justify-start items-start transition-transform`} style={{ transform: `translateX(${getTranslate()}px)` }}>
                {/* Home */}
                <ul data-path="/" class="slidein shrink-0 w-full list-none my-4 text-xl">
                    <li class="px-6 py-3">
                        <a href="#" class={navLinkClasses}>
                            Audience
                        </a>
                    </li>
                    <li class="px-6 py-3">
                        <a href="#" class={navLinkClasses}>
                            Messaging
                        </a>
                    </li>
                    <li class="px-6 py-3">
                        <a href="flows" class={navLinkClasses}>
                            Flows
                        </a>
                    </li>
                    <li class="px-6 py-3">
                        <a href="#" class={navLinkClasses}>
                            Content
                        </a>
                    </li>
                    <li class="px-6 py-3">
                        <a href="#" class={navLinkClasses}>
                            Analytics
                        </a>
                    </li>
                </ul>
            
                {/* Flows */}
                <div data-path="/flows" class="slidein shrink-0 w-full px-6 flex flex-col gap-4">
                    <div>
                        <a href="/" class="">
                            ← Home
                        </a>
                        <h1 class="text-4xl">Flows</h1>
                    </div>

                    {getTextInputHtml(true, "Search flows")}

                    <label>
                        Status
                        <div class="flex justify-items-stretch p-1 rounded-md bg-gray-100 border border-gray-200 shadow-inner">
                            <div class="bg-white py-1 px-4 rounded shadow-sm grow text-center">
                                All
                            </div>
                            <div class="py-1 px-4 rounded grow text-center">
                                Draft
                            </div>
                            <div class="py-1 px-4 rounded grow text-center">
                                Manual
                            </div>
                            <div class="py-1 px-4 rounded grow text-center">
                                Live
                            </div>
                        </div>
                    </label>

                    <label>
                        Select Tags
                        {getTextInputHtml(false, "No tags selected")}
                    </label>

                    <div class="flex flex-col gap-6 my-8 slidein">
                        {getFlowHtml(true, "/flows/view", "Abandoned Cart", "After someone Checkout Started. Only include someone if has placed Order zero times since starting this flow.")}
                        {getFlowHtml(false, "/flows/view", "Post-Purchase Followup - Order Count Split", "After someone placed an order.")}
                        {getFlowHtml(true, "/flows/view", "Price Drop Notification - Standard (Email or SMS)", "After someone Checkout Started. Only include someone if has placed Order zero times since starting this flow.")}
                        {getFlowHtml(true, "/flows/view", "Welcome", "After someone is added to the list newsletter.")}
                    </div>
                </div>

                {/* Flows/view */}
                <div data-path="/flows/view" class="slidein shrink-0 w-full px-6 flex flex-col gap-4">
                    <div>
                        <a href="/flows" class="">
                            ← Flows
                        </a>
                        <h1 class="text-4xl">Flow Details</h1>
                    </div>

                    {getTextInputHtml(true, "Search messages")}

                    <div class="flex flex-col gap-6 my-8 slidein">
                        {getFlowHtml(true, "/flows/view/email", "New Customer: Thank You", "Welcome to the {{ organization.name|title }} Family!")}
                        {getFlowHtml(true, "/flows/view/email", "New Customer: 2nd Purchase Incentive", "A token of our appreciation")}
                        {getFlowHtml(true, "/flows/view/email", "Repeat Customer: Thank You", "Good choice!")}
                        {getFlowHtml(true, "/flows/view/email", "Loyal Customer: Cross-Sell + Discount", "You might also like...")}
                        {getFlowHtml(true, "/flows/view/email", "Repeat Customer: Review Request", "So, what’d you think?")}
                    </div>
                </div>

                {/* Flows/view/email */}
                <div data-path="/flows/view/email" class="slidein shrink-0 w-full px-6 flex flex-col gap-4">
                    <div>
                        <a href="/flows/view" class="">
                            ← Flow Details
                        </a>
                        <h1 class="text-4xl">Flow Email</h1>
                    </div>

                    <div class="flex flex-col gap-6 my-8 slidein">
                        <a href="/flows/view/email/analytics">
                            <img src="/assets/Key inputs-1.svg" />
                        </a>
                        <a href="/flows/view/email/analytics">
                            <img src="/assets/Key inputs-2.svg" />
                        </a>
                        <a href="/flows/view/email/analytics">
                            <img src="/assets/Key inputs.svg" />
                        </a>
                    </div>
                </div>

                {/* Flows/view/email/analytics */}
                <div data-path="/flows/view/email/analytics" class="slidein shrink-0 w-full px-6 flex flex-col gap-4">
                    <div>
                        <a href="/flows/view/email" class="">
                            ← Flow Email
                        </a>
                        <h1 class="text-4xl">Flow Analytics</h1>
                    </div>

                    <ul class="slidein shrink-0 w-full list-none my-4 text-xl">
                    <li class="py-3">
                        <a href="#" class={navLinkClasses}>
                            Recipient Activity
                        </a>
                    </li>
                    <li class="py-3">
                        <a href="#" class={navLinkClasses}>
                            Link Activity
                        </a>
                    </li>
                    <li class="py-3">
                        <a href="flows" class={navLinkClasses}>
                            Advanced Reports
                        </a>
                    </li>
                    <li class="py-3">
                        <a href="#" class={navLinkClasses}>
                            Watch Live
                        </a>
                    </li>
                </ul>
                </div>
        </div>
    );
}
