import { ajoutListenersAvis } from "./avis.js";
// Récupération des pièces depuis le fichier JSON
const reponse = await fetch(' http://localhost:8081/pieces');
//Récuperer les éléments du json
const pieces = await reponse.json();

function regenerPieces(pieces){
    for(let i = 0 ; i < pieces.length; i++) {
        //Récuperation de la balise parente 'section'
        const sectionFiches = document.querySelector(".fiches");
        //création d'une balise article
        const pieceElement = document.createElement("article");

        //Création des balises
        const imgElement = document.createElement("img");
        const nomElement = document.createElement("h2");
        const prixElement = document.createElement("p");
        const categorieElement = document.createElement("p");
        const descriptionElement = document.createElement("p");
        const dispoibiliteElement = document.createElement("p");

        // On accède à l’indice i de la liste pieces pour configurer les sources.
        imgElement.src = pieces[i].image;
        nomElement.innerText = pieces[i].nom;
        //Opérateur ternaire
        prixElement.innerText = `Prix : ${pieces[i].prix} € ${(pieces[i].prix < 35 ? "(€)" : "(€€€)")} `;
        //opération nullish
        categorieElement.innerText = pieces[i].categorie ?? "(Aucune categorie)";
        //opération nullish
        descriptionElement.innerText = pieces[i].description ?? "(Pas de description pour le moment)";
        //opérateur ternaire
        dispoibiliteElement.innerText = `${pieces[i].disponibilite === true ? "En stock" : "Rupture de stock"}`;
        //Ajout du bouton pour les avis
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = pieces[i].id
        avisBouton.textContent = "Afficher les avis";
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imgElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(dispoibiliteElement);
        pieceElement.appendChild(avisBouton);
    }
    ajoutListenersAvis()
}
regenerPieces(pieces)

const boutonTrier = document.querySelector(".btn-trier");
//Gestion de l'évènement click sur le bouton trier
boutonTrier.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces)
      piecesOrdonnees.sort(function(a,b){
        //Tri des pièces par prix croissant
        return a.prix - b.prix;
    }),
    document.querySelector(".fiches").innerHTML = "";
    regenerPieces(piecesOrdonnees)
})

const boutonFiltrer = document.querySelector(".btn-filtrer");  
//Gestion de l'évènement click sur le bouton filtrer
boutonFiltrer.addEventListener("click", () =>{
    const piecesFiltrees = pieces.filter(function(pieces){
        //Filtre les pièces dont le prix est inférieur à 35€
        return pieces.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    regenerPieces(piecesFiltrees)
})

const boutonFiltrerDesciption = document.querySelector(".btn-descripton");
//Gestion de l'évènement click sur le bouton filtrer description
boutonFiltrerDesciption.addEventListener("click", () =>{
    const descriptionFiltrees = pieces.filter(function(pieces){
        return pieces.description
    })
    document.querySelector(".fiches").innerHTML = "";
    regenerPieces(descriptionFiltrees)
})

const boutonOrdreDecroissant = document.querySelector(".btn-decroissant")
//Gestion de l'évènement click sur le bouton ordre décroissant
boutonOrdreDecroissant.addEventListener("click", () =>{
    const piecesDecroissantes = Array.from(pieces)
    piecesDecroissantes.sort(function(a,b){
        return b.prix - a.prix
    })
    document.querySelector(".fiches").innerHTML = "";
    regenerPieces(piecesDecroissantes)
})

//Créer un nouveau tableau 'nom' basé sur l’ancien.
const nomsPieces = pieces.map(pieces => pieces.nom)

//Ajoutez et supprimez les éléments d’une liste
for(let i = pieces.length - 1; i >= 0; i--){
    if(pieces[i].prix > 35){
        nomsPieces.splice(i, 1);
    }
}
console.log(nomsPieces);

//Création de l'en-têt
const baliseAbordable = document.createElement("p");
baliseAbordable.innerText = "Liste des pièces abordables :";
const baliseDisponible = document.createElement("p");
baliseDisponible.innerText = "Liste des pièces disponibles :";

//Affichez la liste des pièces abordables
const abordables = document.createElement("ul")

//Ajout de chaque nom à la liste
for(let i = 0; i < nomsPieces.length; i++){
    const nomElement = document.createElement("li");
    nomElement.innerText = nomsPieces[i];
    //Ajout de chaque nom à la liste abordables
    abordables.appendChild(nomElement)
}

//Ajout de la liste abordables à la section fiches
const produitAbordables = document.querySelector(".produitAbordables")
produitAbordables.appendChild(baliseAbordable).appendChild(abordables);


// Extraire les noms et les prix de toutes les pièces
const disponibiliteNoms = pieces.map(p => p.nom);
const disponibilitePrix = pieces.map(p => p.prix);

// Supprimer les éléments non disponibles (en partant de la fin)
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].disponibilite === false) {
        disponibiliteNoms.splice(i, 1);
        disponibilitePrix.splice(i, 1);
    }
}

// Créer une <ul> pour afficher la liste
const disponible = document.createElement("ul");

// Ajouter chaque pièce disponible à la liste
for (let i = 0; i < disponibiliteNoms.length; i++) {
    const nomElementDisponible = document.createElement("li");
    nomElementDisponible.innerText = `${disponibiliteNoms[i]} – ${disponibilitePrix[i]} €`;
    disponible.appendChild(nomElementDisponible);
}

// Ajouter la liste dans le DOM
const piecesDisponible = document.querySelector(".piecesDisponible");
piecesDisponible.appendChild(baliseDisponible).appendChild(disponible);

//input de type range prix maximum pour filtrer les pièces
  const inputPrix = document.getElementById("input-prix");
  const valeurPrix = document.getElementById("valeur-prix");
  inputPrix.addEventListener('input', () =>{
    const resutatFiltre = pieces.filter(p => p.prix <= inputPrix.value);
    valeurPrix.innerText = inputPrix.value;
    document.querySelector(".fiches").innerHTML = "";
    regenerPieces(resutatFiltre);
  });