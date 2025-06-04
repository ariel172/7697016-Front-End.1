// Fonction qui ajoute les écouteurs d'événements sur les boutons d'avis
export function ajoutListenersAvis() {
    // Sélectionne tous les boutons à l'intérieur des articles de la section .fiches
    const piecesElements = document.querySelectorAll(".fiches article button");

    // Parcourt tous les boutons sélectionnés
    for (let i = 0; i < piecesElements.length; i++) {
        // Ajoute un écouteur d'événement 'click' sur chaque bouton
        piecesElements[i].addEventListener("click", async function (event) {
            // Récupère l'id de la pièce depuis l'attribut data-id du bouton cliqué
            const id = event.target.dataset.id;
            // Fait une requête pour récupérer les avis de la pièce correspondante
            const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
            // Convertit la réponse en JSON (tableau d'avis)
            const avis = await reponse.json();
            // Récupère l'élément parent du bouton (l'article de la pièce)
            const pieceElement = event.target.parentElement;

            // Crée un nouvel élément <p> pour afficher les avis
            const avisElement = document.createElement("p");
            // Parcourt tous les avis reçus
            for (let i = 0; i < avis.length; i++) {
                // Ajoute chaque avis dans le paragraphe, avec l'utilisateur et le commentaire
                avisElement.innerHTML += `<br>${avis[i].utilisateur}:</br> ${avis[i].commentaire} <br>`;
            }
            // Ajoute le paragraphe contenant les avis à l'article de la pièce
            pieceElement.appendChild(avisElement)
        });
    }
}

//Fonction pour envoyer avis
export function ajoutListenerEnvoyerAvis(){
    const formulaireAvis = document.querySelector(".formulaire-avis");
    // Ajoute un écouteur d'événement 'submit' sur le formulaire d'avis
    formulaireAvis.addEventListener("submit", function (event){
      event.preventDefault(); // Empêche le rechargement de la page

    // Création de l’objet du nouvel avis.
    const avis = {
      pieceId : parseInt(event.target.querySelector("[name=piece-id]").value),
      utilisateur : event.target.querySelector("[name=utilisateur]").value,
      commentaire : event.target.querySelector("[name=commentaire]").value
    }
    //converton de l'objet avis en chaîne au format JSON
    const chargeUtile = JSON.stringify(avis)

    // Appel de la fonction fetch avec toutes les informations nécessaires
    fetch("http://localhost:8081/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });
    })
}