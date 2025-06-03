// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
//Récuperer les éléments du json
const pieces = await reponse.json();

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
    sectionFiches.appendChild(pieceElement);
    pieceElement.appendChild(imgElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(dispoibiliteElement);
}

const boutonTrier = document.querySelector(".btn-trier");
//Gestion de l'évènement click sur le bouton trier
boutonTrier.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces)
      piecesOrdonnees.sort(function(a,b){
        //Tri des pièces par prix croissant
        return a.prix - b.prix;
    }),
    console.log(piecesOrdonnees)
})

const boutonFiltrer = document.querySelector(".btn-filtrer");  
//Gestion de l'évènement click sur le bouton filtrer
boutonFiltrer.addEventListener("click", () =>{
    const piecesFiltrees = pieces.filter(function(pieces){
        //Filtre les pièces dont le prix est inférieur à 35€
        return pieces.prix <= 35;
    });
    console.log(piecesFiltrees);
})

const boutonFiltrerDesciption = document.querySelector(".btn-descripton");
//Gestion de l'évènement click sur le bouton filtrer description
boutonFiltrerDesciption.addEventListener("click", () =>{
    const descriptionFiltrees = pieces.filter(function(pieces){
        return pieces.description
    })
    console.log(descriptionFiltrees);
})

const boutonOrdreDecroissant = document.querySelector(".btn-decroissant")
//Gestion de l'évènement click sur le bouton ordre décroissant
boutonOrdreDecroissant.addEventListener("click", () =>{
    const piecesDecroissantes = Array.from(pieces)
    piecesDecroissantes.sort(function(a,b){
        return b.prix - a.prix
    })
    console.log(piecesDecroissantes)
})