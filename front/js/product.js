// Extraire l’URL courante
const urlcourante = document.location.href;
// récupérer les paramètres d’URL (_id) En utilisant l’objet URL
const url = new URL(urlcourante);
const id = url.searchParams.get("_id");
// URL API pour recuperer un seul produit
const productUrl = "http://localhost:3000/api/products/" + id;

fetch(productUrl)
// récupérer le résultat de la requête au format json
.then(function(res) {
    if (res.ok) {
    return res.json();
  }
  
})

// ce qui est été traiter en json sera appelé item

.then(function(item) {
    afficherProductItems(item);
})
 // En cas d'erreur h1 au contenu de erreur 404 et renvoit en console l'erreur.
 .catch((err) => {
  document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
  console.log("erreur 404, sur ressource api:" + err);
});

function afficherProductItems(item){

    // Créer un élément <img> et ajoutez-le au document :
    let Img = document.createElement("img");
    // ajouter l'image du produit
    Img.src=item.imageUrl;
     // ajouter Img en tant que enfant de l'élément avec la class="item__img":
    document.querySelector(".item__img").appendChild(Img);
    
    //Ajouter le nom du produit
    document.querySelector("#title").innerHTML= item.name;
    //Ajouter le prix du produit
    document.querySelector("#price").innerHTML= item.price;
    //Ajouter la description du produit
    document.querySelector("#description").innerHTML= item.description;
    //Remplir les options du composant select
    for(let color of item.colors){
        let option = document.createElement("option");
        option.innerHTML= color;
        document.querySelector("#colors").appendChild(option);
    }
}


// selectionner le bouton avec lId addToCart
let button = document.getElementById("addToCart");
// au clic sur le bouton:

button.addEventListener("click",()=>{
    // newProcuct un objet avec Id, quantity(nbr), color
    let newProduct = {
        "productId": id,
        "quantite" : parseInt(document.getElementById("quantity").value, 10) ,
        "couleur"  : document.getElementById("colors").value
    };
    // recuperer les produits dans le localstoge en json
    let localStorageProducts= JSON.parse(localStorage.getItem("products")) ;
    let prodTrouve = false;
    let position = 0;
    
    // si la quantite ou la couleur ne sont pas selectionne
    if( newProduct.quantite === 0 || newProduct.couleur === ""){
        // affiche cette alert et ne fait rien d'ou return
        window.alert("Veuillez sélectionner la couleur et/ou la quantité")
        return;
    }
     // quand le localstorge contient des produits
    if(localStorageProducts){
        // si id produit et couleur du produit ajouté identiques a ceux d'un produit dans le localstorge
        for (let i=0 ;i<localStorageProducts.length;i++){
            if( newProduct.productId===  localStorageProducts[i].productId &&
                newProduct.couleur === localStorageProducts[i].couleur ) {
                prodTrouve = true;
                position = i;
                break;
            }
        }
            // on ajoute la quantité 
        if( prodTrouve === true){
            localStorageProducts[position].quantite = localStorageProducts[position].quantite + newProduct.quantite;
            
        }else{
            localStorageProducts.push(newProduct);
        }

        // quand le localstorge est vide
    } else{
        localStorageProducts=[];
        localStorageProducts.push(newProduct);
    }
    // stocker products qui contiennent localStorageProducts format string
    localStorage.setItem("products", JSON.stringify(localStorageProducts));

})
