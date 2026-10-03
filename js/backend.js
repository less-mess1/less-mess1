document.addEventListener("DOMContentLoaded", () => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
        // Eerste keer laden: toon de loading screen
        sessionStorage.setItem("hasVisited", "true"); // Markeer als bezocht
        setTimeout(() => {
            document.getElementById("loading-screen").style.opacity = "0";
            setTimeout(() => {
                document.getElementById("loading-screen").style.display = "none";
                document.getElementById("content").style.visibility = "visible";
                document.getElementById("content").style.opacity = "1";
            }, 500); // Wacht tot de fade-out is voltooid
        }, 3000); // Loading screen duurt 3 seconden
    } else {
        // Bij navigatie binnen de site: direct tonen zonder loading screen
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("content").style.visibility = "visible";
        document.getElementById("content").style.opacity = "1";
    }
});
