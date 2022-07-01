// Extraire l’URL courante
const urlcourante = document.location.href;
// récupérer les paramètres d’URL (id) En utilisant l’objet URL
const url = new URL(urlcourante);
const orderId = url.searchParams.get("id");
// console.log(orderId);
document.getElementById("orderId").innerHTML=orderId;
// vider le localStorage
localStorage.clear();