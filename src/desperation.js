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