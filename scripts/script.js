// Script.js

window.addEventListener('DOMContentLoaded', () => {
  fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(jstuff => JSON.stringify(jstuff))
    .then(products => localStorage.setItem("products", products));
  if(localStorage.getItem("cart") == null){
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }else{
    let cart = JSON.parse(localStorage.getItem("cart"));
    document.getElementById("cart-count").innerHTML = cart.length;
  }
  const products = JSON.parse(localStorage.getItem("products"));
  const list = document.getElementById("product-list");
  for(let i = 0; i < products.length; i++){
    let product = products[i];
    const productItem = document.createElement("product-item");

    productItem.imgsrc = product.image;
    productItem.imgalt = product.title;
    productItem.title = product.title;
    productItem.price = "$" + product.price;
    productItem.id = product.id;
    list.appendChild(productItem);
  } 
});