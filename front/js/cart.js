// Récupérer les données stocké dans localStorage en JSON
let localStorageProducts = JSON.parse(localStorage.getItem("products"));

let prixTotale = 0;
nbrTotal(localStorageProducts.length);

// 1. API
for (let product of localStorageProducts){

  const productUrl = "http://localhost:3000/api/products/" + product.productId;

  fetch(productUrl)
  // récupérer le résultat de la requête au format json
  .then(function(res) {
      if (res.ok) {
      return res.json();
    }
    
  })

  // ce qui est été traiter en json sera appelé item
  .then(function(item) {
      afficherProductPanier(item);
  })

  // En cas d'erreur h1 au contenu de erreur 404 et renvoit en console l'erreur.
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api:" + err);
  });

  function afficherProductPanier(item){

      // Créer un élément <article> et ajoutez-le au document :
      let ArticlePanier=  document.createElement("article");
      // ajouter la classe CSS cart__item à ArticlePanier.
      ArticlePanier.classList.add("cart__item");
      // ajouter la data-id
      ArticlePanier.dataset.id = product.productId;
      // ajouter la data-colr
      ArticlePanier.dataset.color = product.couleur;
      // ajouter ArticlePanier en tant que enfant de l'élément avec l'id="cart__items":   
      document.querySelector("#cart__items").appendChild(ArticlePanier);


      // Créer un élément <div> et ajoutez-le au document :
      let div= document.createElement("div");
      // ajouter la classe CSS cart__item__img à div.
      div.classList.add("cart__item__img");
      // ajouter div en tant que enfant de l'élément ArticlePanier:  
      ArticlePanier.appendChild(div);
  

      // Créer un élément <img> et ajoutez-le au document :
      let imgArticle =  document.createElement("img");
      // ajouter l'image du produit
      imgArticle.src=item.imageUrl;
      // ajouter imgArticle en tant que enfant de l'élément div:  
      div.appendChild(imgArticle);


      // Créer un élément <div> et ajoutez-le au document :
      let divContent= document.createElement("div");
      // ajouter la classe CSS cart__item__content à divContent.
      divContent.classList.add("cart__item__content");
      // ajouter divContent en tant que enfant de l'élément ArticlePanier:  
      ArticlePanier.appendChild(divContent);


       // Créer un élément <div> et ajoutez-le au document :
      let divContentDescription = document.createElement("div");
       // ajouter la classe CSS cart__item__content__description à divContentDescription.
      divContentDescription.classList.add("cart__item__content__description");
       // ajouter divContentDescription en tant que enfant de l'élément divContent: 
      divContent.appendChild(divContentDescription);


      // Créer un élément <h2> et ajoutez-le au document :
      let title = document.createElement("h2");
       // ajouter le nom du produit
      title.innerHTML= item.name;
      // ajouter title en tant que enfant de l'élément divContentDescription: 
      divContentDescription.appendChild(title);


      // Créer un élément <p> et ajoutez-le au document :
      let paragrapheColor = document.createElement("p");
       // ajouter la couleur du produit
      paragrapheColor.innerHTML=product.couleur;
       // ajouter paragrapheColor en tant que enfant de l'élément divContentDescription:
      divContentDescription.appendChild(paragrapheColor);


       // Créer un élément <p> et ajoutez-le au document :
      let paragraphePrice = document.createElement("p");
       // ajouter le prix du produit
      paragraphePrice.innerHTML=item.price += " " + "\u20AC";
       // ajouter paragraphePrice en tant que enfant de l'élément divContentDescription:
      divContentDescription.appendChild(paragraphePrice);


       // Créer un élément <div> et ajoutez-le au document :
      let divContentSettings = document.createElement("div");
      // ajouter la classe CSS cart__item__content__settings à divContentSettings.  
      divContentSettings.classList.add("cart__item__content__settings");
      // ajouter divContentSettings en tant que enfant de l'élément divContentSettings:
      divContent.appendChild(divContentSettings);

      
      // Créer un élément <div> et ajoutez-le au document :
      let divContentSettingsQuantity = document.createElement("div");
      // ajouter la classe CSS cart__item__content__settings__quantity à divContentSettingsQuantity. 
      divContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
       // ajouter divContentSettingsQuantity en tant que enfant de l'élément divContentSettings:
      divContentSettings.appendChild(divContentSettingsQuantity);
   

       // Créer un élément <p> et ajoutez-le au document :
      let paragrapheQuantity = document.createElement("p");
      // Ajouter Qté à la balise p
      paragrapheQuantity.innerHTML= "Qté :";
       // ajouter paragrapheQuantity en tant que enfant de l'élément divContentSettingsQuantity:
      divContentSettingsQuantity.appendChild(paragrapheQuantity);


       // Créer un élément <input> et ajoutez-le au document :
      let itemQuantity = document.createElement("input");
      // ajouter la classe CSS itemQuantity à itemQuantity.
      itemQuantity.classList.add("itemQuantity");
      // Ajouter les attributs de l'input
      itemQuantity.setAttribute("name","itemQuantity");
      itemQuantity.setAttribute( "type","number" );
      itemQuantity.setAttribute( "min","1" );
      itemQuantity.setAttribute( "max","100");
      itemQuantity.setAttribute( "value",product.quantite);
      divContentSettingsQuantity.appendChild(itemQuantity);
     
      // créer l'événement de modification 
      itemQuantity.addEventListener("change", updateValue);
      // créer la fonction de updateValue  
      function updateValue() {
        // pour  chaque produit du tableau localStorageProducts
        for(let i=0; i<localStorageProducts.length;i++){
          // si id et couleur du produit sont identiques a ceux d'un produit dans le localstorge
          if(product.productId === localStorageProducts[i].productId && product.couleur === localStorageProducts[i].couleur ) {
            // eliminer le prix de ce produit de la somme totale
            prixTotale = prixTotale - (localStorageProducts[i].quantite * parseInt(item.price));
            // la quantité du produit devient la valeur (nombre) itemQuantity
            localStorageProducts[i].quantite=  parseInt(itemQuantity.value, 10);
            // Ajouter le prix avec la nouvelle quantité
            prixTotale = prixTotale + (localStorageProducts[i].quantite * parseInt(item.price));
            // afficher la somme totale des prix grace a la fonction prixTotal 
            prixTotal(prixTotale);
            break;
          }
        }
        // stocker products au localStorage
        localStorage.setItem("products", JSON.stringify(localStorageProducts));
      }


      // Créer un élément <div> et ajoutez-le au document :   
      let divContentSettingsDelete = document.createElement("div");
      // ajouter la classe CSS cart__item__content__settings__delete à divContentSettingsDelete. 
      divContentSettingsDelete.classList.add("cart__item__content__settings__delete");
      // ajouter divContentSettingsDelete en tant que enfant de l'élément divContentSettings:
      divContentSettings.appendChild(divContentSettingsDelete);


      // Créer un élément <p> et ajoutez-le au document : 
      let paragrapheDelete = document.createElement("p");
      // ajouter la classe CSS deleteItem à paragrapheDelete.
      paragrapheDelete.classList.add("deleteItem");
      // ajouter le contenu de la balise p
      paragrapheDelete.innerHTML= "Supprimer";
       // ajouter paragrapheDelete en tant que enfant de l'élément divContentSettingsDelete:
      divContentSettingsDelete.appendChild(paragrapheDelete);

      // créer l'événement click du suppression
      paragrapheDelete.addEventListener("click",()=>{

        // pour  chaque produit du tableau localStorageProducts
        for(let j =0; j<localStorageProducts.length ;j++){
            // si id et couleur du produit sont identiques a ceux d'un produit dans le localstorge
            if ( product.productId === localStorageProducts[j].productId && product.couleur === localStorageProducts[j].couleur) {  
              // retirer cet élément du tableau localStorageProducts
              localStorageProducts.splice(j, 1); 
              // actualiser la page
              window.location.reload();
            }
        }
        // stocker products au localStorage
        localStorage.setItem("products", JSON.stringify(localStorageProducts));

      })
      
      prixTotale = prixTotale +  ( parseInt(item.price) * product.quantite);
      prixTotal(prixTotale);
  }
}

