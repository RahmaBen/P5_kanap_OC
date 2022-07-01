
fetch("http://localhost:3000/api/products")
// récupérer le résultat de la requête au format json
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
// ce qui est été traiter en json sera appelé products
.then(function(products) {
  afficherProductsCards(products);
})
 // En cas d'erreur h1 au contenu de erreur 404 et renvoit en console l'erreur.
 .catch((err) => {
  document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
  console.log("erreur 404, sur ressource api:" + err);
});
// fonction afficherItems pour afficher les articles depuis l'API
function afficherProductsCards(products){

    for (let product of products){

          // Créer un élément <a> et ajoutez-le au document :
        let ElementLink = document.createElement("a");
        // ajouter ElementLinken en tant que enfant de l'élément avec la class="items":
        document.querySelector(".items").appendChild(ElementLink);
        // ElementLink renvoie l'utilisateur vers la page du produit
        ElementLink.href="./product.html?_id=" + product._id;

        // Créer un élément <article> et ajoutez-le au document :
        let ElementArticle = document.createElement("article");
        // ajouter ElementArticle en tant que enfant de l'élément ElementLink:
        ElementLink.appendChild(ElementArticle);

          // Créer un élément <img> et ajoutez-le au document :
        let ElementImg=document.createElement("img");
        // ajouter ElementImg en tant que enfant de l'élément ElementArticle:
        ElementArticle.appendChild(ElementImg);
        // ajouter l'image du produit
        ElementImg.src=product.imageUrl;

        // Créer un élément <h3> et ajoutez-le au document :
        let ElementTitle= document.createElement("h3");
        // ajouter ElementTitle en tant que enfant de l'élément ElementArticle:
        ElementArticle.appendChild(ElementTitle);
        // ajouter la classe CSS productName à ElementTitle.
        ElementTitle.classList.add("productName");
        // ajouter le nom du produit
        ElementTitle.innerHTML= product.name;

        // Créer un élément <p> et ajoutez-le au document :
        let ElementDescription= document.createElement("p");
        // ajouter ElementDescription en tant que enfant de l'élément ElementArticle:
        ElementArticle.appendChild(ElementDescription);
        // ajouter la classe CSS productDescription à ElementDescription.
        ElementDescription.classList.add("productDescription");
        // ajouter la description du produit
        ElementDescription.innerHTML= product.description;
    }
}


// Version2
// function afficherItems (products){
// let zoneItems = document.querySelector("#items");
  
// for (let product of products){
//     zoneItems.innerHTML += `<a href="./product.html?_id=${product._id}">
//      <article>
//      <img src="${product.imageUrl}" alt="${product.altTxt}">
//       <h3 class="productName">${product.name}</h3>
//        <p class="productDescription">${product.description}</p>
//     </article>
//    </a>`;
// }}

