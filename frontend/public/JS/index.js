//Page accueil connexion//
const boutonConnexion = document.getElementsByClassName("bouton-connexion");
const formConnexion = document.getElementsByClassName("form-connexion");

boutonConnexion.addEventListener("click", () => {
    if (getComputedStyle(formConnexion).display != "none") {
        formConnexion.style.display = "none";
    } else {
        formConnexion.style.display = "block";
    }
});

