// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

//Récuperer le premier élément du json
const article = pieces[0];

//Création des balises
const imgElement = document.createElement("img");
imgElement.src = article.image;

const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;

const prixElement = document.createElement("p");
//Opérateur ternaire
prixElement.innerText = `Prix : ${article.prix} € ${(article.prix < 35 ? "€" : "(€€€)")} `;

const categorieElement = document.createElement("p");
//opération nullish
categorieElement.innerText = article.categorie ?? "(Aucune categorie)";

const descriptionElement = document.createElement("p");
//opération nullish
descriptionElement.innerText = article.description ?? "(Pas de description pour le moment)";

const dispoibiliteElement = document.createElement("p");
//opérateur ternaire
dispoibiliteElement.innerText = `${article.disponibilite == true ? "En stock" : "Rupture de stock"}`;

//Ajout des balises crée dans le parent section
const sectionFiches = document.querySelector(".fiches");
sectionFiches.appendChild(imgElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);
sectionFiches.appendChild(descriptionElement);
sectionFiches.appendChild(dispoibiliteElement);