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
            // Convertit le tableau d'avis en chaîne de caractères au format JSON
            const valeurAvis = JSON.stringify(avis);
            // Stocke les avis dans le localStorage avec une clé spécifique
            window.localStorage.setItem(`avis-piece-${id}`, valeurAvis);
            // Récupère l'élément parent du bouton (l'article de la pièce)
            const pieceElement = event.target.parentElement;
            afficherAvis(pieceElement,avis)
        });
    }
}

// Fonction pour afficher les avis d'une pièce
export function afficherAvis(pieceElement,avis){
  // Crée un nouvel élément <p> pour afficher les avis
  const avisElement = document.createElement("p");
  // Parcourt tous les avis reçus
  for (let i = 0; i < avis.length; i++) {
  // Ajoute chaque avis dans le paragraphe, avec l'utilisateur et le commentaire
    avisElement.innerHTML += `<br>${avis[i].utilisateur}:</br> ${avis[i].commentaire} <br>`;
  }
  // Ajoute le paragraphe contenant les avis à l'article de la pièce
  pieceElement.appendChild(avisElement)
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
      commentaire : event.target.querySelector("[name=commentaire]").value,
      nbEtoiles : parseInt(event.target.querySelector("[name=nbEtoiles]").value)
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

export async function afficherGraphiqueAvis(){
  // Calcul du nombre total de commentaires par quantité d'étoiles attribuées
  const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
  const nb_commentaires = [0, 0, 0, 0, 0];
  for (let commentaire of avis) {
    nb_commentaires[commentaire.nbEtoiles - 1]++;
  }
  // Légende qui s'affichera sur la gauche à côté de la barre horizontale
  const labels = ["5", "4", "3", "2", "1"];
  // Données et personnalisation du graphique
  const data = {
    labels: labels,
    datasets: [{
      label: "Étoiles attribuées",
      data: nb_commentaires.reverse(),
      backgroundColor: "rgba(255, 230, 0, 1)", // couleur jaune
    }],
  };
  // Objet de configuration final
  const config = {
    type: "bar",
    data: data,
    options: {
        indexAxis: "y",
    },
  };
  // Rendu du graphique dans l'élément canvas
  const graphiqueAvis = new Chart(
    document.querySelector("#graphique-avis"),
    config,
  );

  // Récupération des pièces depuis le localStorage
    const piecesJSON = window.localStorage.getItem("pieces");
    //const pieces = piecesJSON ? JSON.parse(piecesJSON) : [];
    const pieces = JSON.parse(piecesJSON)
    // Calcul du nombre de commentaires
    let nbCommentairesDispo = 0;
    let nbCommentairesNonDispo = 0;
    //if(pieces.length > 0){
    for (let i = 0; i < avis.length; i++) {
        const piece = pieces.find(p => p.id === avis[i].pieceId);

        if (piece) {
            if (piece.disponibilite) {
                nbCommentairesDispo++;
            } else {
                nbCommentairesNonDispo++;
            }
        }
    }

    // Légende qui s'affichera sur la gauche à côté de la barre horizontale
    const labelsDispo = ["Disponibles", "Non dispo."];

    // Données et personnalisation du graphique
    const dataDispo = {
        labels: labelsDispo,
        datasets: [{
            label: "Nombre de commentaires",
            data: [nbCommentairesDispo, nbCommentairesNonDispo],
            backgroundColor: "rgba(0, 230, 255, 1)", // turquoise
        }],
    };

    // Objet de configuration final
    const configDispo = {
        type: "bar",
        data: dataDispo,
    };
    console.log(dataDispo);
    // Rendu du graphique dans l'élément canvas
    new Chart(
        document.querySelector("#graphique-dispo"),
        configDispo,
    );
}