// Affichage du prix Total
function prixTotal(prixTotale){
  document.getElementById("totalPrice").innerHTML = prixTotale;
}
// Affichage du nbr Total des articles
function nbrTotal(nbrArticles){
  document.getElementById("totalQuantity").innerHTML = nbrArticles;
}


// selectionner le formulaire
let myForm = document.querySelector(".cart__order__form");
// // au clic sur le bouton commander
myForm.addEventListener('submit', function (e) {
  // selectionner l'input avec l'id firstName
  let prenom = document.getElementById("firstName");
  // la variable valideprenom verifie la valeur (caractéres) du prenom grace a la fonction isPrenomValid
  let valideprenom = isPrenomValid(prenom.value);
  // si valideprenom est faux
  if(valideprenom === false){
    // Un message d'erreur s'affiche et Empêcher le formulaire a etre valide
    document.getElementById("firstNameErrorMsg").innerHTML="Le prénom doit comporter des lettres et des tirets uniquement";
    e.preventDefault();
    // sinon ilne se passe rien
  } else{
    document.getElementById("firstNameErrorMsg").innerHTML="";
  }

// selectionner l'input avec l'id lastName
  let nom= document.getElementById("lastName");
  // la variable valideNom verifie la valeur(caractéres) du nom grace a la fonction isNameValid
  let valideNom = isNameValid(nom.value);
   // si valideNom est faux
  if(valideNom === false){
     // Un message d'erreur s'affiche et Empêcher le formulaire a etre valide
    document.getElementById("lastNameErrorMsg").innerHTML="Le nom doit comporter des lettres uniquement";
    e.preventDefault();
    // sinon ilne se passe rien
  } else{
    document.getElementById("lastNameErrorMsg").innerHTML="";
  }

  // selectionner l'input avec l'id address
  let adresse= document.getElementById("address");
   // la variable valideAdress verifie la valeur(caractéres) del'adress grace a la fonction isAdressValid
  let valideAdress = isAdressValid(adresse.value);
   // si valideAdress est faux
  if(valideAdress === false){
    // Un message d'erreur s'affiche et Empêcher le formulaire a etre valide
    document.getElementById("addressErrorMsg").innerHTML="L'adresse ne doit comporter que des lettres et des chiffres";
    e.preventDefault();
     // sinon ilne se passe rien
  } else{
    document.getElementById("addressErrorMsg").innerHTML="";
  }

  // selectionner l'input avec l'id city
  let ville= document.getElementById("city");
   // la variable valideVille verifie la valeur(caractéres) del'adress grace a la fonction isVilleValid
  let valideVille = isVilleValid(ville.value);
  // si valideVille est faux
  if(valideVille === false){
    // Un message d'erreur s'affiche et Empêcher le formulaire a etre valide
    document.getElementById("cityErrorMsg").innerHTML="L'adresse ne doit comporter que des lettres et des chiffres";
    e.preventDefault();
    // sinon ilne se passe rien
  } else{
    document.getElementById("cityErrorMsg").innerHTML="";
  }
 // selectionner l'input avec l'id email
  let mail= document.getElementById("email");
   // la variable valideMail verifie la valeur(caractéres) del'adress grace a la fonction isEmailValid
  let valideMail = isEmailValid(mail.value);
  // si valideVille est faux
  if(valideMail === false){
    // Un message d'erreur s'affiche et Empêcher le formulaire a etre valide
    document.getElementById("emailErrorMsg").innerHTML="Email non valid";
    e.preventDefault();
     // sinon ilne se passe rien
  } else{
    document.getElementById("emailErrorMsg").innerHTML="";
  }
  // si l'un des champ rempli est faux le formulaire ne se valide pas 
  if(valideMail === false || valideVille === false || valideAdress === false || valideNom === false || valideprenom === false){
    return;
  }
  // mettre les données du formulaire dans un objet contact
  let contact ={
    "firstName": document.getElementById("firstName").value,
    "lastName": document.getElementById("lastName").value,
    "address": document.getElementById("address").value,
    "city": document.getElementById("city").value,
    "email": document.getElementById("email").value
  }
   //Construction d'un array d'id depuis le localstorage
  let products = [];
  // récupérer les donnees depuis le localstorage
  let localStorageProducts = JSON.parse(localStorage.getItem("products"));
  // a chaque fois ajouter l'id du produit qui se trouve dans localstorge au tableau products
  for(let prod of localStorageProducts){
    products.push(prod.productId);

  }
  
  // mettre les valeurs du formulaire et les produits sélectionnés dans un objet bodyObj...
  const bodyObj = { contact, products };
   // faire la POST request avec fetch
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyObj)
  };
  fetch('http://localhost:3000/api/products/order', requestOptions)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(data) {
    // recuperer orderId
    localStorage.setItem('orderId', data.orderId); 
    // ouvrir l'URL de la page confirmation 
    document.location.href = 'confirmation.html?id='+ data.orderId;
  });

});


//Création des expressions régulières
const isPrenomValid = (prenom) => {
  const regexPrenom = /^[a-zA-Z-\s]+$/;
  return regexPrenom.test(prenom);
};
//Création des expressions régulières
const isNameValid = (nom) => {
  const regexNom =/^[a-zA-Z\s]+$/;
  return regexNom.test(nom);
};
//Création des expressions régulières
const isAdressValid = (adresse) => {
  const regexAdress = /^[a-z0-9àâçéèêëîïôûùüÿñæœ .-]*$/i;
  return regexAdress.test(adresse);
};
//Création des expressions régulières
const isVilleValid = (ville) => {
  const regexVille =/^[a-z0-9àâçéèêëîïôûùüÿñæœ .-]*$/i;
  return regexVille.test(ville);
};

//Création des expressions régulières
const isEmailValid = (email) => {
  const regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexMail.test(email);
};

